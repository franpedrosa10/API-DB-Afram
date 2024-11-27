import knex from "../../database/knex.js";
const TABLE_NAME = "SupportMessages";

const getMessagesByThreadId = async (threadId) => {
  try {
    return await knex(TABLE_NAME).select("*").where({ thread_id: threadId });
  } catch (error) {
    throw new Error(`Error fetching messages for thread ${threadId}: ${error.message}`);
  }
};

const addMessageToThread = async (threadId, senderType, message) => {
  try {
    const [messageId] = await knex(TABLE_NAME).insert({
      thread_id: threadId,
      sender_type: senderType,
      message,
      created_at: new Date(),
    });
    return { messageId };
  } catch (error) {
    throw new Error(`Error adding message to thread ${threadId}: ${error.message}`);
  }
};

export default {
  getMessagesByThreadId,
  addMessageToThread,
};
