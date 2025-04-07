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

export const create = async (data: Users) => {
  const result = (await sql({
    query: `
      INSERT IGNORE INTO users (
        id,
        full_name,
        created_at,
        birthday
      ) VALUES (
       ?, ?, ?, ?
      )
    `,
    values: [
      data.id,
      data.full_name,
      data.created_at,
      data.birthday?? null,
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
        birthday = ?
      WHERE id = ?
    `,
    values: [data.full_name, data.birthday, id]
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
