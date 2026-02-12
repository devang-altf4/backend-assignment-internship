const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../../controllers/userController');
const { protect } = require('../../middleware/auth');
const { authorize } = require('../../middleware/roleCheck');

router.get('/', protect, authorize('admin'), getUsers);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
