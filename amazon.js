const products = [
    { id: 1, name: "T-shirt", category: "Clothes", price: 500 },
    { id: 2, name: "Sofa", category: "Furniture", price: 15000 },
    { id: 3, name: "Lipstick", category: "Cosmetics", price: 300 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 20000 },
];

let cart = [];

function fetchProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        alert(`${product.name} added to cart!`);
        updateCartDisplay();
    } else {
        alert("Product not found!");
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    alert("Product removed from cart!");
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartDisplay = document.getElementById("cart-items");
    cartDisplay.innerHTML = "";

    if (cart.length === 0) {
        cartDisplay.innerHTML = "<p>Your cart is empty</p>";
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <p>${item.name} - ₹${item.price}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartDisplay.appendChild(cartItem);
        });
    }
}

document.querySelector('.search-icon').addEventListener('click', () => {
    const searchInput = document.querySelector('.search-input').value.toLowerCase();
    if (searchInput) {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchInput) ||
            product.category.toLowerCase().includes(searchInput)
        );
        displayProducts(results);
    } else {
        alert("Please enter a search term!");
    }
});

document.getElementById("back-to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function displayProducts(productList) {
    const shopSection = document.querySelector(".shop-section");
    shopSection.innerHTML = "";

    if (productList.length === 0) {
        shopSection.innerHTML = "<p>No products found!</p>";
    } else {
        productList.forEach(product => {
            const productBox = document.createElement("div");
            productBox.className = "box";
            productBox.innerHTML = `
                <div class="box-content">
                    <h2>${product.name}</h2>
                    <p>Category: ${product.category}</p>
                    <p>Price: ₹${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
            shopSection.appendChild(productBox);
        });
    }
}

window.onload = () => {
    displayProducts(products);
};
