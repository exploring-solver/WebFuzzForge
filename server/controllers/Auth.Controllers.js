const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User} = require('../models');
const config = require('../config');
const Report = require('../models/Report');
const SECRET_KEY = config.API_KEY_JWT;
exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log(`Signup request for user: ${username}`);

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ username, password: hashedPassword });
        
        await user.save();
        
        console.log(`User ${username} created successfully`);
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up user:', error.stack);
        
        res.status(500).json({ message: 'Error signing up', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: config.TOKEN_EXPIRES_IN });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.json({ username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user details', error });
    }
};

exports.generateReport = async (req, res) => {
    const { toolName, output } = req.body;
    try {
        const report = new Report({
            userId: req.user.userId,
            toolName,
            output,
            time: new Date().toISOString(),
        });
        await report.save();
        res.json({ message: 'Report saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error });
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find({ userId: req.user.userId });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error });
    }
};
