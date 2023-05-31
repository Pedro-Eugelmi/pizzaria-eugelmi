let modalQT = 1;
let modalKey = 0;
let cart = [];

let p = (el)=> document.querySelector(el);


pizzaJson.map((item,pizza)=> {


    let pizzaitem = p('.models .pizza-item').cloneNode(true);

    p('.pizza-area').append(pizzaitem);
    pizzaitem.setAttribute('data-key', pizza)
    pizzaitem.querySelector('.pizza-item--img img').src = item.img
    pizzaitem.querySelector('.pizza-item--price').innerHTML = item.price.toFixed(2)
    pizzaitem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaitem.querySelector('.pizza-item--desc').innerHTML = item.description

    //modal
    pizzaitem.querySelector('a').addEventListener('click', (e)=>{
     e.preventDefault()
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalKey = key
        modalQT = 1
        p('.pizzaWindowArea').style.opacity = 0;
        p('.pizzaWindowArea').style.display = 'flex';
        setTimeout( ()=>{
            p('.pizzaWindowArea').style.opacity = 100;
        }, 200);
        

        p('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        p('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        p('.pizzaBig img').src = pizzaJson[key].img;
        p('.pizzaInfo--actualPrice').innerHTML = ` R$ ${pizzaJson[key].price.toFixed(2)}`;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')

        document.querySelectorAll('.pizzaInfo--size').forEach((size, index)=> {

            if(index == 2){
                size.classList.add('selected')

            }
            size.querySelector('span').innerHTML = pizzaJson[pizza].sizes[index]
             })

    
        p('.pizzaInfo--qt').innerHTML = modalQT

    })

     
   
}) 
function closeModal(){

        p('.pizzaWindowArea').style.opacity = 0;

        setTimeout(() => {
            p('.pizzaWindowArea').style.display = 'none'
        }, 500 );
    }
    //quantidade do modal
     
    document.querySelector('.pizzaInfo--qtmais').addEventListener('click', ()=>{
        modalQT = modalQT+1 
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQT
    })


    document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
        if (modalQT > 1){
        modalQT--
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQT}

    });
    
    document.querySelectorAll('.pizzaInfo--size').forEach((size, index)=> {

        size.addEventListener('click',()=>{
            document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')
            size.classList.add('selected')

        })
         })

// botão de adicionar 
 document.querySelector('.pizzaInfo--addButton').addEventListener('click', ()=> {
    let tamanho = document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key')
    let identifier = pizzaJson[modalKey].id+'@'+ tamanho

    let identifierKey = cart.findIndex((item)=>item.identifier == identifier)

    if (identifierKey > -1){

        cart[identifierKey].pizzaQT += modalQT
    }
    else {

    cart.push({
        identifier,
        id:pizzaJson[modalKey].id,
        pizzaname:pizzaJson[modalKey].name ,
        pizzaQT: modalQT,
        pizzaPrice:(pizzaJson[modalKey].price * modalQT),
        size: tamanho
    });
        }


    closeModal();
    updateCart();
 });

 function updateCart(){
    //mobile
    document.querySelector('.menu-openner span').innerHTML = cart.length;
    document.querySelector('.menu-openner').addEventListener('click', ()=>{
        if (cart.length > 0){
            document.querySelector('aside').style.left = 0;
        }
    });
    document.querySelector('aside .menu-closer').addEventListener('click', ()=>{
        document.querySelector('aside').style.left = "100vw";
        document.querySelector('aside').style.left = "100vw";
    });

    if( cart.length > 0 ){
        let subtotal = 0;
        let total = 0;
        let discount = 0;
        document.querySelector('aside').classList.add('show')
        document.querySelector('.cart').innerHTML = '';

        for (let i in cart){
            let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id);
            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);
            //total and discount
            subtotal += pizzaItem.price * cart[i].pizzaQT;
            discount = subtotal * 0.1
            total = subtotal - discount;

            cartItem.querySelector('img').src = pizzaItem.img;

            let tamanhopizza;
            switch(cart[i].size){
                case "0":
                    tamanhopizza = 'P'
                break;
                case "1":
                    tamanhopizza = 'M'
                break;
                case "2":
                    tamanhopizza = 'G'
                break;
            }
            let pizzaandsize = `${pizzaItem.name } (${tamanhopizza})`
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaandsize
            cartItem.querySelector('.cart--item--qtarea div').innerHTML = cart[i].pizzaQT
            // remove add button
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=> {
                cart[i].pizzaQT++;
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=> {
                if( cart[i].pizzaQT > 1){
                    cart[i].pizzaQT--;
                }else 
                { cart.splice(i , 1)}
                updateCart();
            });
            //SUBTOTAL DISCOUNT AND TOTAL
             
             document.querySelector('.subtotal .subtotalspan').innerHTML = subtotal.toFixed(2);
             document.querySelector('.desconto span:last-child').innerHTML = discount.toFixed(2);
             document.querySelector('.total span:last-child').innerHTML = total.toFixed(2);

            document.querySelector('.cart').append(cartItem);
        }
    }else {
        document.querySelector('aside').classList.remove('show');
        document.querySelector('aside').style.left = "100vw";
    };
 };


 