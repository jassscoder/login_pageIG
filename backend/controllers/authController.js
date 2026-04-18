const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config');

// Register
exports.register = async (req, res) => {
    try {
        const { email, fullName, username, password } = req.body;

        // Validation
        if (!email || !fullName || !username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user exists
        const connection = await pool.getConnection();
        
        const [existingUser] = await connection.execute(
            'SELECT id FROM users WHERE email = ? OR username = ?',
            [email, username]
        );

        if (existingUser.length > 0) {
            connection.release();
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await connection.execute(
            'INSERT INTO users (email, username, full_name, password) VALUES (?, ?, ?, ?)',
            [email, username, fullName, hashedPassword]
        );

        connection.release();

        res.status(201).json({ 
            message: 'User registered successfully',
            user: { email, username, fullName }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { emailUsername, password } = req.body;

        // Validation
        if (!emailUsername || !password) {
            return res.status(400).json({ message: 'Email/Username and password required' });
        }

        const connection = await pool.getConnection();

        // Find user
        const [users] = await connection.execute(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [emailUsername, emailUsername]
        );

        if (users.length === 0) {
            connection.release();
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            connection.release();
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        connection.release();

        // Generate token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                fullName: user.full_name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

// Logout (token blacklist would be implemented in production)
exports.logout = async (req, res) => {
    res.json({ message: 'Logout successful' });
};

// Get current user
exports.getMe = async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [users] = await connection.execute(
            'SELECT id, email, username, full_name, created_at FROM users WHERE id = ?',
            [req.userId]
        );

        connection.release();

        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user: users[0] });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const connection = await pool.getConnection();

        const [users] = await connection.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            connection.release();
            return res.status(404).json({ message: 'User not found' });
        }

        // In production, generate reset token and send email
        // For now, just acknowledge the request
        connection.release();

        res.json({ message: 'Password reset link sent to email' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Error processing request' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password required' });
        }

        // In production, verify reset token
        // For now, just acknowledge the request
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Error resetting password' });
    }
};