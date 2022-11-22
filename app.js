// element dom
const menu = document.querySelector('.menu');
const navMenu = document.querySelector('.header-nav');
const closeNav = document.querySelector('.header-nav .close');
const overlay_one = document.querySelector('.overlay-one');
const overlay_two = document.querySelector('.overlay-two');
const overlays = document.querySelectorAll('#overlay');
const cartIcon = document.querySelector('.cart-icon');
const cartContainer = document.querySelector('.cart-container');
const mainImage = document.querySelector('.main-image .image');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const listImages = [...document.querySelectorAll('.images .img')];
const listImagesSlider = [...document.querySelectorAll('.slider-img')];
const mainSliderImage = document.querySelector('.main-slider .main-img');
const addtoCart = document.querySelector('.add-to-cart');
const cartItemsList = document.querySelector('.items-list');
const totalItems = document.querySelector('.total-items');
// variables
let index = 1;
let count = 1;
let Cart = getStorage() || [];
// toggle Nav
menu.onclick = function() {
    navMenu.classList.add('active');
    overlay_two.classList.add('show');
}
closeNav.onclick = function() {
    navMenu.classList.remove('active');
    overlay_two.classList.remove('show');
}
// toggle shopping Cart
cartIcon.onclick = function() {
    cartContainer.classList.toggle('show');
}
// toggle Modal
mainImage.onclick = function() {
    modal.classList.add('show');
    overlay_one.classList.add('show');
    mainSliderImage.src = mainImage.src;
    let id = (listImages.find(img => img.classList.contains('active'))).dataset.id;
    index = id;
    listImagesSlider.forEach(x => x.classList.remove('active'));
    (listImagesSlider.find(sliderImage => sliderImage.dataset.id == id)).classList.add('active');
}



closeModal.onclick = function() {
    modal.classList.remove('show');
    overlay_one.classList.remove('show');
}
overlays.forEach(overlay => {
    overlay.onclick = function() {
    modal.classList.remove('show');
    overlay.classList.remove('show');
    navMenu.classList.remove('active');
}
})
// handle images
listImages.forEach(img => {
    img.onclick = function() {
        handleImages(listImages , img , mainImage , true)
    };
});
listImagesSlider.forEach(img => {
    img.onclick = function() {
        handleImages(listImagesSlider , img , mainSliderImage , false)
    };
});
function handleImages(elements , img , targetImage , check) {
    elements.forEach(ele => ele.classList.remove('active'));
    img.classList.add('active');
    targetImage.src = `/images/image-product-${img.dataset.id}.jpg`;
    count = check ? img.dataset.id : count;
}


function next() {
    if(index < 4) {
        index++;
        mainSliderImage.src = `/images/image-product-${index}.jpg`;
        listImagesSlider.forEach(sliderImg => sliderImg.classList.remove('active'));
        (listImagesSlider.find(sliderImg => sliderImg.dataset.id == index)).classList.add('active');
    }
    else {return}
}
function prev() {
    if(index > 1) {
        index--;
        mainSliderImage.src = `/images/image-product-${index}.jpg`;
        listImagesSlider.forEach(sliderImg => sliderImg.classList.remove('active'));
        (listImagesSlider.find(sliderImg => sliderImg.dataset.id == index)).classList.add('active');
    }
    else {return}
}

function nextImage() {
    if(count == listImages.length) {
        count = 0;
    }
    count++;
    mainImage.src = `/images/image-product-${count}.jpg`;
}
function prevImage() {
    if(count == 1) {
        count = listImages.length + 1;
    }
    count--;
    mainImage.src = `/images/image-product-${count}.jpg`;
}

// Handle Cart
const qtyNumber = document.querySelector('.qty');
function increment() {
    qtyNumber.textContent = parseInt(qtyNumber.textContent) + 1;
}
function decrement() {
    if(parseInt(qtyNumber.textContent) > 0) {
        qtyNumber.textContent = parseInt(qtyNumber.textContent) - 1;
    }
}
addtoCart.onclick = function() {
   if(qtyNumber.textContent > 0) {
    let Cart = getStorage();
    let item = { id : Date.now() , qty : qtyNumber.textContent , title : 'Fall Limeted Edition Sneakers' , img:'/images/image-product-1-thumbnail.jpg' , price : 125.00};
    cartContainer.classList.add('show');
    Cart = [...Cart , item];
    window.localStorage.setItem('cart' , JSON.stringify(Cart));
    fillCart();
    qtyNumber.textContent = 0;
   }
   else {return }
}


// fill Cart
fillCart();

function fillCart() {
    let Cart = getStorage();
    cartContainer.innerHTML = Cart.length === 0 ? `<div class='empty'>Your cart is empty.</div>` : 
    `<h3>Cart</h3>
    <div class="cart-info">
        <ul class="items-list" role="list">${Cart.map(item => {
        let {id , qty , title ,img , price } = item;
        return `<li class="item">
        <img src="${img}" alt="${title}">
        <div class="item-infos">
          <h4 class="title">${title}</h4>
          <div class="total-price">$${price.toFixed(2)}x ${qty} <span class="total">$${(qty * price).toFixed(2)}</span></div>
        </div>
        <div class="delete" onclick ='removeItem(${id})' ><img src="/images/icon-delete.svg" alt="delete item"></div>
      </li>`;
    }).join('')}
    </ul>
    <div class="checkout">Checkout</div>
    </div>
    `;
    if(Cart.length > 0) {totalItems.classList.add('active');}
    else {totalItems.classList.remove('active');}
        totalItems.innerText = Cart.length;
}

// get Storage
function getStorage() {
    let Cart = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : [];
    return Cart;
}

function removeItem(id) {
        let Cart = getStorage();
        Cart = Cart.filter(cartItem => cartItem.id != id);
        window.localStorage.setItem('cart' , JSON.stringify(Cart));
        fillCart();
}