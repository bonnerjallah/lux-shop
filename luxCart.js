let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || [];

console.log(basket)

let calculation = () => {
    let cartAmount = document.getElementById("cartAmount");

    cartAmount.innerHTML = basket.map((elem) => elem.item).reduce((prev, next) => prev + next, 0)
}

calculation()


let generateCartItems = () => {
    if(basket.length !== 0){
       shoppingCart.innerHTML = basket
        .map((elem) => {
            let{id, item, } = elem;
            let search = shopdata.find((el) => el.id === id) || [];
            let {img, name, price} = search
            return `
            <div class="cart-item">
                <img width="100" src="${img}" alt"" />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>"${name}"</p>
                            <p class="cart-item-price">$ "${search.price}"</p>
                        </h4>
                        <i onclick="removeItem(${id})"class="fa-solid fa-x"></i>
                    </div>

                    <div class="bttn">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                        <div id=${id} class="quanity">
                            ${item}
                        </div>
                        <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                    </div>

                    <h3>$ "${item * price}"</h3>
                </div>
            </div>
            `;
        })
        .join("")
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="homeBttn">Back To Home</button>
        </a>
        `
    }
}

generateCartItems() 

let increment = (id) => {
    let selecetedItem = id
    let search = basket.find((elem) => elem.id === selecetedItem.id)  // search to see if in basket or not

    if(search === undefined){
        basket.push({
            id: selecetedItem.id,
            item: 1,
        })
    } else {
        search.item += 1
    }

    update(selecetedItem.id)

    generateCartItems()

    localStorage.setItem("data", JSON.stringify(basket))
    
}

let decrement = (id) => {
    let selecetedItem = id;
    let search = basket.find((elem) => elem.id === selecetedItem.id)

    if(search === undefined)return

    else if(search.item === 0) return

    else{
        search.item -= 1
    }

    update(selecetedItem.id)

    basket = basket.filter((elem) => elem.item !== 0) // filter out 0 item form localstorage basket
    generateCartItems() 
    localStorage.setItem("data", JSON.stringify(basket))

}

let update = (id) => {
    let search = basket.find((elem) => elem.id === id)
    document.getElementById(id).innerHTML = search.item

    calculation()

    totalAmount()
}

let removeItem = (id) => {
    let selecetedItem = id;

    basket = basket.filter((elem) => elem.id !== selecetedItem.id) // remove item form basket once it reach 0

    generateCartItems()

    totalAmount()

    calculation()

    localStorage.setItem("data", JSON.stringify(basket))
}

let totalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((elem) => {
            let {item, id} = elem
            let search = shopdata.find((el) => el.id === id) || [];
            return item * search.price
        }).reduce((prev, curr) => prev + curr, 0)
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Check Out</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>

        `
    } else return
}

totalAmount()

let clearCart = () => {
    basket = []
    generateCartItems()
    calculation()

    localStorage.setItem("data", JSON.stringify(basket))

}