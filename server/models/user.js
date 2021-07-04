import Mongoose, { Schema } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

export default Mongoose.model('User', userSchema);