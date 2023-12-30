import axios from 'axios'

export async function getSneakers(id) {
    let apiCall = id ? `http://localhost:3000/api/sneakers/${id}` : "http://localhost:3000/api/sneakers"
    try {
        let sneakersData = await axios.get(apiCall)
        return sneakersData.data
    } catch (error) {
        throw error
    }
}

export async function login(formData) {
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const res = await axios.post("http://localhost:3000/api/login", { email: email, password: password })
        localStorage.setItem("token", res.data.token)
        return res
    } catch (error) {
        throw error
    }
}

export async function signup(formData) {
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const res = await axios.post("http://localhost:3000/api/register", { name: name, email: email, password: password })
        localStorage.setItem("token", res.data.token)
        return res
    } catch (error) {
        throw error
    }
}

export async function get_user() {
    try {
        if (localStorage.getItem("token") == null) {
            return null
        }
        const res = await axios.get("http://localhost:3000/api/user", { headers: { 'x-access-token': localStorage.getItem('token') } })
        return res
    } catch (error) {
        throw error
    }
}

export async function addingCart(user_id, items, bill) {
    try {
        const res = await axios.post("http://localhost:3000/api/cart", {id:user_id, items: items, bill: bill})
        return res
    } catch (error) {
        throw error
    }
}

export async function getCart(id) {
    try {
        const res = await axios.get(`http://localhost:3000/api/cart/${id}`)
        return res
    } catch (error) {
        throw error
    }
}

export async function removeItems(id, userId) {
    try {
        const res = await axios.post('http://localhost:3000/api/cart-remove', {productId: id, userId: userId})
        return res
    } catch(error) {
        throw error
    }
}

export async function updateCartQuanity(userId, productId, newQuantity) {
    try {
        const res = await axios.post("http://localhost:3000/api/cart-update", {userId: userId, productId: productId, quantity: newQuantity})
        return res
    } catch( error) {
        throw error
    }
}

export async function initializePayment(carts) {
    try {
        const res = await axios.post("http://localhost:3000/create-checkout-session", {carts: carts})
        return res
    } catch (error) {
        throw error
    }
}

export async function createOrder(userId) {
    try {
        const res = await axios.post("http://localhost:3000/api/create-order", {userId: userId})
        return res
    } catch(error) {
        throw error
    }
}

export async function getOrderList(id) {
    try {
        const res = await axios.get(`http://localhost:3000/api/order/${id}`)
        return res.data
    } catch(error) {
        throw error
    }
}

