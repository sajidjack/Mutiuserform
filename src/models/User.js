import { query as _query } from '../config/db';
import { hash } from 'bcrypt';

class User {
    static async create({ name, email, contact_number, password }) {
        const hashedPassword = await hash(password, 10);
        const query = `
            INSERT INTO users (name, email, contact_number, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, contact_number, created_at
        `;
        const values = [name, email, contact_number, hashedPassword];
        const { rows } = await _query(query, values);
        return rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await _query(query, [email]);
        return rows[0];
    }
}

export default User;
