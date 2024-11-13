//js for pop menu

function showDetails(productId) {
    document.getElementById(productId).style.display = 'flex';
}

function hideDetails(productId) {
   document.getElementById(productId).style.display = 'none';
}


// js for search 

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const contentBoxes = document.querySelectorAll(".shop-section-box");

searchBtn.addEventListener("click", () => {
    const searchTerm = searchBar.value.toLowerCase(); 
    contentBoxes.forEach((box) => {
    const contentText = box.querySelector(".shop-section-box-text").textContent.toLowerCase();
        if (contentText.includes(searchTerm)) {
            box.style.display = "inline-block";
        } else {
            box.style.display = "none";
        }
    });
});


//js for add to cart
const cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartModal = document.getElementById('cart-modal');
const totalPriceElement = document.getElementById('total-price');
const closeButton = document.querySelector('.close-button');
const viewCartButton = document.getElementById('view-cart');
const clearCartButton = document.getElementById('clear-cart');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const productId = productElement.dataset.id;
        const productName = productElement.querySelector('h2').innerText;
        const productPrice = productElement.querySelector('p').innerText;

        cart.push({ id: productId, name: productName, price: productPrice });
        updateCartCount();
    });
});

viewCartButton.addEventListener('click', () => {
    displayCart();
    cartModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

clearCartButton.addEventListener('click', () => {
    cart.length = 0;
    updateCartCount();
    displayCart();
});

function updateCartCount() {
    cartCountElement.innerText = cart.length;
}

function displayCart() {
    cartItemsElement.innerHTML = '';
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p style="text-align:center;">Your cart is empty!<br> <button class="btn"  style="margin-top: 10px;"><a href="nursery.html">Continue Shopping</a></button></p>';
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
            <div style="border: 1px solid #808080; padding: 5px; margin: 10px; display: flex; flex-direction: row; justify-content: space-between;">
            <p style="padding-left: 1rem;"><a href="signin.html" target="main" style="color: #000;">${item.name} - ${item.price}</a></p>
            <button class="remove-item btn" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            `;
            cartItemsElement.appendChild(itemElement);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                cart.splice(index, 1);
                updateCartCount();
                displayCart();
            });
        });
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = "none";
    }
}