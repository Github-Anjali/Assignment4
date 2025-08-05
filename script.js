
// script.js

// const services = [
//   { name: "Dry Cleaning", price: 200 },
//   { name: "Wash & Fold", price: 100 },
//   { name: "Ironing", price: 30 },
//   { name: "Stain Removal", price: 500 },
//   { name: "Leather & Suede Cleaning", price: 999 },
//   { name: "Wedding Dress Cleaning", price: 2800 }
// ];

// const serviceList = document.getElementById("service-list");
// const cartBody = document.querySelector("#cart-items tbody");
// const totalAmount = document.getElementById("total-amount");
// const confirmationMsg = document.getElementById("confirmation-msg");

// let cart = [];

// function updateCart() {
//   cartBody.innerHTML = "";
//   let total = 0;
//   cart.forEach((item, index) => {
//     const row = `<tr>
//       <td>${index + 1}</td>
//       <td>${item.name}</td>
//       <td>₹${item.price}</td>
//     </tr>`;
//     total += item.price;
//     cartBody.innerHTML += row;
//   });
//   totalAmount.textContent = `₹${total.toFixed(2)}`;
// }

// function toggleItem(service, button) {
//   const index = cart.findIndex(i => i.name === service.name);
//   if (index === -1) {
//     cart.push(service);
//     button.textContent = "Remove Item";
//     button.classList.add("remove");
//   } else {
//     cart.splice(index, 1);
//     button.textContent = "Add Item";
//     button.classList.remove("remove");
//   }
//   updateCart();
// }

// services.forEach(service => {
//   const li = document.createElement("li");
//   li.innerHTML = `
//     <span>${service.name} - ₹${service.price.toFixed(2)}</span>
//     <button>Add Item</button>
//   `;
//   const button = li.querySelector("button");
//   button.addEventListener("click", () => toggleItem(service, button));
//   serviceList.appendChild(li);
// });
const cartItems = [];
const cartTableBody = document.getElementById('cart-items');
const totalAmount = document.getElementById('total-amount');

const addBtns = document.querySelectorAll('.add-btn');
const removeBtns = document.querySelectorAll('.remove-btn');

function getServiceDetails(button) {
  const parent = button.parentElement;
  const name = parent.querySelector('span').textContent.trim();
  const priceText = parent.querySelector('.price').textContent.trim();
  const price = parseFloat(priceText.replace(/[₹,]/g, ''));
  return { name, price };
}

function updateCart() {
  cartTableBody.innerHTML = '';
  let total = 0;

  cartItems.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>₹${item.price.toFixed(2)}</td>
    `;
    cartTableBody.appendChild(row);
    total += item.price;
  });

  totalAmount.textContent = `₹${total.toFixed(2)}`;
}

addBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const { name, price } = getServiceDetails(btn);
    const exists = cartItems.find(item => item.name === name);

    if (!exists) {
      cartItems.push({ name, price });
      updateCart();
    }

    btn.style.display = 'none';
    btn.parentElement.querySelector('.remove-btn').style.display = 'inline-block';
  });
});

removeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const { name } = getServiceDetails(btn);
    const index = cartItems.findIndex(item => item.name === name);

    if (index !== -1) {
      cartItems.splice(index, 1);
      updateCart();
    }

    btn.style.display = 'none';
    btn.parentElement.querySelector('.add-btn').style.display = 'inline-block';
  });
});



// EmailJS Booking Form
const bookingForm = document.getElementById("booking-form");
bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = bookingForm.fullName.value;
  const email = bookingForm.email.value;
  const phone = bookingForm.phone.value;
  const serviceDetails = cart.map(s => s.name + " - ₹" + s.price).join("\n");

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    to_name: "Admin",
    from_name: name,
    message: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nServices:\n${serviceDetails}`,
    reply_to: email
  }, "YOUR_PUBLIC_KEY").then(() => {
    confirmationMsg.textContent = "Thank you For Booking the Service. We will get back to you soon!";
    bookingForm.reset();
    cart = [];
    updateCart();
  }).catch((error) => {
    confirmationMsg.textContent = "Something went wrong. Please try again.";
    console.error(error);
  });
});

// Newsletter form
const newsletterForm = document.getElementById("newsletter-form");
newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for subscribing to our newsletter!");
  newsletterForm.reset();
});

// Add shadow to navbar on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 10) {
    navbar.classList.add("shadow");
  } else {
    navbar.classList.remove("shadow");
  }
});

