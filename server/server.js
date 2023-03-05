import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import Profile from './models/userModels.js';
import usersRoute from './router/userRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/', upload.single('testImage'), (req, res) => {
  const saveImage = new Profile({
    img: {
      data: fs.readFileSync('uploads/' + req.file.filename),
      contentType: 'image/png',
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log('Image is saved');
    })
    .catch((err) => {
      console.log(err, 'Error has occur');
    });
});
app.use('/users', usersRoute);

app.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Hello, Welcome...' });
});

const PORT = process.env.PORT || 8081;
const CONNECTION_URI = process.env.CONNECTION_URI;

mongoose
  .connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running in: http://localhost:${PORT}`);
    })
  )
  .catch((err) => console.log(`Error: ${err}, did not connect to database`));
