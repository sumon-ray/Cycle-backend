import { model, Schema } from 'mongoose';
import { TUser } from './user.Interface';
import bcrypt from 'bcrypt';
import { config } from '../../config/config';
const userSchema = new Schema<TUser>(
  {
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
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const saltRounds = Number(config.saltRound); // Ensure saltRounds is a number
  try {
    // Check if the user already exists based on email
    const findUser = await userModel.findOne({ email: this.email });
    if (findUser) {
      // Pass the error to next to be handled by error handling middleware
      const error = new Error('This User Already Exists');
      error.name = 'DuplicateUserError'; // Optional: custom error name
      return next(error);
    }

    // Only hash the password if it has been modified
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next(); // Proceed to the next middleware
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    next(err); // Pass the error to the next middleware
  }
});

export const userModel = model<TUser>('users', userSchema);
