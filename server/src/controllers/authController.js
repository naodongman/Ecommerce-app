require('dotenv').config();            //  .env
const jwt      = require('jsonwebtoken');
const User     = require('../models/user');
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const JWT_SECRET   = process.env.JWT_SECRET;

// register
exports.register = async (req, res, next) => {
  try {
    const { username, password, secret } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'User name and password required' });
    }
    if (await User.findOne({ username })) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    // normal user
    let role = 'customer';
    // if sercert = set password set current account be admin
    if (secret && secret === ADMIN_SECRET) {
      role = 'admin';
    }
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: role === 'admin' ? 'Administrator Registration Successful' : 'Successful registration' });
  } catch (err) {
    next(err);
  }
};

// Log in and issue JWT
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect user name or password' });
    }
    // Issue token with user id, username and role
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};