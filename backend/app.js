const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./consts/cors-options');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors(corsOptions));
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/errorHandler'));

console.log(process.env.NODE_ENV); // production
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
