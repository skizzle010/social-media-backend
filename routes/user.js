const express = require('express');
const { getAllUsers, createUsers } = require('../controller/user-controller');
const router = express.Router();

router.get('/',getAllUsers)
router.post('/',createUsers)
module.exports=router;