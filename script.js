// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

let shoppingCart = sessionStorage.getItem("shoppingCart")? JSON.parse(sessionStorage.getItem("shoppingCart")): [];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list")
const clearCartBtn = document.getElementById("clear-cart-btn");

renderProducts();
renderCart();
// Render product list

clearCartBtn.addEventListener('click', clearCart);
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

Array.from(document.getElementsByClassName('add-to-cart-btn')).forEach((elem) => {
    elem.addEventListener('click', () => {
        addToCart(elem.getAttribute('data-id'));
    })
})


// Render cart list
function renderCart() {
    cartList.innerHTML = "";
    if(!sessionStorage.getItem("shoppingCart")){
        return;
    }
    let currentCart = JSON.parse(sessionStorage.getItem("shoppingCart"))
    currentCart.forEach((elem,index) => {
        const li = document.createElement("li");
        li.innerHTML = `${elem.name} - $${elem.price} <button class="remove-from-cart-btn" data-id="${elem.id}" data-uq="${index}" onclick="removeFromCart(${index})">Remove from Cart</button>`;
        cartList.appendChild(li);
    })
    
}

// Add item to cart
function addToCart(productId) {
    shoppingCart.push(products[productId-1]);
    // console.log("Shopping cart is: ", shoppingCart);
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    renderCart();
}

// Remove item from cart
function removeFromCart(uniqueIndex) {
    shoppingCart = shoppingCart.filter((product,index) => {
        return uniqueIndex != index
    })
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    renderCart();
}

// Clear cart
function clearCart() {
    shoppingCart.length = 0;
    sessionStorage.removeItem("shoppingCart");
    cartList.innerHTML = ``;
}

// Initial render

