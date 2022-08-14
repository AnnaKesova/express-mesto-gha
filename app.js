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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// роуты, нетребующие авторизации
app.post('/signin', login);
app.post('/signup', createUser);
// авторизация
app.use(auth);

// роуты, требующие авторизации
app.use('/cards', auth, cardRoutes);
app.use('/users', auth, userRoutes);

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
