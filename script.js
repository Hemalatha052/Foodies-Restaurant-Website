
/* CART */

let cart = [];

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    showToast(name + " added to cart!");
}


function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<div class="empty-cart">Your cart is empty.</div>';
    }

    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        itemCount += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = itemCount;
    cartTotal.textContent = total;
}


function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}


function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity === 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


function openCart() {
    document.getElementById("cartPanel").classList.add("active");
}


function closeCart() {
    document.getElementById("cartPanel").classList.remove("active");
}


/* TOAST */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}


/* SEARCH */

function searchFood() {

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".food-card");

    cards.forEach(card => {

        const foodName = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (foodName.includes(search)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}


/* CONTACT FORM */

function submitForm(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        showToast("Please fill all fields.");
        return;
    }

    showToast("Message sent successfully!");

    document.querySelector(".contact-form").reset();
}
