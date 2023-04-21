//carrinho

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//----------JSON---------------------------------------//
let adidasJSON='{"produtos":['+
    '{"nome":"Adidas SHIRT","preço":119.99},'+
    '{"nome":"Adidas AirPods","preço":99.99},'+
    '{"nome":"Adidas CortaVento","preço":329.99},'+
    '{"nome":"Adidas Garrafa","preço":100.00},'+
    '{"nome":"Adidas Oculos","preço":129.99},'+
    '{"nome":"Adidas Cap","preço":110.00},'+
    '{"nome":"Adidas Bag","preço":219.90},'+
    '{"nome":"Adidas Tênis","preço":419.99},'+
    '{"nome":"Adidas bubble","preço":500.00},'+
    '{"nome":"Adidas Moletom","preço":219.99},'+
    '{"nome":"Adidas T-Shirt","preço":119.99},'+
    '{"nome":"Adidas T-Shirt","preço":119.99}'+
    ']}'

    let p_obj=JSON.parse(adidasJSON)
    console.log(p_obj.produtos)

//----------------------------------------------------//

//abre o carrinho
cartIcon.onclick = () =>{
    cart.classList.add("active");
}
//fecha o carrinho
closeCart.onclick = () =>{
    cart.classList.remove("active");
}

//
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

//Função
function ready(){
    //Remover intens do carrinho
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //mudando a quantidade
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged);
    }
    // adicionado os produtos no carrinho
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener("click", addCartClicked);
    }
//botão de compra funcional
document
.getElementsByClassName('btn-buy')[0]
.addEventListener('click', buyButtonClicked);

}
//botão de compra
function buyButtonClicked(){
    alert('Seu pedido foi Finalizado!')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal()
}





function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal();
}

//mudando a quantidade
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

//adicionando no carrinho
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;

    addProductToCart(title,price,productImg);
    updateTotal();

}
function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i <cartItemsNames.length; i++ ){
        if (cartItemsNames[i].innerText == title) {
            alert("Você ja adicionou esse produto no carrinho!");
            return;
        }
    }


var cartBoxContent = ` 
                            <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                             <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                            </div>  
                            <!--Remover do carrinho-->
                            <i class='bx bxs-trash-alt cart-remove'></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);

cartShopBox
.getElementsByClassName('cart-remove')[0]
.addEventListener('click', removeCartItem);

cartShopBox
.getElementsByClassName('cart-quantity')[0]
.addEventListener('change', quantityChanged);

}

//subindo o total

function updateTotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("R$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
        //caso o preço tennha alguns centavos
        total = Math.round (total*100) / 100;


        document.getElementsByClassName("total-price")[0].innerText = "R$" + total;




    
}

