const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true
  },
  slug: {
    type: String,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },

  category: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/400'
  },
  rating: {
    type: Number,
    default: 0
  },
  studentsEnrolled: {
    type: Number,
    default: 0
  },
  level: {
    type: String,
    default: 'Beginner'
  },
  lessons: [
    {
      title: { type: String },
      videoUrl: { type: String },
      duration: { type: String }
    }
  ],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  numReviews: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);