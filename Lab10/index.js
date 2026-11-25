const container = document.getElementById("products-container");
const categorySelect = document.getElementById("category-select");

async function loadAllProducts() {
    const response = await fetch("https://dummyjson.com/products?limit=15");
    const data = await response.json();
    displayProducts(data.products);
}

async function loadCategories() {
    const response = await fetch("https://dummyjson.com/products/category-list");
    const categories = await response.json();
    for (let i = 0; i < categories.length; i++) {
        let option = document.createElement("option");
        option.value = categories[i];
        option.textContent = categories[i];
        categorySelect.appendChild(option);
    }
}

async function searchProducts() {
    const query = document.getElementById("search-input").value.trim();
    if (query === "") {
        loadAllProducts();
        return;
    }
    const response = await fetch("https://dummyjson.com/products/search?q=" + encodeURIComponent(query));
    const data = await response.json();
    displayProducts(data.products);
}

async function filterByCategory() {
    const category = categorySelect.value;
    if (category === "all") {
        loadAllProducts();
        return;
    }
    const response = await fetch("https://dummyjson.com/products/category/" + category);
    const data = await response.json();
    displayProducts(data.products);
}

function displayProducts(products) {
    container.innerHTML = "";
    if (products.length === 0) {
        container.innerHTML = "<p>Товарів не знайдено.</p>";
        return;
    }
    for (let i = 0; i < products.length; i++) {
        let item = products[i];
        container.innerHTML +=
            "<div class='product-item'>" +
                "<img src='" + item.thumbnail + "' alt='" + item.title + "'>" +
                "<h3>" + item.title + "</h3>" +
                "<p>" + item.description + "</p>" +
                "<div class='price'>Ціна: $" + item.price + " | Рейтинг: " + item.rating + "</div>" +
            "</div>";
    }
}

loadCategories();
loadAllProducts();
