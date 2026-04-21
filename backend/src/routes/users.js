const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// All admin-only
router.use(protect, admin);

router.get('/stats', getUserStats);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
