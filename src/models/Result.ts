import { Schema, model } from 'mongoose';

const Result = new Schema({
  uId: {
    type: String,
    ref: 'User',
  },
  pId: {
    type: String,
    ref: 'Poll',
  },
  title: {
    type: String,
    required: true,
  },
  pages: [],
});

export default model('Result', Result);
