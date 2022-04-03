const requestURL = 'https://abrenzink.github.io/wdd230/lesson9/chamber/data.json';

let products = [];
let items;

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing

    items = jsonObject['business'];
    displayCards(items);
  });


function displayCards(items) {

  items.forEach(item => {
    const cards = document.querySelector('#productsDisplay');
    let card = document.createElement('section');

    const image = document.createElement('img');
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const checkBtn = document.createElement('button');

    card.className = 'cardStyle';
    image.className = 'cardImgStyle';
    image.setAttribute('src', item.logoUrl);
    image.setAttribute('alt', item.site);

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);

    
    if(item.available){
      checkBtn.innerText = `✅`;
      checkBtn.addEventListener("click", addToCart.bind(item));
      card.appendChild(checkBtn);
    } else {
      card.className = 'sold';
    }
  
    title.textContent = `${item.title}`;
  
    cards.appendChild(card);
  });
  
}

function addToCart(item){
  const product = document.querySelector("#cartList").value;
  products.push(item);
  displayCart(product);
}

function displayCart(product) {

  const productsList = document.querySelector("#cartList");

  productsList.innerHTML = "";

  products.forEach((product) => {
    productsList.innerHTML += `
    <li>
      <p>${product.title}</p>
      <div>
        <span data-function="delete">❎</span>
      </div>
    </li>`;
  });
}

function removeItem(e) {
  const parent = e.target.closest("li");

  if (e.target.dataset.function === "delete") {
    products = products.filter(
      (product) => product.detail != parent.childNodes[1].innerText
    );
    parent.remove();
  }
}

document.querySelector("#cartList").addEventListener("click", removeItem);