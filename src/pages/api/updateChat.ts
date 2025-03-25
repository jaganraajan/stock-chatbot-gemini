import { NextApiRequest, NextApiResponse } from 'next';
import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        console.log(email, password);

        try {
            const sql = neon(process.env.DATABASE_URL || '');
            await sql`
                CREATE TABLE IF NOT EXISTS Chat (
                    id UUID PRIMARY KEY,
                    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
                    messages JSON NOT NULL,
                    userId UUID NOT NULL REFERENCES Users(id)
                );
            `;

            const id = uuidv4();
            await sql`
                INSERT INTO Chat (id, createdAt, messages, userId)
                VALUES (${id}, NOW(), '[{"text": "Hello, how can I help you?"}, {"text": "I need assistance with my account."}]', 'user-id-1');
            `;

            res?.status(200).json({ message: 'Chat history updated successfully!!' });
        } catch (error) {
            console.error(error);
            res?.status(500).json({ error: 'Internal server error.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}