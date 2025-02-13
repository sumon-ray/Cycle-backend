"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CycleModel = exports.cycleSchema = void 0;
const mongoose_1 = require("mongoose");
// crete cycle schema
exports.cycleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'The bicycle name is required.'],
    },
    brand: {
        type: String,
        required: [true, 'The brand name is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Price must be a positive number.'],
    },
    image: {
        type: String,
    },
    queantity: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        required: true,
        validate: {
            validator: function (value) {
                return value;
            },
            message: '{VALUE} is not valid',
        },
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
    },
    inStock: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
// create cycle model
exports.CycleModel = (0, mongoose_1.model)('create-cycle', exports.cycleSchema);
