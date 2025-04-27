import { H3Event } from "h3";
import * as refundModel from '~~/server/models/refund'

export const readAll = async (evt: H3Event) => {
    try {
      const query = getQuery(evt);  // 獲取過濾參數
      const filter = (query.filter as string) || 'all';  // 默認是 'all'

      const result = await refundModel.readAll(filter);

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

export const create = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const params = evt.context.params; 
    const id = params?.id;

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid booking_id' });
    }
    const result = await refundModel.create({
      booking_id: Number(id),
      LineID: body.user_id,
      created_at: body.created_at
    });
    return {
      data: result,
    };
  } catch (err) {
    console.error('ErrorController:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};


export const update = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const id = body.id;
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Missing ID' });
    }
    const result = await refundModel.update(id, {
      status: body.status,
    });

    return {
      message: '更新成功',
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
