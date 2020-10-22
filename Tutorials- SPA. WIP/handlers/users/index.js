const User = require('./User');
const jwt = require('../../utils/jwt');
const {cookie} = require('../../config/config');

module.exports = {
    get: {
        login(req, res, next) {
            res.render('users/login.hbs');
        },
        register(req, res, next) {
            res.render('users/register.hbs');
        },
        logout(req, res, next) {
            req.user = null;
            res.clearCookie(cookie).redirect('/home/');
        }
    },

    post: {
        login(req, res, next) {
            const {
                username,
                password
            } = req.body;
            console.log(username, password);

            User.findOne({
                    username
                })
                .then((user) => {
                    console.log(user)
                    return Promise.all([user.passwordsMatch(password), user])
                }).then(([match, user]) => {
                    if (!match) {
                        next();
                        return
                    }
                    const token = jwt.createToken(user);

                    res
                        .status(201)
                        .cookie(cookie, token, {
                            maxAge: 36000000
                        })
                        .redirect('/home/')
                })
        },
        register(req, res, next) {
            const {
                username,
                password,
                repeatPassword
            } = req.body; // either username or email depending on how you register
            if (password !== repeatPassword) {
                res.render('users/register.hbs', {
                    message: 'Passwords do not match! :/',
                    oldInput: {
                        username,
                        password,
                        repeatPassword
                    }
                });
                return;
            }
            User.findOne({
                    username
                })
                .then((currentUser) => {
                    if (currentUser) {
                        throw new Error('The given username has already been used! Try again')
                    };
                    return User.create({
                        username,
                        password
                    })
                }).then((createdUser) => {
                    res.redirect('/users/login');
                }).catch((err) => {
                    res.render('users/register.hbs', {
                        message: err.message,
                        oldInput: {
                            username,
                            password,
                            repeatPassword
                        }
                    })
                })


        }
    }
}