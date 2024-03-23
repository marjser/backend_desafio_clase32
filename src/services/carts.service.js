const CartsDAO = require("../DAO/mongo/cart-dao.mongo");
const users = require("./users.service");



const Carts = new CartsDAO()

// FUNCIÓN PARA OBTENER TODOS LOS PRODUCTOS EN EL CARRITO

const carts = async () => {
    try {
        const carts = await Carts.allCarts()
        return carts
    } catch (error) {
        throw error
    }
}

// FUNCIÓN PARA BUSCAR UN CARRITO POR SU ID

const cartFindId = async (id) => {
    try {
        //const cartId = await Carts.cartId(id)

        const { _id, products, user} = await Carts.cartId(id)
        
        const cartDocs = []
        
        products.forEach(prod => {
            const data = prod
            const { product, quantity } = data
            const { _id, title, code, price , stock, category } = product
            const prodId = _id.toString()
            cartDocs.push({ prodId, title, code, price , stock, category, quantity })
            
        });
        
        const cartId = _id.toString()

        const cart = {
            _id,
            cartId,
            cartDocs,
            user
        }

        return cart
    } catch (error) {
        throw error
    }
}


// FUNCIÓN PARA AGREGAR UN CARRITO

const addCart = async (userId) => {
    try {
        const newCart = await Carts.addCart(userId)
        const {user} = newCart
        if (user) {
            console.log('hay un usuario(desde cart.services)')
            users.addCartToUser(newCart._id, user)
        }
        //console.log(newCart)
        return newCart
    } catch (error) {
        throw error
    }
}

// FUNCIÓN PARA AGREGAR UN PRODUCTO AL CARRITO

const addProdToCart = async (cid, pid) => {
    try {
        const newProdInCart = await Carts.addProdToCart(cid, pid)
        return newProdInCart
    } catch (error) {
        throw error
    }
}

// FUNCIÓN PARA AGREGAR CANTIDAD DE PRODUCTOS A UN CARRITO DESDE REQ.BODY

const addQuantToCart = async (cartId, productId, quantity) => {
    try {
        
        const prodAdded = await Carts.addQuantityProdtoCart(cartId, productId, quantity)
        return prodAdded

    } catch (error) {
        throw error
    }
}

// FUNCIÓN PARA ELIMINAR UN PRODUCTO DE UN CARRITO

const deleteProductFromCart = async (id, pid) => {
    try {
        const deletedProd = await Carts.deleteProdFromCart(id, pid)
        return deletedProd
    } catch (error) {
        throw error
    }
}

// FUNCIÓN PARA BORRAR TODOS LOS PRODUCTOS DE UN CARRITO

const deleteAllProd = async (cid) => {
    try {
        const deletedCart = await Carts.deleteAllProdFromCart(cid)
        return deletedCart
    } catch (error) {
        throw error
    }
}

// FUNCIÓN PARA ELIMINAR UN CARRITO

const deleteCart = async (cid) => {
    try {
        const deletedCart = await Carts.deleteCart(cid)
        return deletedCart
    } catch (error) {
        throw error
    }
}

// FUNCIÓN PARA FINALIZAR CARRITO

const finishCart = async (id) => {
    try {
        
        const { _id, products, user} = await Carts.cartId(id)
    
        const cartDocs = []
            
        products.forEach(prod => {
            const data = prod
            const { product, quantity } = data
            const { _id, title, code, price , stock, category } = product
            const prodId = _id.toString()
            cartDocs.push({ prodId, title, code, price , stock, category, quantity })
            
        });
    
        const { cartFinished, productsStock } = await Carts.finishCart(cartDocs)
        
        const cartId = _id.toString()
        
        const cart = {
            _id,
            cartId,
            cartDocs,
            user
        }

        return {cartFinished, productsStock}
    } catch (error) {
        throw error
    }


}







module.exports = {carts, cartFindId, addCart, addProdToCart, addQuantToCart, deleteProductFromCart, deleteAllProd, deleteCart, finishCart}