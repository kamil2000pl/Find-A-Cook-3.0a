const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new mongoose.Schema(
    {
        // _id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        // },
        user_first_name: {
            type: String,
            required: true,
        },
        user_last_name: {
            type: String,
            required: true,
        },
        user_phone_number: {
            type: String,
            required: true,
        },
        user_email: {
            type: String,
            required: true,
        },
        user_password: {
            type: String,
            required: true,
        },
        user_address: {
            type: String,
            required: true,
        },
        user_birthday: {
            type: Date,
            required: true,
        },
        verified: {
            type: Boolean,
            required: true,
        }
        // address_id: {
        //     type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'AddressSchema',
        //     required: true,
        // },
    },
    { timestamps: true }
);

const UserSchema = mongoose.model('User', users);

module.exports = UserSchema;