const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://toxicity.nomoredomains.rocks',
    'http://toxicity.nomoredomains.rocks',
  ],
  credentials: true,
};

module.exports = corsOptions;
