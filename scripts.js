// Sample product data (replace with your actual product details)
const products = [
    { name: 'Nike Shoes', price: 5000, image: 'img/nike-shoes.jpg' },
    { name: 'Adidas Shoes', price: 4500, image: 'img/adidas-shoes.jpg' },
    { name: 'Rolex Watch', price: 150000, image: 'img/rolex-watch.jpg' },
    { name: 'Titan Watch', price: 7000, image: 'img/titan-watch.jpg' }
];

// Ensure localStorage initialization
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(productName, price) {
    cart.push({ productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart.`);
    displayCartItems(); // Update cart display
}

// Function to display cart items
function displayCartItems() {
    const cartItemsSection = document.getElementById('cart-items');
    cartItemsSection.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsSection.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const product = products.find(p => p.name === item.productName); // Find product details
            if (product) {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="item-details">
                        <p>${product.name} - ₹${product.price}</p>
                        <button onclick="removeFromCart('${product.name}')">
                            <i class="fas fa-trash-alt"></i> Remove
                        </button>
                    </div>
                `;
                cartItemsSection.appendChild(itemElement);
            }
        });
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartItemsSection.innerHTML += `<p>Total: ₹${total}</p>`;
    }
}

// Function to remove item from cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.productName !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Update cart display
}

// Function to navigate to checkout page
function goToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to proceed to checkout.');
        return;
    }

    // If cart is not empty, proceed to checkout page
    window.location.href = 'checkout.html';
}



// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});



