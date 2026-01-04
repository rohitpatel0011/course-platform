const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [100, 'Name can not be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0
  },
  thumbnail: {
    type: String, // URL of the image
    default: 'no-photo.jpg'
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['web-dev', 'mobile-dev', 'data-science', 'design', 'marketing']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Refers to the User model
    required: true
  },
  // Lectures Array inside Course
  lectures: [
    {
      title: String,
      videoUrl: String, // We will store Cloudinary/S3 URL here
      duration: Number, // in minutes
      isFree: {
        type: Boolean,
        default: false
      }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);