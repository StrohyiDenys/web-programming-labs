function calcParams() {
    if (arguments.length === 0) {
        return 0;
    }
    if (arguments.length % 2 === 0) {
        let sum = 0;
        for (let i = 0; i < arguments.length; i++) {
            sum += arguments[i];
        }
        return sum;
    } else {
        let diff = arguments[arguments.length - 1];
        for (let i = arguments.length - 2; i >= 0; i--) {
            diff -= arguments[i];
        }
        return diff;
    }
}

function getParams() {
    while (true) {
        let input = prompt("Завдання 1. Введіть будь-яку кількість чисел через пробіл або кому:");
        if (input === null) {
            return null;
        }

        let values = input.trim().split(/[\s,;]+/).map(Number);
        if (input.trim() !== "" && values.every(Number.isFinite)) {
            return values;
        }
        alert("Введіть одне або кілька коректних чисел.");
    }
}

function getCircleArea() {
    let radius = Number(prompt("Завдання 2. Введіть радіус кола (r):"));
    if (isNaN(radius) || radius <= 0) {
        alert("Некоректний радіус!");
        return 0;
    }
    return Math.PI * radius * radius;
}

function sortWordsByLength() {
    let sentence = prompt("Завдання 3. Введіть речення:");
    if (!sentence) {
        return "";
    }
    let words = sentence.trim().split(/\s+/);
    words.sort(function(a, b) {
        return a.length - b.length;
    });
    return words.join(" ");
}

let params = getParams();
if (params === null) {
    alert("Введення для завдання 1 скасовано.");
} else {
    let operation = params.length % 2 === 0 ? "сума" : "різниця від останнього до першого";
    alert("Завдання 1 — " + operation + " (" + params.join(", ") + "): " + calcParams(...params));
}

let area = getCircleArea();
alert("Завдання 2 — площа кола: " + area.toFixed(2));

let sortedSentence = sortWordsByLength();
alert("Завдання 3 — слова за зростанням довжини: " + sortedSentence);
