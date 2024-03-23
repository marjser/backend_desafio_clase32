

const NewUserDto = require('../DTO/new-user.dto')
const NewUserDao = require('../DAO/mongo/new-user-dao.mongo')
const CustomError = require('../handlers/CustomError')
const TYPE_ERRORS = require('../handlers/errors/types-errors')

const newUserDao = new NewUserDao()

const createUser = async (userData) => {
    try {
        const user = await newUserDao.checkUser(userData.email)
        if (user) {
            return 'invalid user'
        }    
    
        const newUserDto = new NewUserDto(userData)
        const newUser = await newUserDao.createNewUser(newUserDto)
    
        return newUser
        
    } catch (error) {
        throw error
    }

}

const getUser = async (emailUser) => {
    try {
        const userDB = await newUserDao.getUser(emailUser)

        if (userDB) {
            const {first_name, last_name, age, email, role, id, cart, password } = userDB
            
            const user = {
                id,
                first_name,
                last_name,
                age,
                email,
                role,
                cart,
                password,
            }
            return user

        } else {
            return null
        }

    } catch (error) {
        throw error
    }
}

const getUserById = async (id) => {
    try {
        const userById = newUserDao.getUserById(id)
        return userById
    } catch (error) {
        throw error
    }
}

const addCartToUser = async (cartId, userId) => {
    try {
        const user = await newUserDao.getUserById(userId)
        const addedCart = await newUserDao.addCartToUserDao(cartId, userId)


        return 'Cart Added to user'
    } catch (error) {
        throw error
    }

}

const updateUser = async (userId, user) => {
    try {
        const userUpdate = await newUserDao.updateUserDao(userId, user)
        return 'User Updated'
    } catch (error) {
        throw error
    }
}

const checkUserCart = async (userId) => {
    try {
        const cartId = await newUserDao.checkUserCartDao(userId)
        return cartId
    } catch (error) {
        throw error
    }
}

module.exports = {createUser, getUser, getUserById, addCartToUser, updateUser, checkUserCart}