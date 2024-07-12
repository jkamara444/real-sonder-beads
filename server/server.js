require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const storeItems = new Map([

    [111, { price_in_cents: 700, name: "Single Color Beaded Waistbead" }],
    [112, { price_in_cents: 700, name: "Brown and Gold Beaded Waistbead" }],
    [113, { price_in_cents: 700, name: "Black and Blue Beaded Waistbead" }],
    [114, { price_in_cents: 700, name: "Colorful Beaded Waistbead" }],
    [121, { price_in_cents: 1000, name: "Single Color Crystal Waistbead" }],
    [122, { price_in_cents: 1000, name: "Mixed Color Crystal Waistbead" }],
    [123, { price_in_cents: 1200, name: "Red and Gold Crystal Waistbead" }],
    [124, { price_in_cents: 1200, name: "Green and Pink Crystal Waistbead" }],
    [125, { price_in_cents: 1500, name: "Custom Waistbead" }],

    [211, { price_in_cents: 300, name: "Single Color Beaded Bracelet" }],
    [221, { price_in_cents: 500, name: "Single Color Crystal Bracelet" }],
    [222, { price_in_cents: 1000, name: "Mixed Color Crystal Waistbead" }],
    [231, { price_in_cents: 500, name: "Single Color Gemstone Bracelet" }],
    [232, { price_in_cents: 500, name: "Tigers Eye Gemstone Bracelet" }],
    [233, { price_in_cents: 500, name: "Other Gemstone Bracelet" }],
    [125, { price_in_cents: 1500, name: "Custom Bracelet" }],

])

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.price_in_cents,
                    },
                    quantity: item.quantity,
                }
            }),
            sucess_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    };
});

app.listen(3000)
