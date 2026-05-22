console.log("JS Running 🔥");

const form =
document.getElementById(
"contact-form"
);

const productSelect =
document.querySelector(
"select"
);

const priceInput =
document.getElementById(
"price"
);

// Product Price Auto Change
productSelect.addEventListener(
"change",
function(){

const prices = {

"Cold Coffee":
"₹299",

"Hot Coffee":
"₹199",

"Pizza":
"₹499",

"Burger":
"₹249",

"Sandwich":
"₹149",

"Other":
"Contact Us"

};

priceInput.value =
prices[
productSelect.value
] || "";

});

// Form Submit
form.addEventListener(
"submit",
async function(e){

e.preventDefault();

const inputs =
form.querySelectorAll(
"input, select, textarea"
);

const data = {

name:
inputs[0].value,

phone:
inputs[1].value,

email:
inputs[2].value,

product:
inputs[3].value,

price:
inputs[4].value,

message:
inputs[5].value

};


try {

const response =
await fetch(
https://moon-brew-cafe.onrender.com
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(data)

});

const result =
await response.json();

console.log(result);

alert(
result.message
);

form.reset();

priceInput.value = "";

} catch(error){

console.log(
"Error:",
error
);

alert(
"Backend not connected 😢"
);

}

});
// Homepage Products

async function getProducts(){

const response =
await fetch(
"http://localhost:5000/products"
);

const data =
await response.json();

const container =
document.getElementById(
"products-container"
);

if(!container) return;

container.innerHTML = "";

data.forEach(item => {

container.innerHTML += `

<div class="product-card">

<img src="${item.image}">

<h2>
${item.name}
</h2>

<p class="product-price">
💰 ${item.price}
</p>

<p>
${item.description}
</p>

<br>

<button
class="buy-btn"
onclick='addToCart(${JSON.stringify(item)})'>

🛒 Order Now

</button>

</div>

`;

});

}

getProducts();

// Checkout Open

const checkoutBtn =
document.getElementById(
"checkout-btn"
);

if(checkoutBtn){

checkoutBtn.addEventListener(
"click",
openCheckout
);

}

function openCheckout(){

document.getElementById(
"checkout-popup"
).style.display =
"flex";

const summary =
document.getElementById(
"order-summary"
);

summary.innerHTML = "";

let total = 0;

cart.forEach(item => {

const price =
parseInt(
item.price.replace(
"₹",
""
)
);

const itemTotal =
price *
item.quantity;

total += itemTotal;

summary.innerHTML += `

<p>
${item.name}
x${item.quantity}
=
₹${itemTotal}
</p>

`;

});

document.getElementById(
"checkout-total"
).innerText =
"Total: ₹" + total;

}

let cart = [];

// Add To Cart

function addToCart(product){

const existingItem =
cart.find(item =>
item.name ===
product.name
);

if(existingItem){

existingItem.quantity += 1;

}else{

cart.push({
...product,
quantity:1
});

}

document.getElementById(
"cart-panel"
).style.display =
"block";

updateCart();

}

// Update Cart

function updateCart(){

const cartItems =
document.getElementById(
"cart-items"
);

const totalPrice =
document.getElementById(
"total-price"
);

cartItems.innerHTML = "";

let total = 0;

if(cart.length === 0){

cartItems.innerHTML =
"<p>Cart Empty 😢</p>";

totalPrice.innerText =
"Total: ₹0";

return;

}

cart.forEach(
(item,index)=>{

const price =
parseInt(
item.price.replace("₹","")
);

total += price;

cartItems.innerHTML += `

<div class="cart-item">

<div>
${item.name}
x${item.quantity}
<br>
💰 ${item.price}
</div>

<button
class="remove-btn"
onclick="removeItem(${index})">

❌

</button>

</div>

`;

});

totalPrice.innerText =
"Total: ₹" + total;

}

// Remove Item

function removeItem(index){

cart.splice(index,1);

updateCart();

if(cart.length === 0){

document.getElementById(
"cart-panel"
).style.display =
"none";

}

}

document.getElementById(
"checkout-btn"
).addEventListener(
"click",
openCheckout
);

function openCheckout(){

document.getElementById(
"checkout-popup"
).style.display =
"flex";

const summary =
document.getElementById(
"order-summary"
);

summary.innerHTML = "";

let total = 0;

cart.forEach(item => {

const price =
parseInt(
item.price.replace("₹","")
);

total +=
price *
item.quantity;

summary.innerHTML += `

<p>
${item.name}
x${item.quantity}
=
₹${price * item.quantity}
</p>

`;

});

document.getElementById(
"checkout-total"
).innerText =
"Total: ₹" + total;

}

// Place Order

async function placeOrder(){

const name =
document.getElementById(
"checkout-name"
).value;

const phone =
document.getElementById(
"checkout-phone"
).value;

const address =
document.getElementById(
"checkout-address"
).value;

if(
!name ||
!phone ||
!address
){

alert(
"Please fill all details 😢"
);

return;

}

let total = 0;

cart.forEach(item => {

const price =
parseInt(
item.price.replace(
"₹",
""
)
);

total +=
price *
item.quantity;

});

const orderData = {

name,
phone,
address,

items: cart,

total:
"₹" + total

};

try {

const response =
await fetch(
"http://localhost:5000/contact",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(
orderData
)

});

const result =
await response.json();

alert(
"Order Placed 😎🔥"
);

cart = [];

updateCart();

document.getElementById(
"checkout-popup"
).style.display =
"none";

document.getElementById(
"checkout-name"
).value = "";

document.getElementById(
"checkout-phone"
).value = "";

document.getElementById(
"checkout-address"
).value = "";

} catch(error){

console.log(error);

alert(
"Order Failed 😢"
);

}

}
