class Product {
    constructor(name, category, amount, image) {
        this.name = name;
        this.category = category;
        this.amount = amount;
        this.image = image;
    }
}

class Shoe extends Product {
    constructor(name, category, amount, image, size) {
        super(name, category, amount, image);
        this.size = size;
    }
}

class Grocerie extends Product {
    constructor(name, category, amount, image, weight) {
        super(name, category, amount, image);
        this.weight = weight;
    }
}

let products = [];
let cart = [];

fetch("products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item.category === "shoe") {
                products.push(new Shoe(item.name, item.category, item.amount, item.image, item.size));
            } else if (item.category === "grocerie") {
                products.push(new Grocerie(item.name, item.category, item.amount, item.image, item.weight));
            }
        }
        renderProducts();
    });

function renderProducts() {
    let container = document.getElementById("products-list");
    container.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        let p = products[i];
        let extra = p.category === "shoe" ? "Розмір: " + p.size : "Вага: " + p.weight;
        let btnState = p.amount === 0 ? "disabled" : "";

        container.innerHTML +=
            "<div class='product-card'>" +
                "<img src='" + p.image + "' alt='" + p.name + "'>" +
                "<h3>" + p.name + "</h3>" +
                "<p>Категорія: " + p.category + "</p>" +
                "<p>" + extra + "</p>" +
                "<p>Залишок на складі: " + p.amount + "</p>" +
                "<button " + btnState + " onclick='addToCart(" + i + ")'>Додати у кошик</button>" +
            "</div>";
    }
}

function addToCart(index) {
    let product = products[index];
    if (product.amount > 0) {
        product.amount--;
        cart.push(product);
        renderProducts();
        renderCart();
    }
}

function renderCart() {
    let cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        let li = document.createElement("li");
        li.textContent = cart[i].name + " (" + cart[i].category + ")";
        cartList.appendChild(li);
    }

    document.getElementById("total-count").textContent = "Всього товарів у кошику: " + cart.length;
}
