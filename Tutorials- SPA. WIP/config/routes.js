const router = require('../routes')


module.exports = (app) => {
    app.use('/', router.home)
    app.use('/home',router.home);
    app.use('/users', router.users);
    app.use('/courses', router.models)
    // app.use('*', (req,res,next) => {
        
    // })
}