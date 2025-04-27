import { c as createError, r as readBody, g as getQuery, e as useBase, f as createRouter, h as defineEventHandler } from '../../_/nitro.mjs';
import { createPool } from 'mysql2/promise';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:path';

const pool = createPool({
  host: "35.76.152.103",
  user: "qs-tech-remote",
  database: "line_booking_ticket",
  password: "Qs202588",
  port: 3306,
  connectionLimit: 10,
  queueLimit: 0
});
const sql = async ({ query, values }) => {
  try {
    const [rows] = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Database query failed");
  }
};

const read$5 = async () => {
  const result = await sql({
    query: "SELECT id, full_name, created_at, birthday, email FROM users"
  });
  return result;
};
const create$5 = async (data) => {
  var _a;
  const result = await sql({
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
      (_a = data.birthday) != null ? _a : null
    ]
  });
  console.log("Inserted result:", result);
  return result.insertId ? { ...data, id: result.insertId } : null;
};
const detail$1 = async (id) => {
  const result = await sql({
    query: "SELECT * FROM users WHERE id = ?",
    values: [id]
  });
  return result.length === 1 ? result[0] : null;
};
const update$5 = async (id, data) => {
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
  return await detail$1(id);
};
const remove$5 = async (id) => {
  await sql({
    query: "DELETE FROM users WHERE id = ?",
    values: [id]
  });
  return true;
};

