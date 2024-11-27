import supportMessagesService from "./supportMessagesService.js";

const getMessagesByThreadIdController = async (req, res, next) => {
  const { threadId } = req.params;
  try {
    const messages = await supportMessagesService.getMessagesByThreadId(threadId);
    if (!messages || messages.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No messages found for this thread" });
    }
    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const addMessageToThreadController = async (req, res, next) => {
  const { threadId } = req.params;
  const { senderType, message } = req.body;
  try {
    const newMessage = await supportMessagesService.addMessageToThread(threadId, senderType, message);
    if (!newMessage) {
      return res
        .status(404)
        .json({ success: false, message: "Failed to add message to thread" });
    }
    return res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};


export default {
  getMessagesByThreadIdController,
  addMessageToThreadController,
};
