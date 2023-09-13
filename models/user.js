// Import mongoose
const { Schema, model } = require('mongoose')

// Table structure
const UserSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    role: { type: String, required: true, default: 'USER_ROLE' },
    isGoogleAccount: { type: Boolean, default: false }
});

// Set up model => Define the structure to be returned
UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

// Export model
module.exports = model('User', UserSchema)