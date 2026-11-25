const tabsData = {
    1: {
        title: "Розділ 1: Веб-розробка",
        text: "HTML та CSS створюють структуру та зовнішній вигляд сторінки.",
        img: "https://picsum.photos/id/1/300/180",
        bg: "#f9f9f9"
    },
    2: {
        title: "Розділ 2: JavaScript",
        text: "JavaScript додає інтерактивність та динаміку на сторінку.",
        img: "https://picsum.photos/id/2/300/180",
        bg: "#fffbe6"
    },
    3: {
        title: "Розділ 3: DOM API",
        text: "DOM дозволяє змінювати теги, атрибути та стилі в реальному часі.",
        img: "https://picsum.photos/id/3/300/180",
        bg: "#e6ffed"
    },
    4: {
        title: "Розділ 4: Адаптивність",
        text: "Сучасні сайти коректно відображаються на комп'ютерах і смартфонах.",
        img: "https://picsum.photos/id/4/300/180",
        bg: "#f0f5ff"
    },
    5: {
        title: "Розділ 5: Тестування",
        text: "Перевірка роботи коду гарантує відсутність помилок у браузері.",
        img: "https://picsum.photos/id/5/300/180",
        bg: "#fff0f6"
    }
};

function openTab(tabNumber) {
    for (let i = 1; i <= 5; i++) {
        document.getElementById("tab" + i).classList.remove("active");
    }
    document.getElementById("tab" + tabNumber).classList.add("active");

    let contentBox = document.getElementById("tab-content");
    let data = tabsData[tabNumber];
    contentBox.innerHTML =
        "<h3>" + data.title + "</h3>" +
        "<p>" + data.text + "</p>" +
        "<img src='" + data.img + "' alt='Таб " + tabNumber + "'>";
    contentBox.style.backgroundColor = data.bg;
}

function addItem() {
    let input = document.getElementById("item-text");
    let text = input.value.trim();
    if (text === "") {
        alert("Введіть текст!");
        return;
    }
    let li = document.createElement("li");
    li.textContent = text;
    document.getElementById("dynamic-list").appendChild(li);
    input.value = "";
}
