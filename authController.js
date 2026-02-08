const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const newUser = new User({ email, password, role });
        await newUser.save(); 

        res.status(201).json({ message: "User registered!" });
    } catch (err) {
        res.status(500).json({ message: "Registration failed: " + err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'SECRET_KEY',
            { expiresIn: '1d' }
        );

        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: "Login error" });
    }
};
