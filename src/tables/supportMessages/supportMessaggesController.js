import supportMessagesService from "./supportMessagesService.js";

const getMessagesByThreadIdController = async (req, res, next) => {
  const { threadId } = req.params;
  try {
    const messages = await supportMessagesService.getMessagesByThreadId(threadId);
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};

const addMessageToThreadController = async (req, res, next) => {
  const { threadId } = req.params;
  const { senderType, message } = req.body;
  try {
    const newMessage = await supportMessagesService.addMessageToThread(threadId, senderType, message);
    return res.status(201).json(true);
  } catch (error) {
    next(error);
  }
};

export default {
  getMessagesByThreadIdController,
  addMessageToThreadController,
};
