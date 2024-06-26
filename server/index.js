require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const port = 3000

const dbConfig = process.env.dbURI
const mongoose = require('mongoose')

mongoose.connect(dbConfig)
    .then(result => console.log('Database connected'))
    .catch(error => console.error(error))

const authRoutes = require("./routes/auth")
const itemRoutes = require("./routes/item")
const cartRoutes = require("./routes/cart")
const orderRoutes = require("./routes/order")

app.use('/api', authRoutes)
app.use('/api', itemRoutes)
app.use('/api', cartRoutes)
app.use('/api', orderRoutes)

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(STRIPE_SECRET_KEY)

app.post('/create-checkout-session', async (req, res) => {
    const carts = req.body.carts
    const session = await stripe.checkout.sessions.create({
      line_items: carts.map(cart => {
        return {
          price_data : {
            currency: "inr",
            product_data: {
              name: cart.items[0].name,
              images: [cart.items[0].imageUrl]
            },
            unit_amount: cart.items[0].price * 100
          },
          quantity: cart.items[0].quantity,
        }
      }),
      client_reference_id: carts[0].userId,
      mode: 'payment',
      success_url: `https://sneakers-client.vercel.app/success/${carts[0].userId}`,
      cancel_url: `https://sneakers-client.vercel.app/user/${carts[0].userId}`,
    });
  
    return res.json({url: session.url});
  });

app.listen(port, () => {
    console.log(`App running on ${port}`)
})