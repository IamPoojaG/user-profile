import mongoose from 'mongoose';

const modelSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },

  {
    timestamps: true,
  }
);

const Profile = mongoose.model('Profile', modelSchema);

export default Profile;
