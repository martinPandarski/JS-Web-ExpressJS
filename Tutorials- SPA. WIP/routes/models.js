const router = require('express').Router();
const handler = require('../handlers/model');
const isAuth = require('../utils/isAuth');
const validations = require('../utils/validator');

router.get('/enroll-course/:courseId', isAuth(), handler.get.enrollForCourse)
router.get('/details-course/:courseId', isAuth(), handler.get.detailsCourse);
router.get('/create-course', isAuth(), handler.get.createCourse);
router.post('/create-course', isAuth(), handler.post.createCourse)

module.exports = router;