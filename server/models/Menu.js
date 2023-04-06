const mongoose = require('mongoose');
const { Schema } = mongoose;

const menus = new Schema(
  {
    cook_id: {
      type: Schema.Types.ObjectId,
      ref: 'Cook',
      required: true,
    },
    item_name: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    imageurls: String,
    // currentbookings: []
  },
  { timestamps: true }
);

const MenuItemSchema = mongoose.model('MenuItem', menus);

module.exports = MenuItemSchema;