import joi from 'joi'

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    original_price: joi.number().required(),
    image: joi.string().required(),
    description: joi.string().required(),
    categoryID: joi.string().required()
})

export default productSchema;