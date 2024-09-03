const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Report } = require('../models');
const SECRET_KEY = 'your-secret-key';

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Log request data to check what is being sent
        console.log(`Signup request for user: ${username}`);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new User object
        const user = new User({ username, password: hashedPassword });
        
        // Save the user to the database
        await user.save();
        
        // Log success
        console.log(`User ${username} created successfully`);
        
        // Send a success response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        // Log the full error stack for debugging
        console.error('Error signing up user:', error.stack);
        
        // Send a 500 error response with details
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
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
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
