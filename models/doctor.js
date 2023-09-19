// Import mongoose
const { Schema, model } = require('mongoose')

// Table structure
const DoctorSchema = Schema({
    name: { type: String, required: true },
    img: { type: String },
    user: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
    hospital: { required: true, type: Schema.Types.ObjectId, ref: 'Hospital' }
});

// Set up model => Define the structure to be returned
DoctorSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

// Export model
module.exports = model('Doctor', DoctorSchema)