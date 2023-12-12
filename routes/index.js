console.log('router loaded');

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const detailviewControllers = require('../controllers/detailview_Controller')

router.get('/', homeController.home);
router.use('/users', require('./user'));
router.use('/info', require('./info'))
router.get('/info/add/:id', detailviewControllers.add);

module.exports = router;