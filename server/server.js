require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const auth = require('./src/middleware/auth');
const app = express();
// 1. connect MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Common middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const allowed = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://n11553294.ifn666.com'   // ← vite 每次找空闲口，干脆都列上
];

app.use(
  cors({
    origin: (origin, cb) => {
      // allow requests with no origin (e.g. Postman)  or in allow-list
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
    exposedHeaders: ['Authorization', 'Link'],
  })
);
// 3. current limiter
const nonAuthLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_UNAUTH) || 5,
  standardHeaders: true,
  legacyHeaders: false
});
const authLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_AUTH) || 10,
  standardHeaders: true,
  legacyHeaders: false
});

// 4. Route Mount
// 4.1 Public interfaces: no authentication required, go non-authenticated flow limiting

app.use(
  '/api/public',
  nonAuthLimiter,
  require('./src/routes/public')
);

// 4.1 Public Registration/Login
app.use(
  '/api/auth',
  nonAuthLimiter,
  require('./src/routes/auth')
);

// 4.2 Remaining routes: must be logged in and go authentication to limit flow
app.use('/api', auth, authLimiter, require('./src/routes'));

// 5. global error handling (GEO)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 6. activate 
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/api`);
});
