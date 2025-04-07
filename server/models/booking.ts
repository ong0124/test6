import { sql } from "../db/db";

export type BookingModel = {
    id: number;
    trip_type: string;
    user_id: number;
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
    shuttle_date: string; 
    shuttle_time: string; 
    return_shuttle_date: string; 
    return_shuttle_time: string; 
    status : string;
    total_tickets?: number;
}


export const read = async () =>{
    const result = await sql({
        query: 'SELECT * From booking'
    });

    return result as BookingModel[];
}

export const create = async(data: Pick<BookingModel, Exclude<keyof BookingModel, 'id' | 'status'| 'total_tickets'>>)=>{
    const result = (await sql({
        query:`
      INSERT INTO booking (
      trip_type,
      user_id,
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
      return_shuttle_time
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  values: [ data.trip_type,
    data.user_id,
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
    data.return_shuttle_time]
    })
    ) as any;
    console.log('Inserted result:', result);
     const insertedId = await sql({
        query: `SELECT LAST_INSERT_ID() AS id;`
    });

    return insertedId ? { id: insertedId } : null;
};

export const update = async (id: string, data: Pick<BookingModel, Exclude<keyof BookingModel, 'id' | 'status'| 'user_id' |'trip_type'|'arrivalpoint_date'|'arrivalpoint_time'|'flight_num'|'return_arrival_date'|'return_arrival_time'>>) => {
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
          ferry_time = ?,
          flight_time = ?,
          shuttle_date = ?,
          shuttle_time = ?,
          return_shuttle_date = ?,
          return_shuttle_time = ?
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
        data.ferry_time,
        data.flight_time,
        data.shuttle_date,
        data.shuttle_time,
        data.return_shuttle_date,
        data.return_shuttle_time,
        id]
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
  

  //管理端 Management
  export const checkOrders = async () =>{
    const result = await sql({
        query: 'SELECT *, (adult_num + child_num) AS total_tickets FROM booking ORDER BY shuttle_date ASC, shuttle_time ASC'
    });

    return result as BookingModel[];
}