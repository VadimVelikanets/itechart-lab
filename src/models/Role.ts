import { Schema, model } from 'mongoose';

import { EUserRole } from '../constants';

const Role = new Schema({
  value: {
    type: String,
    unique: true,
    default: EUserRole.ADMIN,
  },
});

export default model('Role', Role);
