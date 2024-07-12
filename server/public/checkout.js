document.addEventListener('DOMContentLoaded', function () {

    const checkoutButton = document.querySelector('.cartbtn .checkout');
    checkoutButton.addEventListener('click', () => {

        console.log('Checkout button clicked')

        fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    { id: 111, quantity: 2 },
                    { id: 112, quantity: 1 },
                ],
            }),
        })
            .then(res => {
                if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))
            })
            .then(({ url }) => {
                console.log(url)
                // window.location = url
            })
            .catch(e => {
                console.error(e.error)
            })
    })
})
