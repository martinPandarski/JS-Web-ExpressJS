const User = require('../users/User');
const {
    validationResult
} = require('express-validator');
const Model = require('./Model');

module.exports = {
    get: {
        createCourse(req, res) {
            const isLoggedIn = (req.user !== undefined);
            res.render('courses/create-course.hbs', {
                isLoggedIn,
                username: isLoggedIn ? req.user.username : ''
            })
        },
        detailsCourse(req, res) {
            const {
                courseId
            } = req.params;
            
            Model.findById(courseId)
            .lean()
            .populate('enrolledUsers')
            .then((course) => {
                const hbsOpt = Object.keys(course).reduce((acc, curr) => {
                    acc[curr] = course[curr]
                    return acc;
                }, {});
                const isLoggedIn = (req.user !== undefined);
                const currentUser = JSON.stringify(req.user._id)
                const imAlreadyInTheCourse = JSON.stringify(course.enrolledUsers).includes(currentUser);
                    res.render('courses/details-course', {
                        ...hbsOpt,
                        isLoggedIn,
                        username: isLoggedIn ? req.user.username : '',
                        isTheCreator: currentUser === JSON.stringify(course.creator),
                        imAlreadyInTheCourse
                    })
                })
        },
        enrollForCourse(req, res) {
            const {
                courseId
            } = req.params;
            const userId = req.user._id

            Promise.all([Model.updateOne({
                    _id: courseId
                }, {
                    $push: {
                        enrolledUsers: userId
                    }
                }),
                User.updateOne({
                    _id: userId
                }, {
                    $push: {
                        enrolledCourses: courseId
                    }
                })
            ]).then(([updatedModel, updatedUser]) => {
                res.redirect(`/courses/details-course/${courseId}`, )
            })
        }
    },
    post: {
        createCourse(req, res) {
            const {
                title,
                description,
                imageUrl,
                isPublic: isChecked
            } = req.body;
            const isPublic = isChecked === 'on' ? true : false;
            const createdAt = (new Date() + '').slice(0, 24);
            const creator = req.user._id;
            Model.create({
                title,
                description,
                imageUrl,
                isPublic,
                createdAt,
                creator
            }).then((createdCourse) => {
                console.log(createdCourse);
                res.status(201).redirect('/home/')
            })
        }
    }
}