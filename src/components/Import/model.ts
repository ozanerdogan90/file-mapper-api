import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string
}
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

// tslint:disable-next-line: no-any
userSchema.pre('save', function (next: any) {
    if (!this.isModified('password') && !this.isNew) return;
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);

    return next();
});

export const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);
