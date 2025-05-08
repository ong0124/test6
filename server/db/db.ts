import { createPool } from 'mysql2/promise';

interface Options {
  query: string;
  values?: any[];
}

const pool = createPool({
  host: '18.180.90.233',
  user: 'qs-tech-remote',
  database: 'kinmentong',
  password: 'Qs202588',
  port:3306,
  connectionLimit: 10, 
  queueLimit: 0
});

export const sql = async ({ query, values }: Options) => {
  try {
    const [rows] = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.error('Database error:', err); // 打印数据库连接错误
    throw new Error('Database query failed');
  }
};