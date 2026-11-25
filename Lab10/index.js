const categoriesList = document.getElementById("categories-list");
const productsContainer = document.getElementById("products-container");
const sectionTitle = document.getElementById("section-title");
const seeAllBtn = document.getElementById("see-all-btn");

async function fetchCategories() {
    try {
        const response = await fetch("https://dummyjson.com/products/category-list");
        const categories = await response.json();
        categoriesList.innerHTML = "";

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const li = document.createElement("li");
            li.textContent = category;
            li.onclick = function() {
                setActiveCategory(li);
                fetchProductsByCategory(category);
            };
            categoriesList.appendChild(li);
        }
    } catch (error) {
        console.error(error);
    }
}

async function fetchProducts() {
    try {
        setActiveCategory(null);
        seeAllBtn.classList.add("active");
        sectionTitle.textContent = "Усі товари";
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error(error);
    }
}

async function fetchProductsByCategory(category) {
    try {
        seeAllBtn.classList.remove("active");
        sectionTitle.textContent = "Категорія: " + category;
        const response = await fetch("https://dummyjson.com/products/category/" + encodeURIComponent(category));
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error(error);
    }
}

function setActiveCategory(activeElement) {
    const items = categoriesList.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
    }
    if (activeElement) {
        activeElement.classList.add("active");
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = "";
    if (!products || products.length === 0) {
        productsContainer.innerHTML = "<p>Товарів не знайдено.</p>";
        return;
    }

    for (let i = 0; i < products.length; i++) {
        const item = products[i];
        productsContainer.innerHTML +=
            "<div class='product-item'>" +
            "<img src='" + item.thumbnail + "' alt='" + item.title + "'>" +
            "<h3>" + item.title + "</h3>" +
            "<p>" + item.description + "</p>" +
            "<div class='meta'>Категорія: " + item.category + "</div>" +
            "<div class='price'>Ціна: $" + item.price + " | Рейтинг: " + item.rating + "</div>" +
            "</div>";
    }
}

fetchCategories();
fetchProducts();