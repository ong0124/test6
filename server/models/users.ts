import { sql } from '~/server/db/db';

export type Users = {
  id: number;
  full_name: string;
  password? : string;
  created_at: Date;
  LineID?:number;
  email? :string; 
  birthday?: Date;
  account_name? :string
  };

export const read = async () => {
  const result = await sql({
    query: 'SELECT id, full_name, created_at, birthday, email FROM users'
  });

  return result as Users[];
};

export const createUser = async (data: Users) => {
  const result = (await sql({
    query: `
      INSERT IGNORE INTO users (
        id,
        full_name,
        password,
        created_at,
        LineID,
        email,
        birthday,
        account_name
      ) VALUES (
       ?, ?, ?, ?, ?, ?, ?, ?
      )
    `,
    values: [
      data.id,
      data.full_name,
      data.password?? null,
      data.created_at,
      data.LineID?? null,
      data.email ?? null, 
      data.birthday?? null,
      data.account_name ?? null 
    ]
  })) as any;

  console.log('Inserted result:', result);

  return result.insertId ? { ...data, id: result.insertId } : null;
};


export const detail = async (id: string) => {
  const result = (await sql({
    query: 'SELECT * FROM users WHERE id = ?',
    values: [id]
  })) as any;

  return result.length === 1 ? (result[0] as Users) : null;
};

export const update = async (id: string, data: Partial<Users>) => {
  await sql({
    query: `
      UPDATE users
      SET
        full_name = ?,
        email = ?,
        birthday = ?,
        account_name = ?
      WHERE id = ?
    `,
    values: [data.full_name, data.email, data.birthday, data.account_name, id]
  });

  return await detail(id);
};


export const remove = async (id: string) => {
  await sql({
    query: 'DELETE FROM users WHERE id = ?',
    values: [id]
  });

  return true;
};
