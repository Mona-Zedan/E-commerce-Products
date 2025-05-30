// OPEN & CLOSE CART
const carticon = document.querySelector('#cart-icon')
const cart = document.querySelector('.cart')
const cartclose = document.querySelector('#cart-close')

carticon.addEventListener('click', () => {
    cart.classList.add('active')
});

cartclose.addEventListener('click', () =>{
    cart.classList.remove('active');
});
 
// open and close cart
if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

function start(){
 addEvents()
}


function update(){
addEvents();
updateTotal()
}

// add events

function addEvents(){
    // remove product
let cartRemove_btn = document.querySelectorAll('.cart-remove')
// console.log(cartRemove_btn);
cartRemove_btn.forEach(btn => {
    btn.addEventListener('click',handle_removeCartItem);
 
});
// change item quantity
  let cartquantity_inputs = document.querySelectorAll('.cart-quantity');
  cartquantity_inputs.forEach(input => {
    input.addEventListener('change',handle_changeItemQuantity)
  });

  // add item to cart 
  let addCart_btns = document.querySelectorAll('#add-cart');
  addCart_btns.forEach(btn =>{
    btn.addEventListener('click', handle_addCartItem)
  });

//Buy order
const buy_btn = document.querySelector('.btn-buy')
buy_btn.addEventListener('click' , handle_buyOrder)
}

// HANDLE Events 
let itemAdded = []
function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector('.product-tittle').innerHTML;
    let price = product.querySelector('.product-price').innerHTML
    let imgSrc= product.querySelector('.produtc-img').src ;
    console.log(title,price,imgSrc);

    // NewAdd
    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // handle item is already exsit
if(itemAdded.find(el => el.title == newToAdd.title)){
    alert('this item is already exist');
    return
}else{
 itemAdded.push(newToAdd);   
}



    // Add Product to cart
    let cartBoxElement = CartBoxComponent(title,price,imgSrc)
    let NewNode = document.createElement('div');
    NewNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector('.cart-content');
    cartContent.appendChild(NewNode);
    update();  


}

function handle_removeCartItem (){
    this.parentElement.remove();
    itemAdded = itemAdded.title( el => el.title != this.parentElement.querySelector('.cart-product-tittle').innerHTML );
    update();
}


function handle_changeItemQuantity () {
     
        if (isNaN(this.value) || this.value < 1) {
            this.value = 1;
        }
        this.value = Math.floor(this.value); //to keep it intger

        update();
}

// handle buy order
function  handle_buyOrder(){
if(itemAdded.length <= 0){
    alert('Ther Is No Order to place Yet! \n Please Make an order frist');
    return
}
const cartContent = cart.querySelector('.cart-content')
cartContent.innerHTML =''
alert('Your Order is Placed Success ;)');
itemAdded =[]; 
update();
}

function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox =>{
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$",""))
        let quantity =  parent(cartBox.querySelector('.cart-quantity').value) ;
        total += price * quantity
       
    });
    // keep 2 digital after decimal point
    total = total.toFixed(2)

    totalElement.innerHTML = '$' + total;

}


// Html Component
function CartBoxComponent(title,price,imgSrc){
   return `
        <div class="cart-box">
                        <img src=${imgSrc} class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-tittle">
                                ${title}
                            </div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- remove cart -->
                        <i class="fa-solid fa-trash cart-remove"></i>
        </div>
`  
}
 
