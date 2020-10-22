const Model = require('../model/Model');

module.exports = {
    get: {
        home(req, res) {
            Model.find({isPublic: true}).limit(3).lean().then((c) => {
                const isLoggedIn = req.user !== undefined;
                const courses = c.reduce((acc,curr) => {
                    acc.push({...curr, isLoggedIn});
                    return acc
                }, []);
                res.render('home/home.hbs', {
                    isLoggedIn,
                    username: isLoggedIn ? req.user.username : '',
                    isNotLoggedIn: !isLoggedIn,
                    courses
                });

            })
        }
    }
}