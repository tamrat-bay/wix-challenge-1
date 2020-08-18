import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    userID: String,
    accessToken: String,
    authType: String,
    email: String,
    password: String,
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cars'
    }]
}, { timestamps: true });

const User = mongoose.model('user', userSchema)

export default User;