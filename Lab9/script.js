class Product {
    constructor(name, category, amount, image) {
        this.name = name;
        this.category = category;
        this.amount = amount;
        this.image = image;
    }

    addToBasket() {
        console.log(`Product ${this.name} added to basket`);
    }
}

class Shoe extends Product {
    constructor(name, amount, image, size) {
        super(name, "shoe", amount, image);
        this.size = size;
    }
}

class Grocerie extends Product {
    constructor(name, amount, image, weight) {
        super(name, "grocerie", amount, image);
        this.weight = weight;
    }
}

function productFactory(item) {
    if (item.category === "shoe") {
        return new Shoe(item.name, item.amount, item.image, item.size);
    }
    if (item.category === "grocerie") {
        return new Grocerie(item.name, item.amount, item.image, item.weight);
    }
    return null;
}

class Basket {
    constructor() {
        this.products = [];
    }

    add(product) {
        const addedProduct = Object.assign(Object.create(Object.getPrototypeOf(product)), product);
        addedProduct.addedAt = new Date().toLocaleTimeString("uk-UA");
        this.products.push(addedProduct);
        addedProduct.addToBasket();
        this.render();
    }

    render() {
        const cartList = document.getElementById("cart-list");
        cartList.innerHTML = "";

        for (let i = 0; i < this.products.length; i++) {
            const item = this.products[i];
            const li = document.createElement("li");
            li.textContent = item.name + " (" + item.category + ") — додано о " + item.addedAt;
            cartList.appendChild(li);
        }

        document.getElementById("total-count").textContent = "Всього товарів у кошику: " + this.products.length;
    }
}

class Store {
    constructor() {
        this.products = [];
        this.basket = new Basket();
    }

    fillStoreWithProducts(data) {
        this.products = [];
        for (let i = 0; i < data.length; i++) {
            const product = productFactory(data[i]);
            if (product !== null) {
                this.products.push(product);
            }
        }
        this.renderProducts();
    }

    addProductToBasket(index) {
        const product = this.products[index];
        if (product && product.amount > 0) {
            product.amount--;
            this.basket.add(product);
            this.renderProducts();
        }
    }

    renderProducts() {
        const container = document.getElementById("products-list");
        container.innerHTML = "";

        for (let i = 0; i < this.products.length; i++) {
            const p = this.products[i];
            const extra = p.category === "shoe" ? "Розмір: " + p.size : "Вага: " + p.weight;
            const btnState = p.amount === 0 ? "disabled" : "";

            container.innerHTML +=
                "<div class='product-card'>" +
                    "<img src='" + p.image + "' alt='" + p.name + "'>" +
                    "<h3>" + p.name + "</h3>" +
                    "<p>Категорія: " + p.category + "</p>" +
                    "<p>" + extra + "</p>" +
                    "<p>Залишок на складі: " + p.amount + "</p>" +
                    "<button " + btnState + " onclick='store.addProductToBasket(" + i + ")'>Додати у кошик</button>" +
                "</div>";
        }
    }
}

const store = new Store();

fetch("products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        store.fillStoreWithProducts(data);
    });
