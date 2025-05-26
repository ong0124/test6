import { sql } from "../db/db";
import dayjs from 'dayjs';

export type BookingModel = {
    id: number;
    trip_type: string;
    LineID: number;
    adult_num: number;
    child_num: number;
    contact_phone: number;
    totalprice: number;
    contact_name: string;
    departure_loc: string;
    destination_loc: string;
    return_departure: string;
    return_destination: string;
    arrivalpoint_date: string; 
    arrivalpoint_time: string; 
    return_arrival_date:string;
    return_arrival_time:string;
    flight_num: string;
    ferry_time: string;
    flight_time: string;
    flight_loc?: string; 
    shuttle_date: string; 
    shuttle_time: string; 
    return_shuttle_date: string; 
    return_shuttle_time: string; 
    status?: string;
    total_tickets?: number;
    payment_status?: string;
}


export const read = async (
  date: string = dayjs().format('YYYY-MM-DD')
) => {
  const result = await sql({
    query: `SELECT 
    b.*,
    p.payment_status,
    (b.adult_num + b.child_num) AS total_tickets 
    FROM 
    booking b 
    JOIN 
    payment p ON p.booking_id = b.id AND p.LineID = b.LineID 
    WHERE 
    b.shuttle_date = ?
    OR
    b.return_shuttle_date = ?
    ORDER BY 
    b.shuttle_time ASC,
    b.return_shuttle_time ASC`,
    values: [date, date]
  });

  return result as BookingModel[];
};


export const create = async(data: Pick<BookingModel, Exclude<keyof BookingModel, 'id' | 'total_tickets'>>)=>{
    const result = (await sql({
        query:`
      INSERT INTO booking (
      trip_type,
      LineID,
      adult_num,
      child_num,
      contact_phone,
      totalprice,
      contact_name,
      departure_loc,
      destination_loc,
      return_departure,
      return_destination,
      arrivalpoint_date,
      arrivalpoint_time,
      return_arrival_date,
      return_arrival_time,
      flight_num,
      ferry_time,
      flight_time,
      shuttle_date,
      shuttle_time,
      return_shuttle_date,
      return_shuttle_time,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  values: [ data.trip_type,
    data.LineID,
    data.adult_num,
    data.child_num,
    data.contact_phone,
    data.totalprice,
    data.contact_name,
    data.departure_loc,
    data.destination_loc,
    data.return_departure,
    data.return_destination,
    data.arrivalpoint_date,
    data.arrivalpoint_time,
    data.return_arrival_date,
    data.return_arrival_time,
    data.flight_num,
    data.ferry_time,
    data.flight_time,
    data.shuttle_date,
    data.shuttle_time,
    data.return_shuttle_date,
    data.return_shuttle_time,
    data.status]
    })
    ) as any;
    console.log('Inserted result:', result);
     const insertedId = await sql({
        query: `SELECT LAST_INSERT_ID() AS id;`
    }) as any;

  const bookingID = insertedId?.[0]?.id;

  if (!bookingID) {
    console.error('Booking insertion failed or ID not found.');
    return null;
  }
  await sql({
    query: `
      INSERT IGNORE INTO payment (
        booking_id,
        payment_amount,
        payment_method,
        payment_status,
        payment_time,
        LineID
      ) VALUES (?, ?, ?, ?, ?, ?)
    `,
    values: [
      bookingID,
      data.totalprice,      
      '現金',             
      data.payment_status,             
      new Date(),           
      data.LineID
    ]
  });

  return { id: bookingID };
};

export const update = async (
  id: string,
  data: Pick<BookingModel, 
    'adult_num' | 'child_num' | 'contact_phone' | 'totalprice' |
    'contact_name' | 'departure_loc' | 'destination_loc' |
    'shuttle_date' | 'shuttle_time' | 'status'| 'return_departure'|
    'return_destination'|'return_shuttle_date'|'return_shuttle_time'
  > & {
    payment_status: string
  }
) => {
  // 1. 更新 booking 表
  await sql({
    query: `
      UPDATE booking
      SET
        adult_num = ?,
        child_num = ?,
        contact_phone = ?,
        totalprice = ?,
        contact_name = ?,
        departure_loc = ?,
        destination_loc = ?,
        return_departure = ?,
        return_destination = ?,
        shuttle_date = ?,
        shuttle_time = ?,
        return_shuttle_date = ?,
        return_shuttle_time = ?,
        status = ?
      WHERE id = ?
    `,
    values: [
      data.adult_num,
      data.child_num,
      data.contact_phone,
      data.totalprice,
      data.contact_name,
      data.departure_loc,
      data.destination_loc,
      data.return_departure,
      data.return_destination,
      data.shuttle_date,
      data.shuttle_time,
      data.return_shuttle_date,
      data.return_shuttle_time,
      data.status,
      id
    ]
  });

  // 2. 更新 payment 表的 payment_status
  await sql({
    query: `
      UPDATE payment
      SET payment_status = ?
      WHERE booking_id = ?
    `,
    values: [data.payment_status, id]
  });

  return await FindBookingDetailById(id);
};

export const FindBookingDetailById = async(id: string) =>{
    const result =(await sql({
        query: 'SELECT * from booking WHERE id = ?',
        values: [id]
    })) as any;

    return result.length === 1 ? (result[0] as BookingModel) : null;
};


export const FindBookingByUserId = async(user_id: string) =>{
    const result =(await sql({
        query: 'SELECT * from booking WHERE user_id = ?',
        values: [user_id]
    })) as any;

    return result as BookingModel[];
};

export const NotTraveledBooking = async (user_id: string) => {
    const result = (await sql({
        query: "SELECT * FROM booking WHERE user_id = ? AND status = 'notTraveled'", // 使用雙引號包住整個 SQL 字串
        values: [user_id] 
    })) as any;

    return result as BookingModel[];
};


export const remove = async (id: string) => {
    await sql({
      query: 'DELETE FROM booking WHERE id = ?',
      values: [id]
    });
  
    return true;
  };