const read$4 = async () => {
  try {
    const result = await read$5();
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const create$4 = async (evt) => {
  try {
    const body = await readBody(evt);
    if (!body.id || !body.full_name) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing Line User Document"
      });
    }
    const result = await create$5({
      id: body.id,
      full_name: body.full_name,
      created_at: /* @__PURE__ */ new Date(),
      // 自動填入當前時間
      birthday: body.birthday || null
    });
    return {
      success: true,
      data: result
    };
  } catch (err) {
    console.error("Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const detail = async (evt) => {
  var _a;
  try {
    const result = await detail$1((_a = evt.context.params) == null ? void 0 : _a.id);
    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const update$4 = async (evt) => {
  try {
    const body = await readBody(evt);
    if (!body.id) {
      throw createError({ statusCode: 400, statusMessage: "Missing user ID" });
    }
    const result = await update$5(body.id, {
      full_name: body.full_name,
      birthday: body.birthday
    });
    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const remove$4 = async (evt) => {
  try {
    const body = await readBody(evt);
    const id = body.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing user ID"
      });
    }
    const result = await remove$5(id);
    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};

const read$3 = async (sortBy = "departure_loc") => {
  const result = await sql({
    query: `SELECT *, (adult_num + child_num) AS total_tickets FROM booking ORDER BY \`${sortBy}\` ASC`
  });
  return result;
};
const create$3 = async (data) => {
  const result = await sql({
    query: `
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
    values: [
      data.trip_type,
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
      data.return_shuttle_time
    ]
  });
  console.log("Inserted result:", result);
  const insertedId = await sql({
    query: `SELECT LAST_INSERT_ID() AS id;`
  });
  return insertedId ? { id: insertedId } : null;
};
const update$3 = async (id, data) => {
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
      id
    ]
  });
  return await FindBookingDetailById$1(id);
};
const FindBookingDetailById$1 = async (id) => {
  const result = await sql({
    query: "SELECT * from booking WHERE id = ?",
    values: [id]
  });
  return result.length === 1 ? result[0] : null;
};
const FindBookingByUserId$1 = async (user_id) => {
  const result = await sql({
    query: "SELECT * from booking WHERE user_id = ?",
    values: [user_id]
  });
  return result;
};
const NotTraveledBooking$1 = async (user_id) => {
  const result = await sql({
    query: "SELECT * FROM booking WHERE user_id = ? AND status = 'notTraveled'",
    // 使用雙引號包住整個 SQL 字串
    values: [user_id]
  });
  return result;
};
const remove$3 = async (id) => {
  await sql({
    query: "DELETE FROM booking WHERE id = ?",
    values: [id]
  });
  return true;
};

const read$2 = async (event) => {
  const query = getQuery(event);
  const sortBy = query.sortBy || "departure_loc";
  try {
    const result = await read$3(sortBy);
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const create$2 = async (evt) => {
  try {
    const body = await readBody(evt);
    const result = await create$3({
      trip_type: body.trip_type,
      user_id: body.user_id,
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
      return_shuttle_time: body.return_shuttle_time
    });
    if (!result || !result.id) {
      throw createError({ statusCode: 500, statusMessage: "Failed to create booking, no ID returned" });
    }
    return {
      data: result,
      id: result.id
    };
  } catch (err) {
    console.error("ErrorController:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const FindBookingDetailById = async (evt) => {
  var _a;
  try {
    const result = await FindBookingDetailById$1((_a = evt.context.params) == null ? void 0 : _a.id);
    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const FindBookingByUserId = async (evt) => {
  var _a;
  try {
    const result = await FindBookingByUserId$1((_a = evt.context.params) == null ? void 0 : _a.id);
    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const NotTraveledBooking = async (evt) => {
  var _a;
  try {
    const result = await NotTraveledBooking$1((_a = evt.context.params) == null ? void 0 : _a.id);
    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const remove$2 = async (evt) => {
  try {
    const body = await readBody(evt);
    const id = body.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing ID"
      });
    }
    const result = await remove$3(id);
    return { success: true, data: result };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const update$2 = async (evt) => {
  var _a, _b;
  try {
    const id = (_a = evt.context.params) == null ? void 0 : _a.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request: ID is required"
      });
    }
    const body = await readBody(evt);
    if (!body) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request: Missing body data"
      });
    }
    const result = await update$3((_b = evt.context.params) == null ? void 0 : _b.id, {
      adult_num: body.adult_num,
      child_num: body.child_num,
      contact_phone: body.contact_phone,
      totalprice: body.totalprice,
      contact_name: body.contact_name,
      departure_loc: body.departure_loc,
      destination_loc: body.destination_loc,
      return_departure: body.return_departure,
      return_destination: body.return_destination,
      ferry_time: body.ferry_time,
      flight_time: body.flight_time,
      shuttle_date: body.shuttle_date,
      shuttle_time: body.shuttle_time,
      return_shuttle_date: body.return_shuttle_date,
      return_shuttle_time: body.return_shuttle_time
    });
    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};

const readAll$1 = async (filter) => {
  let query = `
    SELECT 
      r.id,
      r.booking_id,
      r.LineID,
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
      users u ON r.LineID = u.LineID
    JOIN 
      booking b ON r.booking_id = b.id
  `;
  if (filter === "approved") {
    query += ` WHERE r.status = 'approved'`;
  } else if (filter === "null") {
    query += ` WHERE r.status IS NULL`;
  }
  query += `
    ORDER BY 
      r.status IS NULL DESC,
      r.status ASC
  `;
  const result = await sql({ query });
  return result;
};
const create$1 = async (data) => {
  const result = await sql({
    query: `
      INSERT INTO refund_apply (
        booking_id,
        LineID,
        created_at
      ) VALUES (
        ?,
        ?,
        ?
      ) 
    `,
    values: [data.booking_id, data.LineID, data.created_at]
  });
  console.log("Inserted result:", result);
  return result.length === 1 ? result[0] : null;
};
const update$1 = async (id, data) => {
  const result = await sql({
    query: `
      UPDATE refund_apply
      SET
        status = ?
      WHERE id = ?
    `,
    values: [data.status, id]
  });
  console.log(result);
};

const readAll = async (evt) => {
  try {
    const query = getQuery(evt);
    const filter = query.filter || "all";
    const result = await readAll$1(filter);
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const create = async (evt) => {
  try {
    const body = await readBody(evt);
    const params = evt.context.params;
    const id = params == null ? void 0 : params.id;
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "Invalid booking_id" });
    }
    const result = await create$1({
      booking_id: Number(id),
      LineID: body.user_id,
      created_at: body.created_at
    });
    return {
      data: result
    };
  } catch (err) {
    console.error("ErrorController:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const update = async (evt) => {
  try {
    const body = await readBody(evt);
    const id = body.id;
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "Missing ID" });
    }
    const result = await update$1(id, {
      status: body.status
    });
    return {
      message: "\u66F4\u65B0\u6210\u529F",
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};

const read$1 = async () => {
  const result = await sql({
    query: "SELECT * FROM offDays_dates"
  });
  return result;
};
const createOffDays$1 = async (data) => {
  var _a;
  const result = await sql({
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
      (_a = data.end_offDays) != null ? _a : null,
      data.created_by
    ]
  });
  console.log("Inserted result:", result);
};
const remove$1 = async (id) => {
  await sql({
    query: "DELETE FROM offDays_dates WHERE id = ?",
    values: [id]
  });
  return true;
};

const read = async () => {
  try {
    const result = await read$1();
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const createOffDays = async (evt) => {
  try {
    const body = await readBody(evt);
    console.log("\u670D\u52A1\u5668\u6536\u5230\u7684\u6570\u636E:", body);
    if (!body.startOffDate || !body.created_by) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing Something"
      });
    }
    const result = await createOffDays$1({
      start_offDays: body.startOffDate,
      end_offDays: body.endOffDate || null,
      // 自動填入當前時間
      created_by: body.created_by
    });
    return {
      success: true,
      data: result
    };
  } catch (err) {
    console.error("Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};
const remove = async (evt) => {
  try {
    const body = await readBody(evt);
    const id = body.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing ID"
      });
    }
    const result = await remove$1(id);
    return { success: true, data: result };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    });
  }
};

const router = createRouter();
router.get("/GETbooking", defineEventHandler(read$2));
router.post("/POSTbooking", defineEventHandler(create$2));
router.get("/confirmationPage/:id", defineEventHandler(FindBookingDetailById));
router.get("/myTrip/:id", defineEventHandler(FindBookingByUserId));
router.get("/reschedulePage/:id", defineEventHandler(NotTraveledBooking));
router.get("/reschedulePage/details/:id", defineEventHandler(FindBookingDetailById));
router.put("/detailsUpdate/:id", defineEventHandler(update$2));
router.delete("/DeleteBookingById", defineEventHandler(remove$2));
router.get("/FindBookingDetailById/:id", defineEventHandler(FindBookingDetailById));
router.post("/PostRefund/:id", defineEventHandler(create));
router.get("/GetAllRefund", defineEventHandler(readAll));
router.put("/ApproveRefund", defineEventHandler(update));
router.get("/GETDetailUsers/:id", defineEventHandler(detail));
router.get("/GetUser", defineEventHandler(read$4));
router.put("/EditUser", defineEventHandler(update$4));
router.delete("/DeleteUser", defineEventHandler(remove$4));
router.post("/POSTUser", defineEventHandler(create$4));
router.get("/GETallOffdays", defineEventHandler(read));
router.post("/CreateOffDays", defineEventHandler(createOffDays));
router.delete("/DeleteOffDays", defineEventHandler(remove));
const _____ = useBase("/api", router.handler);

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
