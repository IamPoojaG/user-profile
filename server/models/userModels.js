import mongoose from 'mongoose';

const modelSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model('Profile', modelSchema);

export default Profile;
