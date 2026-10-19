/* 
   Лабораторна робота №6: Проектування і реалізація програми 
   з ієрархією класів (одиночне і множинне успадкування).
*/

// 1. Базовий клас Рахунок
class Rahunok {
    #accountNumber;
    #balance;
    #interestRate;

    constructor(accountNumber, initialBalance, interestRate = 5) {
        this.#accountNumber = accountNumber;
        this.#balance = initialBalance;
        this.#interestRate = interestRate;
        console.log(`[Конструктор Rahunok] Створено рахунок №${this.#accountNumber} з балансом ${this.#balance} грн`);
    }

    getAccountNumber() { return this.#accountNumber; }
    getBalance() { return this.#balance; }
    
    setBalance(newBalance) { this.#balance = newBalance; }

    // Встановлення додаткових відсотків
    setInterestRate(rate) {
        this.#interestRate = rate;
    }

    // Нарахування відсотків та перерахування грошей
    accrueInterest() {
        let interest = (this.#balance * this.#interestRate) / 100;
        this.#balance += interest;
        console.log(`[Рахунок] Нараховано відсотки. Новий баланс: ${this.#balance} грн`);
    }

    displayRahunok() {
        console.log(`Номер рахунку: ${this.#accountNumber}`);
        console.log(`Баланс: ${this.#balance} грн`);
        console.log(`Відсоткова ставка: ${this.#interestRate}%`);
    }

    destructor() {
        console.log(`[Деструктор Rahunok] Рахунок №${this.#accountNumber} видалено.`);
    }
}

// 2. Базовий клас Вкладник
class Vkladnyk {
    #passport;
    #fullName;

    constructor(passport, fullName) {
        this.#passport = passport;
        this.#fullName = fullName;
        console.log(`[Конструктор Vkladnyk] Зареєстровано вкладника: ${this.#fullName}`);
    }

    getPassport() { return this.#passport; }
    getFullName() { return this.#fullName; }

    displayVkladnyk() {
        console.log(`Вкладник: ${this.#fullName}`);
        console.log(`Паспортні дані: ${this.#passport}`);
    }

    destructor() {
        console.log(`[Деструктор Vkladnyk] Дані вкладника ${this.#fullName} видалено.`);
    }
}

// 3. Похідний клас Рахунок вкладника
class RahunokVkladnyka extends Rahunok {
    #vkladnykData; // Композиція для другого базового класу (множинне успадкування)
    #maxDailyWithdrawal;
    #minBalance;
    #password;

    constructor(accountNumber, fullName, passport, initialBalance, maxDailyWithdrawal, minBalance, password = "123") {
        super(accountNumber, initialBalance); // Виклик конструктора базового класу Rahunok
        this.#vkladnykData = new Vkladnyk(passport, fullName); // Ініціалізація другого базового класу
        this.#maxDailyWithdrawal = maxDailyWithdrawal;
        this.#minBalance = minBalance;
        this.#password = password;
        console.log(`[Конструктор RahunokVkladnyka] Ініціалізовано рахунок вкладника.`);
    }

    // Зміна пароля з перевіркою безпеки
    changePassword(oldPass, newPass) {
        if (oldPass === this.#password) {
            this.#password = newPass;
            console.log("Пароль успішно змінено!");
            return true;
        }
        console.log("Помилка: Невірний старий пароль!");
        return false;
    }

    // Вкладення грошей
    deposit(amount) {
        if (amount > 0) {
            this.setBalance(this.getBalance() + amount);
            console.log(`[Рахунок] Успішно внесено ${amount} грн. Поточний баланс: ${this.getBalance()} грн`);
        } else {
            console.log("Сума поповнення має бути більшою за нуль!");
        }
    }

    // Зняття грошей з урахуванням політики безпеки та обмежень
    withdraw(amount, password) {
        if (password !== this.#password) {
            console.log("Помилка безпеки: Невірний пароль!");
            return false;
        }
        if (amount > this.#maxDailyWithdrawal) {
            console.log(`Помилка: Перевищено ліміт добового зняття (${this.#maxDailyWithdrawal} грн)!`);
            return false;
        }
        if ((this.getBalance() - amount) < this.#minBalance) {
            console.log(`Помилка: Залишок на рахунку не може бути меншим за мінімальний (${this.#minBalance} грн)!`);
            return false;
        }

        this.setBalance(this.getBalance() - amount);
        console.log(`[Рахунок] Успішно знято ${amount} грн. Залишок на рахунку: ${this.getBalance()} грн`);
        return true;
    }

    displayInfo() {
        console.log("\n========================================");
        console.log("       ІНФОРМАЦІЯ ПРО РАХУНОК ВКЛАДНИКА   ");
        console.log("========================================");
        this.#vkladnykData.displayVkladnyk();
        this.displayRahunok();
        console.log(`Максимально на день: ${this.#maxDailyWithdrawal} грн`);
        console.log(`Мінімальний залишок: ${this.#minBalance} грн`);
        console.log("========================================\n");
    }

    destructor() {
        console.log(`[Деструктор RahunokVkladnyka] Знищення рахунку вкладника...`);
        this.#vkladnykData.destructor();
        super.destructor();
    }
}


//4. ГОЛОВНА ЧАСТИНА ПРОГРАМИ 
function main() {

    // Створення об'єкта за вимогами завдання
    let Geits = new RahunokVkladnyka(
        123456789,         // Номер рахунку
        "Bill Geits",      // ПІБ вкладника
        "EC123456",        // Паспорт
        50000,             // Початковий баланс
        5000,              // Максимальна сума на день
        500,               // Мінімальний залишок
        "secretPass"       // Пароль
    );

    // Демонстрація роботи функцій
    Geits.displayInfo();

    console.log(" 1. Тест поповнення рахунку");
    Geits.deposit(10000);

    console.log("\n2. Тест зняття грошей (з невірним паролем)");
    Geits.withdraw(2000, "wrongPass");

    console.log("\n3. Тест зняття грошей (успішно)");
    Geits.withdraw(2000, "secretPass");

    console.log("\n 4. Нарахування відсотків");
    Geits.accrueInterest();

    console.log("\n 5. Демонстрація деструкторів ");
    Geits.destructor();
}

main();