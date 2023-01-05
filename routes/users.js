const router = require('express').Router();
const { getUsers, getUsersById, createUser } = require('../controllers/users');

router.get('/users', getUsers);
router.post('/users', createUser);

router.get('/users/:id', getUsersById);




module.exports = router;