import Category from "../models/Category";
import categorySchema from '../schemas/category'
export const getAll = async (req, res) => {
    try {
        const category = await Category.find()
        return res.status(201).json(category)

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}
export const get = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('products')
        return res.status(201).json(category)

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}
export const create = async (req, res) => {
    // console.log("create");
    try {

        const { error } = categorySchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        const category = await Category.create(req.body)
        return res.status(201).json(category)

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}
export const remove = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
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
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json({
            category
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}