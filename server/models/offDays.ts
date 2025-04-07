import { sql } from '~/server/db/db';

export type offDays_dates = {
  id ?:number;
  start_offDays :string;
  end_offDays :string;
  created_at ?:Date;
  created_by :string;
  };

  export const read = async () => {
    const result = await sql({
      query: 'SELECT * FROM offDays_dates'
    });
  
    return result as offDays_dates[];
  };
  

  export const createOffDays = async (data: offDays_dates) => {
    const result = (await sql({
      query: `
        INSERT IGNORE INTO offDays_dates (
          start_offDays,
          end_offDays,
          created_by
        ) VALUES (
         ?, ?, ?
        )
      `,
      values: [
        data.start_offDays,
        data.end_offDays?? null,
        data.created_by
      ]
    })) as any;
  
    console.log('Inserted result:', result);
  };

  export const remove = async (id: number) => {
    await sql({
      query: 'DELETE FROM offDays_dates WHERE id = ?',
      values: [id]
    });
  
    return true;
  };