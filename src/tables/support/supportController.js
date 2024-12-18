import supportService from "./supportService.js";


const getAllThreadsController = async (req, res, next) => {
  try {
    const threads = await supportService.getAllThreads();
    if (!threads || threads.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No threads found" });
    }
    return res.status(200).json(threads); // Devuelve threads con la bandera
  } catch (error) {
    next(error);
  }
};


const getThreadsByUserIdController = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const threads = await supportService.getThreadsByUserId(user_id);
    if (!threads || threads.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No threads found for this user" });
    }
    return res.status(200).json(threads);
  } catch (error) {
    next(error);
  }
};

const createThreadController = async (req, res, next) => {
  const { userId, subject } = req.body;
  try {
    const { threadId } = await supportService.createThread(userId, subject);
    if (!threadId) {
      return res
        .status(404)
        .json({ success: false, message: "Failed to create thread" });
    }
    return res.status(201).json(threadId);
  } catch (error) {
    next(error);
  }
};

const updateThreadStatusController = async (req, res, next) => {
  const { threadId } = req.params;
  const { newStatus } = req.body;
  
  try {
    const result = await supportService.updateThreadStatus(threadId, newStatus);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Thread not found or update failed" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getThreadsByIdController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const thread = await supportService.getThreadsById(id);
    if (!thread) {
      return res
        .status(404)
        .json({ success: false, message: "No threads found for this user" });
    }
    return res.status(200).json(thread);
  } catch (error) {
    next(error);
  }
};

// Eliminar thread
const deleteThreadController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await supportService.deleteThread(id);
    return res.status(200).json({ success: result });
  } catch (error) {
    next(error);
  }
};

// Eliminar todos las thread de un user
const deleteAllThreadsController = async (req, res, next) => {
  const { user_id } = req.params; 
  try {
    const result = await supportService.deleteAllThreads(user_id);
    return res.status(200).json({ success: result });
  } catch (error) {
    next(error);
  }
};

export default {
    getAllThreadsController,
    getThreadsByUserIdController,
    createThreadController,
    updateThreadStatusController,
    getThreadsByIdController,
    deleteThreadController,
    deleteAllThreadsController
};
