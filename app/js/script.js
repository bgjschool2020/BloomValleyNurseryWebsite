/*********************************/
/************ HEADER *************/

function openMenu() {
    const mobileHeader = document.getElementById("mobileHeader");
    if (mobileHeader.style.display === "block") {
        mobileHeader.style.display = "none";
    } else {
        mobileHeader.style.display = "block";
    }
}

/*********** END HEADER **********/
/*********************************/

/*********************************/
/******** NEWSLETTER FORM ********/

document
    .getElementById("newsletterForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission
        var email = document.getElementById("email").value;
        document.getElementById(
            "popupMessage"
        ).innerText = `Thanks for subscribing ${email}!`;
        document.getElementById("popup").style.display = "block";
    });

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("popup")) {
        document.getElementById("popup").style.display = "none";
    }
});

/****** END NEWSLETTER FORM ******/
/*********************************/

/*********************************/
/********** ADD TO CART **********/

let cart = [];

// Ensure event listeners are only attached once
if (!window.cartListenersAttached) {
    document.querySelectorAll(".cart-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const product = this.getAttribute("data-product");
            const price = parseFloat(
                this.getAttribute("data-price").replace("$", "")
            );
            cart.push({ product, price });

            // Create and show the temporary message
            const message = document.createElement("div");
            message.className = "cart-message";
            message.innerText = `Added ${product} to cart for $${price.toFixed(
                2
            )}`;
            this.closest(".product-card").appendChild(message);

            // Remove the message after 4 seconds
            setTimeout(() => {
                message.remove();
            }, 6000);
        });
    });

    document.getElementById("viewCart").addEventListener("click", function () {
        const cartItems = document.getElementById("cartItems");
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = `${item.product} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price;
        });
        const totalLi = document.createElement("li");
        totalLi.textContent = `Total: $${total.toFixed(2)}`;
        cartItems.appendChild(totalLi);
        document.getElementById("cartModal").style.display = "block";
    });

    document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("cartModal").style.display = "none";
    });

    document
        .getElementById("processOrder")
        .addEventListener("click", function () {
            alert("Thank you for your order!");
            cart = [];
            document.getElementById("cartModal").style.display = "none";
        });

    document.getElementById("clearCart").addEventListener("click", function () {
        alert("Cart is cleared!");
        cart = [];
        document.getElementById("cartModal").style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == document.getElementById("cartModal")) {
            document.getElementById("cartModal").style.display = "none";
        }
    });

    // Mark that the event listeners have been attached
    window.cartListenersAttached = true;
}

/****** END ADD TO CART **********/
/*********************************/


/*********************************/
/******** CONTACT FORM ***********/

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');

    if (!name && !email && !message) {
        formMessage.textContent = 'Please enter your name, email, and feedback.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    } else if (!name) {
        formMessage.textContent = 'Please enter your name.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    } else if (!email) {
        formMessage.textContent = 'Please enter your email.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    } else if (!message) {
        formMessage.textContent = 'Please enter your feedback.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    } else {
        formMessage.textContent = `Thank you for your message, ${name}!`;
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
    }
});

document.getElementById('clearForm').addEventListener('click', function() {
    document.getElementById('contactForm').reset();
    const formMessage = document.getElementById('formMessage');
    formMessage.style.display = 'none';
});

/****** END CONTACT FORM *********/
/*********************************/