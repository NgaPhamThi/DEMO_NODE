import Product from '../models/product'
import productSchema from '../schemas/product'
import Category from '../models/Category'
export const getAll = async (req, res) => {
    const { _page = 1, _oder = "asc", _limit = 10, _sort = "createAt" } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _oder == "desc" ? -1 : 1
        }
    }
    try {
        const products = await Product.paginate({}, options)
        return res.status(201).json(products)

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}
export const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categoryID', 'products')
        return res.status(201).json(product)

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}
export const create = async (req, res) => {
    try {

        const { error } = productSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        const product = await Product.create(req.body)
        await Category.findOneAndUpdate(product.categoryID, {
            $addToSet: {
                products: product._id
            }
        })
        return res.status(201).json(product)

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}
export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        return res.json({
            message: "Xóa sản phẩm thành công"
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}
export const update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json({
            product
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}