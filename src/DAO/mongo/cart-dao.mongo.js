const Carts = require('../../models/cart.model')
const Products = require('../../models/product.model')
const users = require('../../services/users.service')



class CartsDAO {
    async allCarts () {
        try {
            const carts = await Carts.find({ status: true})
            return carts            
        } catch (error) {
            throw error
        }
    }

    async cartId (id) {
            const cartId = await Carts.findOne({ _id: id , status: true }).populate('products.product')
            return cartId
        } catch (error) {
            throw error
        }
    


    async addCart (userId) {
        try {

            const cart = {
                products: [],
                user: userId || null}
            const newCart = await Carts.create(cart)

            return newCart
        } catch (error) {
            throw error
        }
        
    }

    async addProdToCart (cid, pid) {
        try {
            if (!Products.findById(pid)) {
                return res.status(400).send({status:"error", error:"Incorrect Id Product"})
            } else {
                const cart = await Carts.findById(cid)
                const { _id, title } = await Products.findById(pid)
                

                const products = cart.products
                
                let prodOk = false

                for (const prod of cart.products) {
                    let prodId = prod.product.toString()
                    
                    if (prodId === pid) {
                        prod.quantity++
                        prodOk = true
                        break
                    }
                }
                

                if (!prodOk) {cart.products.push({product: pid, quantity: 1})}
                
                const prodAdd = await Carts.updateOne({ _id: cart._id}, cart ) 
                
                console.log(prodAdd)

                const cartId = _id.toString()
                const prodMessage = `Product ${title} added to cart`
                
                return { cartId, prodMessage}
            }
        } catch (error) {
            throw error
        }
    }

    // MÉTODO PARA AGREGAR CANTIDAD DE PRODUCTOS DESDE REQ.BODY

    async addQuantityProdtoCart (cartId, productId, quantity) {
        try {
            const cart = await Carts.findById(cartId).populate('products.product')

            let prodName 
                
            for (const prod of cart.products) {
                let prodId = prod.product._id.toString()
                

                if (prodId === productId) {
                    prodName = prod.product.title
                    

                    prod.quantity += Number(quantity)

                    break
                }
            }

            const prodAdd = await Carts.updateOne({ _id: cart._id}, cart ) 

            
            return `Quantity of ${quantity} added to product ${prodName}`
        } catch (error) {
            throw error
        }
    }
    
    async deleteAllProdFromCart (cid) {
       try {
            const cart = await Carts.findById(cid)

            cart.products = []

            await Carts.updateOne({ _id: cart._id}, cart)
            return 'All products deleted'
        } catch (error) {
            throw error
        }
   }

   async deleteCart (id) {
       try {
            const cart = await Carts.findById(id)
            if (cart.user) {
                const user = await users.getUserById(cart.user)

                const cartIndex = user.carts.findIndex(obj => obj.cart.toString() === id)
                user.carts.splice(cartIndex, 1)
                await users.updateUser(user._id, user)
            }
            
            await Carts.deleteOne({ _id: id})

           return 'Cart deleted'
        } catch (error) {
            throw error
        }
   }
  
   async deleteProdFromCart (cid, pid) {
        try {
            if (!Products.findById(pid)) {
                return res.status(400).send({status:"error", error:"Incorrect Id Product"})
            } else {
                const cart = await Carts.findById(cid)

                const {title} = await Products.findById(pid)
                
                const prodIds = []
                
                for (const prod of cart.products) {
                    let prodId = prod.product.toString()
                    prodIds.push(prodId)
                    
                    if (prodId === pid) {
                        const delIndex = prodIds.findIndex(prod => prod === pid)
                        cart.products.splice(delIndex, 1)
                        break
                    }
                }


                let prodAdd = await Carts.updateOne({ _id: cart._id}, cart ) 



                return `Product ${title} deleted from Cart`
            }
        } catch (error) {
            throw error
        }

    }

    async finishCart (cartDocs) {
        try {
            const cartFinished = []
            const productsStock = []
    
            for (let product of cartDocs) {
                const { quantity, prodId } = product
    
                const productData = await Products.findById(prodId)
                if (productData.stock >= quantity) {
                    productData.stock -= quantity
    
                    const prodPurch = await Products.updateOne({ _id: prodId}, productData )
                    
                    productData.quantity = quantity
                    cartFinished.push(productData)
                } else {
                    productsStock.push(prodId)

                }
    
            }
            
            return {cartFinished, productsStock}
        } catch (error) {
            throw error
        }
    }

}



module.exports = CartsDAO