const pool = require('../config');

class User {
    // Create a new user
    static async create(userData) {
        try {
            const { email, username, fullName, password } = userData;
            const connection = await pool.getConnection();

            const [result] = await connection.execute(
                'INSERT INTO users (email, username, full_name, password) VALUES (?, ?, ?, ?)',
                [email, username, fullName, password]
            );

            connection.release();
            return { id: result.insertId, ...userData };
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    // Find user by email
    static async findByEmail(email) {
        try {
            const connection = await pool.getConnection();

            const [users] = await connection.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            connection.release();
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    // Find user by username
    static async findByUsername(username) {
        try {
            const connection = await pool.getConnection();

            const [users] = await connection.execute(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );

            connection.release();
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            throw new Error(`Error finding user by username: ${error.message}`);
        }
    }

    // Find user by ID
    static async findById(id) {
        try {
            const connection = await pool.getConnection();

            const [users] = await connection.execute(
                'SELECT id, email, username, full_name, profile_picture, bio, created_at, updated_at FROM users WHERE id = ?',
                [id]
            );

            connection.release();
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    // Find user by email or username
    static async findByEmailOrUsername(emailOrUsername) {
        try {
            const connection = await pool.getConnection();

            const [users] = await connection.execute(
                'SELECT * FROM users WHERE email = ? OR username = ?',
                [emailOrUsername, emailOrUsername]
            );

            connection.release();
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            throw new Error(`Error finding user: ${error.message}`);
        }
    }

    // Update user profile
    static async update(id, updateData) {
        try {
            const { fullName, bio, profilePicture } = updateData;
            const connection = await pool.getConnection();

            const [result] = await connection.execute(
                'UPDATE users SET full_name = ?, bio = ?, profile_picture = ? WHERE id = ?',
                [fullName, bio, profilePicture, id]
            );

            connection.release();
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    // Update password
    static async updatePassword(id, hashedPassword) {
        try {
            const connection = await pool.getConnection();

            const [result] = await connection.execute(
                'UPDATE users SET password = ? WHERE id = ?',
                [hashedPassword, id]
            );

            connection.release();
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error updating password: ${error.message}`);
        }
    }

    // Delete user
    static async delete(id) {
        try {
            const connection = await pool.getConnection();

            const [result] = await connection.execute(
                'DELETE FROM users WHERE id = ?',
                [id]
            );

            connection.release();
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    // Check if email exists
    static async emailExists(email) {
        try {
            const connection = await pool.getConnection();

            const [users] = await connection.execute(
                'SELECT id FROM users WHERE email = ?',
                [email]
            );

            connection.release();
            return users.length > 0;
        } catch (error) {
            throw new Error(`Error checking email: ${error.message}`);
        }
    }

    // Check if username exists
    static async usernameExists(username) {
        try {
            const connection = await pool.getConnection();

            const [users] = await connection.execute(
                'SELECT id FROM users WHERE username = ?',
                [username]
            );

            connection.release();
            return users.length > 0;
        } catch (error) {
            throw new Error(`Error checking username: ${error.message}`);
        }
    }

    // Get all users (for admin purposes)
    static async getAll(limit = 10, offset = 0) {
        try {
            const connection = await pool.getConnection();

            const [users] = await connection.execute(
                'SELECT id, email, username, full_name, created_at FROM users LIMIT ? OFFSET ?',
                [limit, offset]
            );

            connection.release();
            return users;
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }

    // Get user count
    static async count() {
        try {
            const connection = await pool.getConnection();

            const [result] = await connection.execute(
                'SELECT COUNT(*) as count FROM users'
            );

            connection.release();
            return result[0].count;
        } catch (error) {
            throw new Error(`Error counting users: ${error.message}`);
        }
    }
}

module.exports = User;