
/**
 * ! SCROLL FUNCTION 
 */

let scrollLeft = document.getElementById("scrollLeft");
let scrollRight = document.getElementById("scrollRight");

scrollLeft.addEventListener("click", (e) => {
    e.preventDefault()
    Left();
});

scrollRight.addEventListener("click", (e) => {
    e.preventDefault()
    Right();
});

function Left() {
    let left = document.getElementById("imageScrollBox");
    left.scrollTo({
        left: left.scrollLeft - 350,
        behavior: "smooth"
    });
}

function Right() {
    let right = document.getElementById("imageScrollBox");
    right.scrollTo({
        left: right.scrollLeft + 350,
        behavior: "smooth"
    });
}
  
/**
 * ! RANDER SHOP ITEMS
 */

let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  let shopItems = shopdata
    .map((elem) => {
      let { id, name, price, desc, img } = elem;
      let search = basket.find((elem) => elem.id === id) || []  //  upload item amount form localstorage
      return `
        <div id="product-id-${id}" class="item">
            <img src="${img}" alt="" width="220">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price quanity">
                    <h2>$ ${price}</h2>
                    <div class="bttn">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                        <div id=${id} class="quanity">
                        ${search.item === undefined ? 0 : search.item}  
                        </div>
                        <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
      `;
    })
    .join("");

  shop.innerHTML = shopItems;
};

generateShop();


/**
 * ! INCREMENT AND DECREMENT ITEMS AMOUNT
 */
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
   
    localStorage.setItem("data", JSON.stringify(basket))

}

/**
 * ! UPDATE QUANITY AMOUNT & CALCULATION
 */

let update = (id) => {
    let search = basket.find((elem) => elem.id === id)
    document.getElementById(id).innerHTML = search.item

    calculation()
}

let calculation = () => {
    let cartAmount = document.getElementById("cartAmount");

    cartAmount.innerHTML = basket.map((elem) => elem.item).reduce((prev, next) => prev + next, 0)
    //console.log()
}


calculation()







