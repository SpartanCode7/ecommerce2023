const Products = require("../models/Product")
const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = require("../constant/httpCode");

const getProductByIdMiddleware = async (req, res, next) => {
    let product
    try {
        product = await Products.findById(req.params.id)
        if (product == null) {
            return res.status(BAD_REQUEST).json({ message: "product not found" })
        } else {
            return res.status(OK).json({ message: "Item found Successfully." })
        }
    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message})
    }

    res.product = product
    next()
}

module.exports = { getProductByIdMiddleware }
