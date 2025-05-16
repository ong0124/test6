import { H3Event } from "h3";
import dayjs from 'dayjs';

import * as bookingModel from '~~/server/models/booking'

export const read = async (event: H3Event) => {
  const query = getQuery(event);
  const sortBy = (query.sortBy as string) || 'departure_loc';
  const date = (query.date as string) || dayjs().format('YYYY-MM-DD');
  console.log('🛬 後端收到查詢:', { sortBy, date });  
  try {
    const result = await bookingModel.read(sortBy,date);

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};


export const create = async (evt: H3Event)=>{
    try{
        const body = await readBody(evt);
        const result = await bookingModel.create({
            trip_type: body.trip_type,
            LineID: body.LineID,
            adult_num: body.adult_num, 
            child_num: body.child_num, 
            contact_phone: body.contact_phone, 
            totalprice: body.totalprice, 
            contact_name: body.contact_name, 
            departure_loc: body.departure_loc, 
            destination_loc: body.destination_loc, 
            return_departure: body.return_departure, 
            return_destination: body.return_destination, 
            arrivalpoint_date: body.arrivalpoint_date, 
            arrivalpoint_time: body.arrivalpoint_time, 
            return_arrival_date: body.return_arrival_date, 
            return_arrival_time: body.return_arrival_time, 
            flight_num: body.flight_num, 
            ferry_time: body.ferry_time, 
            flight_time: body.flight_time, 
            shuttle_date: body.shuttle_date, 
            shuttle_time: body.shuttle_time, 
            return_shuttle_date: body.return_shuttle_date, 
            return_shuttle_time: body.return_shuttle_time,
            status:body.status,
            payment_status:body.payment_status,
        });
        if (!result || !result.id) {
            throw createError({ statusCode: 500, statusMessage: 'Failed to create booking, no ID returned' });
          }
        return {
            data: result,
            id: result.id,
          };
        } catch (err) {
          console.error('ErrorController:', err);
          throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
          });
        }
      };


export const FindBookingDetailById = async (evt: H3Event) => {
try {
    const result = await bookingModel.FindBookingDetailById(evt.context.params?.id as string);

    return {
    data: result
    };
} catch {
    throw createError({
    statusCode: 500,
    statusMessage: 'Something went wrong'
    });
}
};

export const FindBookingByUserId = async (evt: H3Event) => {
    try {
        const result = await bookingModel.FindBookingByUserId(evt.context.params?.id as string);
    
        return {
        data: result
        };
    } catch {
        throw createError({
        statusCode: 500,
        statusMessage: 'Something went wrong'
        });
    }
};

export const NotTraveledBooking = async (evt: H3Event) => {
    try {
        const result = await bookingModel.NotTraveledBooking(evt.context.params?.id as string);
    
        return {
        data: result
        };
    } catch {
        throw createError({
        statusCode: 500,
        statusMessage: 'Something went wrong'
        });
    }
};

export const remove = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);

    const id = body.id;

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing ID'
      });
    }

    const result = await bookingModel.remove(id);
    return { success: true, data: result };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
  };


  // export const update = async (evt: H3Event) => {
  //   try {
  //     const id = evt.context.params?.id;
  //     if (!id) {
  //       throw createError({
  //         statusCode: 400,
  //         statusMessage: 'Invalid request: ID is required'
  //       });
  //     }
  
  //     // 讀取請求 body
  //     const body = await readBody(evt);
  //     if (!body) {
  //       throw createError({
  //         statusCode: 400,
  //         statusMessage: 'Invalid request: Missing body data'
  //       });
  //     }
  //     const result = await bookingModel.update(evt.context.params?.id as string, {
  //       adult_num :body.adult_num,
  //       child_num: body.child_num,
  //       contact_phone: body.contact_phone,
  //       totalprice: body.totalprice,
  //       contact_name: body.contact_name,
  //       departure_loc: body.departure_loc,
  //       destination_loc: body.destination_loc,
  //       return_departure: body.return_departure,
  //       return_destination: body.return_destination,
  //       ferry_time: body.ferry_time,
  //       flight_time: body.flight_time,
  //       shuttle_date: body.shuttle_date,
  //       shuttle_time: body.shuttle_time,
  //       return_shuttle_date: body.return_shuttle_date,
  //       return_shuttle_time: body.return_shuttle_time,
  //     });
  
  //     return {
  //       data: result
  //     };
  //   } catch {
  //     throw createError({
  //       statusCode: 500,
  //       statusMessage: 'Something went wrong'
  //     });
  //   }
  // };