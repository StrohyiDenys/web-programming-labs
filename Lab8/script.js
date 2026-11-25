let slideIndex = 1;
showSlides(slideIndex);

function plusSlide() {
    showSlides(slideIndex += 1);
}

function minusSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("item");
    let dots = document.getElementsByClassName("slider-dots_item");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}

const tabsData = {
    1: {
        title: "Розділ 1: Веб-розробка",
        text: "HTML та CSS створюють структуру та зовнішній вигляд сторінки.",
        img: "[https://picsum.photos/id/1/300/180](https://picsum.photos/id/1/300/180)",
        bg: "#f9f9f9"
    },
    2: {
        title: "Розділ 2: JavaScript",
        text: "JavaScript додає інтерактивність та динаміку на сторінку.",
        img: "[https://picsum.photos/id/2/300/180](https://picsum.photos/id/2/300/180)",
        bg: "#fffbe6"
    },
    3: {
        title: "Розділ 3: DOM API",
        text: "DOM дозволяє змінювати теги, атрибути та стилі в реальному часі.",
        img: "[https://picsum.photos/id/3/300/180](https://picsum.photos/id/3/300/180)",
        bg: "#e6ffed"
    },
    4: {
        title: "Розділ 4: Адаптивність",
        text: "Сучасні сайти коректно відображаються на комп'ютерах і смартфонах.",
        img: "[https://picsum.photos/id/4/300/180](https://picsum.photos/id/4/300/180)",
        bg: "#f0f5ff"
    },
    5: {
        title: "Розділ 5: Тестування",
        text: "Перевірка роботи коду гарантує відсутність помилок у браузері.",
        img: "[https://picsum.photos/id/5/300/180](https://picsum.photos/id/5/300/180)",
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

function setFieldError(inputId, errorId, message) {
    let input = document.getElementById(inputId);
    let errorSpan = document.getElementById(errorId);
    errorSpan.textContent = message;
    if (message) {
        input.classList.add("input-error");
    } else {
        input.classList.remove("input-error");
    }
}

function validateLoginForm() {
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value;
    let successBox = document.getElementById("login-success");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    successBox.textContent = "";

    if (email === "") {
        setFieldError("login-email", "login-email-error", "Поле Email обов'язкове для заповнення.");
        isValid = false;
    } else if (!emailRegex.test(email)) {
        setFieldError("login-email", "login-email-error", "Введіть коректну адресу електронної пошти.");
        isValid = false;
    } else {
        setFieldError("login-email", "login-email-error", "");
    }

    if (password === "") {
        setFieldError("login-password", "login-password-error", "Введіть пароль.");
        isValid = false;
    } else if (password.length < 6) {
        setFieldError("login-password", "login-password-error", "Пароль має містити щонайменше 6 символів.");
        isValid = false;
    } else {
        setFieldError("login-password", "login-password-error", "");
    }

    if (isValid) {
        successBox.textContent = "Авторизація пройшла успішно!";
    }

    return false;
}

function validateRegisterForm() {
    let name = document.getElementById("reg-name").value.trim();
    let email = document.getElementById("reg-email").value.trim();
    let password = document.getElementById("reg-password").value;
    let confirm = document.getElementById("reg-confirm").value;
    let successBox = document.getElementById("reg-success");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    successBox.textContent = "";

    if (name === "") {
        setFieldError("reg-name", "reg-name-error", "Введіть ім'я користувача.");
        isValid = false;
    } else if (name.length < 2) {
        setFieldError("reg-name", "reg-name-error", "Ім'я має містити щонайменше 2 символи.");
        isValid = false;
    } else {
        setFieldError("reg-name", "reg-name-error", "");
    }

    if (email === "") {
        setFieldError("reg-email", "reg-email-error", "Поле Email обов'язкове для заповнення.");
        isValid = false;
    } else if (!emailRegex.test(email)) {
        setFieldError("reg-email", "reg-email-error", "Введіть коректний Email.");
        isValid = false;
    } else {
        setFieldError("reg-email", "reg-email-error", "");
    }

    if (password === "") {
        setFieldError("reg-password", "reg-password-error", "Введіть пароль.");
        isValid = false;
    } else if (password.length < 6) {
        setFieldError("reg-password", "reg-password-error", "Пароль має містити щонайменше 6 символів.");
        isValid = false;
    } else {
        setFieldError("reg-password", "reg-password-error", "");
    }

    if (confirm === "") {
        setFieldError("reg-confirm", "reg-confirm-error", "Підтвердіть пароль.");
        isValid = false;
    } else if (confirm !== password) {
        setFieldError("reg-confirm", "reg-confirm-error", "Паролі не співпадають.");
        isValid = false;
    } else {
        setFieldError("reg-confirm", "reg-confirm-error", "");
    }

    if (isValid) {
        successBox.textContent = "Реєстрація успішно завершена!";
    }

    return false;
}
