// Import mongoose
const { Schema, model } = require('mongoose')

// Table structure
const HospitalSchema = Schema({
    name: { type: String, required: true },
    img: { type: String },
    user: { required: true, type: Schema.Types.ObjectId, ref: 'User' }
});

// Set up model => Define the structure to be returned
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

// Export model
module.exports = model('Hospital', HospitalSchema)