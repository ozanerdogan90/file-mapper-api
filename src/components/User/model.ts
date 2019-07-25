import { Document, Mongoose } from 'mongoose';

export interface IUser extends Document {
    name: string,
    email: string,
    password: string
}

const mongoose: Mongoose = new Mongoose();
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
mongoose.model('User', userSchema);

export default mongoose.model<IUser>('User', userSchema);
