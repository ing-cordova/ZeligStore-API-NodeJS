/* eslint-disable linebreak-style */
import mongoose from 'mongoose';
import getModelName from 'Utils/getModelName';

const { Schema } = mongoose;
const { singularName, pluralName } = getModelName('styles');

const schema = new Schema(
  {
    styleName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

// Ensure virtual fields are serialised.
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    // eslint-disable-next-line no-param-reassign,no-underscore-dangle
    ret.id = ret._id;
    delete ret._id;
  },
});

// rename name Example to singular Model
// eslint-disable-next-line operator-linebreak
export default mongoose.models[singularName] ||
  mongoose.model(pluralName, schema);
