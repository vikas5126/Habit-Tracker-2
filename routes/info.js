const express = require('express');
const router = express.Router();
const passport = require('passport');
const detailviewControllers = require('../controllers/detailview_Controller')

// router.post('/create', passport.checkAuthentication, detailviewControllers.createhabit);
// router.get('/destroy/:id', passport.checkAuthentication, detailviewControllers.deletehabit);
router.post("/:id", detailviewControllers.home);
router.get("/", detailviewControllers.home2);
// router.post("/info/:id/add", detailviewControllers.add);
// router.get('/view/:id', detailviewControllers.showHabit);

module.exports = router;