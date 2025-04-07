import { sql } from "../db/db";

export type RefundModel = {
    id: number;
    booking_id: number;
    user_id: number;
    status: string;
    refund_amount: number;
    reason?: string;
    created_at ?:Date;
    full_name?: string; 
    departure_loc?: string; 
    destination_loc?: string; 
    shuttle_date?: Date;
    shuttle_time?: string;
}


export const readAll = async () =>{
    const result = await sql({
        query:  `
        SELECT 
            r.id,
            r.booking_id,
            r.user_id,
            r.status,
            r.refund_amount,
            r.created_at,
            u.full_name,
            b.departure_loc,
            b.destination_loc,
            b.shuttle_date,
            b.shuttle_time
        FROM 
            refund_apply r
        JOIN 
            users u ON r.user_id = u.id
        JOIN 
            booking b ON r.booking_id = b.id
    `
    });

    return result as RefundModel[];
}

export const create = async (data: Pick<RefundModel,Exclude<keyof RefundModel, 'id' | 'status' |'refund_amount'>>) => {
  const result = (await sql({
    query: `
      INSERT INTO refund_apply (
        booking_id,
        user_id,
        created_at
      ) VALUES (
        ?,
        ?,
        ?
      ) 
    `,
    values: [data.booking_id, data.user_id,data.created_at,]
  })) as any;
  console.log('Inserted result:', result);
  return result.length === 1 ? (result[0] as RefundModel) : null;
};


export const update = async (id: string, data: Pick<RefundModel, 'status' >) => {
  const result = await sql({
    query: `
      UPDATE refund_apply
      SET
        status = ?,
      WHERE id = ?
    `,
    values: [data.status, id]
  });
  console.log(result);
};