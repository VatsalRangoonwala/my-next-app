import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

// Check if the model exists before creating a new one
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;