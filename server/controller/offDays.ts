import { H3Event } from 'h3';

import * as offDaysModel from '~~/server/models/offDays';


export const read = async () => {
    try {
      const result = await offDaysModel.read();
  
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
  
  export const createOffDays = async (evt: H3Event) => {
    try {
      // 讀取請求 Body
      const body = await readBody(evt);
      console.log('服务器收到的数据:', body);
  
      // 檢查必要的欄位是否存在
      if (!body.startOffDate  || !body.created_by) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Missing Something'
        });
      }

      const result = await offDaysModel.createOffDays({
        start_offDays: body.startOffDate,
        end_offDays: body.endOffDate || null, // 自動填入當前時間
        created_by: body.created_by
      });
  
      return {
        success: true,
        data: result
      };
    } catch (err) {
      console.error('Error:', err);
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

      const result = await offDaysModel.remove(id);
      return { success: true, data: result };
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Something went wrong'
      });
    }
  };