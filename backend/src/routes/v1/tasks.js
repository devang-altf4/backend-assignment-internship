const express = require('express');
const router = express.Router();
const {
  getTasks,
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../../controllers/taskController');
const { protect } = require('../../middleware/auth');
const { authorize } = require('../../middleware/roleCheck');
const validate = require('../../middleware/validate');
const { taskValidation, taskUpdateValidation } = require('../../utils/validators');

router.route('/')
  .get(protect, getTasks)
  .post(protect, taskValidation, validate, createTask);

router.get('/all', protect, authorize('admin'), getAllTasks);

router.route('/:id')
  .get(protect, getTask)
  .put(protect, taskUpdateValidation, validate, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
