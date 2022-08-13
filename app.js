const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
const {
  ERROR_NOT_FOUND,
} = require('./utils/utils');
const {
  createUser, login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '62e6e420eb16b4e44753a568',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/cards', cardRoutes);
app.use('/users', userRoutes);
app.post('/signin', login);
app.post('/signup', createUser);
// авторизация
app.use(auth);

app.use('/', (req, res) => {
  res.status(ERROR_NOT_FOUND.status).send({ message: ERROR_NOT_FOUND.message });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  // eslint-disable-next-line no-console
  console.log('Connected to db');

  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}

main();
