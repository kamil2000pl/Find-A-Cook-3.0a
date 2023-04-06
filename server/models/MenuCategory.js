const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categories = new mongoose.Schema(
    {
        category_name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        category_description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const MenuCategorySchema = mongoose.model('Category', categories);

module.exports = MenuCategorySchema;