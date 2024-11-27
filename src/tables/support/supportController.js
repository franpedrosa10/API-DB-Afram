import supportService from "./supportService.js";


const getAllThreadsController = async (req, res, next) => {
  try {
    const threads = await supportService.getAllThreads();
    return res.status(200).json(true);
  } catch (error) {
    next(error);
  }
};

const getThreadsByUserIdController = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const threads = await supportService.getThreadsByUserId(userId);
    return res.status(200).json(true);
  } catch (error) {
    next(error);
  }
};

const createThreadController = async (req, res, next) => {
  const { userId, subject } = req.body;
  try {
    const newThread = await supportService.createThread(userId, subject);
    return res.status(201).json(true);
  } catch (error) {
    next(error);
  }
};

const updateThreadStatusController = async (req, res, next) => {
    const { threadId } = req.params;
    const { newStatus } = req.body;
  
    try {
      const result = await supportService.updateThreadStatus(threadId, newStatus);
      return res.status(200).json(true);
    } catch (error) {
      next(error);
    }
  };


export default {
    getAllThreadsController,
    getThreadsByUserIdController,
    createThreadController,
    updateThreadStatusController
};
