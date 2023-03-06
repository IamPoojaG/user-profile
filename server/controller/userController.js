import Profile from '../models/userModels.js';
import multer from 'multer';
import fs from 'fs';
export const createUser = (req, res) => {
  const { id, firstName, lastName, email, password, img } = req.body;
  const users = Profile.find().then((users) => users);
  const newProfile = new Profile({
    id,
    firstName,
    lastName,
    email,
    password,
    img,
  });
  console.log(newProfile);
  newProfile
    .save()
    .then(() =>
      res.status(201).json({ success: true, msg: 'User created successfully' })
    )
    .catch((err) => res.status(500).json(`Error:${err}`));
};

export const getAllUsers = (req, res) => {
  Profile.find()
    .then((users) => res.status(200).json({ users }))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

export const getUser = (req, res) => {
  const { id: userID } = req.params;
  Profile.findById(userID)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

export const updateUser = (req, res) => {
  const { id: postID } = req.params;
  Profile.findById(postID)
    .then((user) => {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.img = req.body.img;
      user
        .save()
        .then(() =>
          res
            .status(201)
            .json({ success: true, msg: 'User updated successfully' })
        )
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

export const deleteUser = (req, res) => {
  const { id: userID } = req.params;
  Profile.findByIdAndDelete(userID)
    .then(() =>
      res.status(200).json({ success: true, msg: 'User deleted successfully' })
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
};
