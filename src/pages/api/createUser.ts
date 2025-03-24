import { NextApiRequest, NextApiResponse } from 'next';
import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';
import { genSaltSync, hashSync } from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        console.log(email, password);

        try {
            const sql = neon(process.env.DATABASE_URL || '');
            await sql`
            CREATE TABLE IF NOT EXISTS Users (
                id UUID PRIMARY KEY,
                email VARCHAR(64) NOT NULL,
                password VARCHAR(64) NOT NULL
            )
            `;

            const salt = genSaltSync(10);
            const hash = hashSync(password, salt);
            
            const id = uuidv4();
            await sql`
                INSERT INTO Users (id, email, password)
                VALUES (${id}, ${email}, ${hash})
            `;

            res?.status(200).json({ message: 'User added successfully!!' });
        } catch (error) {
            console.error(error);
            res?.status(500).json({ error: 'Internal server error.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}