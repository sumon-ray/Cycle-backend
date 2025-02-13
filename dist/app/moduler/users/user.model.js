"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../config/config");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name Is Required '],
    },
    role: {
        type: String,
        default: 'customer',
    },
    status: {
        type: String,
        default: 'active',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password Is Required'],
    },
}, { timestamps: true });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = Number(config_1.config.saltRound); // Ensure saltRounds is a number
        try {
            // Check if the user already exists based on email
            const findUser = yield exports.userModel.findOne({ email: this.email });
            if (findUser) {
                // Pass the error to next to be handled by error handling middleware
                const error = new Error('This User Already Exists');
                error.name = 'DuplicateUserError'; // Optional: custom error name
                return next(error);
            }
            // Only hash the password if it has been modified
            if (this.isModified('password')) {
                this.password = yield bcrypt_1.default.hash(this.password, saltRounds);
            }
            next(); // Proceed to the next middleware
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            next(err); // Pass the error to the next middleware
        }
    });
});
exports.userModel = (0, mongoose_1.model)('users', userSchema);
