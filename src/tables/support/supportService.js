import knex from "../../database/knex.js";
const TABLE_NAME = "SupportThreads";


const getAllThreads = async () => {
  try {
    return await knex(TABLE_NAME).select("*");
  } catch (error) {
    throw new Error(`Error fetching all threads: ${error.message}`);
  }
};

const getThreadsByUserId = async (userId) => {
  try {
    return await knex(TABLE_NAME).select("*").where({ user_id: userId });
  } catch (error) {
    throw new Error(`Error fetching threads for user ${userId}: ${error.message}`);
  }
};

const createThread = async (userId, subject) => {
  try {
    const [threadId] = await knex(TABLE_NAME).insert({
      user_id: userId,
      support_subject: subject,
      created_at: new Date(),
    });
    return { threadId };
  } catch (error) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
};

const updateThreadStatus = async (threadId, newStatus) => {
    try {
      const validStatuses = ['open', 'closed'];
  
      if (!validStatuses.includes(newStatus)) {
        throw new Error(`Invalid status. Allowed values are: ${validStatuses.join(', ')}`);
      }
  
      const updatedRows = await knex(TABLE_NAME)
        .where({ id: threadId })
        .update({ support_status: newStatus });
  
      if (updatedRows === 0) {
        throw new Error(`Thread with ID ${threadId} not found.`);
      }
  
      return { success: true, message: `Thread status updated to '${newStatus}'` };
    } catch (error) {
      throw new Error(`Error updating thread status: ${error.message}`);
    }
  };
  

export default {
  getAllThreads,
  getThreadsByUserId,
  createThread,
  updateThreadStatus
};