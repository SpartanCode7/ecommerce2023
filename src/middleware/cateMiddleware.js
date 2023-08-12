const Categories = require("../models/Category");
const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = require("../constant/httpCode");

const getCateByIdMiddleware = async (req, res, next) => {
    try {
        const category = await Categories.findById(req.params.id);
        if (!category) {
            return res.status(BAD_REQUEST).json({ message: "Category not found" });
        }

        // Set the category on the request object for later use in the route handler
        req.category = category;
        next();
    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
};

module.exports = { getCateByIdMiddleware }