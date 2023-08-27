import { Schema, model } from 'mongoose';

const Poll = new Schema({
  uId: {
    type: String,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
  pages: [],
});

export default model('Poll', Poll);
