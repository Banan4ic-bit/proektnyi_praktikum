/* 
   Лабораторна робота №2: Проектування і реалізація програми з масивами об'єктів, 
   вказівниками та посиланнями. Клас "Особа" з інтерактивним меню.
*/

const readline = require('readline');

class Person {
    #fullName;
    #position;
    #baseRate;
    #salary;
    #bonus;

    constructor(fullName = "Невідомо", position = "Спеціаліст") {
        this.#fullName = fullName;
        this.#position = position;
        this.#baseRate = this.#determineRate(position);
        this.#salary = this.#baseRate; 
        this.#bonus = 0;
    }

    destructor() {
        console.log(`[Деструктор] Об'єкт співробітника ${this.#fullName} видалено з пам'яті.`);
    }

    #determineRate(position) {
        switch (position) {
            case "Спеціаліст": return 12000;
            case "Спеціаліст 1 категорії": return 16000;
            case "Спеціаліст 2 категорії": return 20000;
            case "Спеціаліст вищої категорії": return 26000;
            case "Начальник відділу": return 35000;
            case "Директор": return 50000;
            default: return 10000;
        }
    }

    calculateBonus(averageSalary) {
        if (this.#salary < averageSalary) {
            this.#bonus = this.#salary * 0.5;
        } else {
            this.#bonus = this.#salary * 0.3;
        }
    }

    getTotalEarnings() {
        return this.#salary + this.#bonus;
    }

    getSalary() {
        return this.#salary;
    }

    print() {
        console.log(`Співробітник: ${this.#fullName}`);
        console.log(`Посада: ${this.#position}`);
        console.log(`Ставка: ${this.#baseRate} грн`);
        console.log(`Премія: ${this.#bonus} грн`);
        console.log(`Загальна сума на руки: ${this.getTotalEarnings()} грн\n`);
    }
}

let employees = [
    new Person("Коваленко О. В.", "Спеціаліст"),
    new Person("Петренко М. І.", "Спеціаліст 1 категорії"),
    new Person("Шевченко Т. Г.", "Начальник відділу"),
    new Person("Мельник В. П.", "Директор")
];

function updateSalaries() {
    let totalSum = 0;
    for (let i = 0; i < employees.length; i++) {
        totalSum += employees[i].getSalary();
    }
    let averageSalary = totalSum / employees.length;

    for (let i = 0; i < employees.length; i++) {
        employees[i].calculateBonus(averageSalary);
    }
    console.log(`\n[Інфо] Середня зарплата по фірмі розрахована: ${averageSalary} грн. Премії оновлено!\n`);
}

updateSalaries();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("================ MENU ================");
    console.log("1. Вивести список усіх співробітників");
    console.log("2. Пересчитати премії та зарплати (на основі середньої)");
    console.log("3. Викликати деструктор першого співробітника");
    console.log("4. Вихід");
    console.log("======================================");

    rl.question("Оберіть пункт меню (1-4): ", (answer) => {
        switch (answer.trim()) {
            case '1':
                console.log("\n--- СПИСОК СПІВРОБІТНИКІВ (доступ через вказівник) ---");
                for (let i = 0; i < employees.length; i++) {
                    let p = employees[i]; 
                    p.print();
                }
                showMenu();
                break;
            case '2':
                updateSalaries();
                showMenu();
                break;
            case '3':
                if (employees.length > 0) {
                    employees[0].destructor();
                    employees.shift(); 
                } else {
                    console.log("Список співробітників порожній!");
                }
                showMenu();
                break;
            case '4':
                console.log("Вихід з програми. До побачення!");
                rl.close();
                break;
            default:
                console.log("Невірний вибір. Спробуйте ще раз.\n");
                showMenu();
                break;
        }
    });
}

showMenu();