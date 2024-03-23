const viewsTemplateController = require('../controllers/views-template.controller')
const productsController = require('../controllers/products.controller')
const cartsController = require('../controllers/carts.controller')
const usersController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')

 


const router = app => {
    app.use('/', viewsTemplateController)
    app.use('/products', productsController)
    app.use('/carts', cartsController)
    app.use('/users', usersController)
    app.use('/auth', authController)
}




module.exports = router


