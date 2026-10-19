/* 
   Лабораторна робота №5: Проектування і реалізація програми 
   з перевантаженням функцій (Класи "Матриця" та "Вектор").
*/

class Vector {
    #data;
    #size;

    constructor(sizeOrData) {
        if (Array.isArray(sizeOrData)) {
            this.#data = [...sizeOrData];
            this.#size = sizeOrData.length;
        } else {
            this.#size = sizeOrData || 0;
            this.#data = new Array(this.#size).fill(0);
        }
    }

    destructor() {
        console.log(`[Деструктор Vector] Звільнено пам'ять для вектора розмірності ${this.#size}`);
        this.#data = null;
        this.#size = 0;
    }

    getSize() {
        return this.#size;
    }

    get(index) {
        return this.#data[index];
    }

    set(index, value) {
        this.#data[index] = value;
    }

    print() {
        console.log(`Вектор [ ${this.#data.join(', ')} ]`);
    }
}

class Matrix {
    #data;
    #rows;
    #cols;

    constructor(rowsOrData, cols) {
        if (Array.isArray(rowsOrData)) {
            this.#data = rowsOrData.map(row => [...row]);
            this.#rows = rowsOrData.length;
            this.#cols = rowsOrData[0].length;
        } else {
            this.#rows = rowsOrData || 0;
            this.#cols = cols || 0;
            this.#data = Array.from({ length: this.#rows }, () => new Array(this.#cols).fill(0));
        }
    }

    destructor() {
        console.log(`[Деструктор Matrix] Звільнено пам'ять для матриці ${this.#rows}x${this.#cols}`);
        this.#data = null;
        this.#rows = 0;
        this.#cols = 0;
    }

    getRows() { return this.#rows; }
    getCols() { return this.#cols; }

    get(i, j) { return this.#data[i][j]; }
    set(i, j, val) { this.#data[i][j] = val; }

    print() {
        console.log(`Матриця ${this.#rows}x${this.#cols}:`);
        for (let i = 0; i < this.#rows; i++) {
            console.log(`  [ ${this.#data[i].join(', ')} ]`);
        }
    }

    // 1. Множення Матриці на Матрицю або Матриці на Число (скаляр)
    multiply(target) {
        // Якщо аргумент - число (скаляр)
        if (typeof target === 'number') {
            let result = new Matrix(this.#rows, this.#cols);
            for (let i = 0; i < this.#rows; i++) {
                for (let j = 0; j < this.#cols; j++) {
                    result.set(i, j, this.get(i, j) * target);
                }
            }
            return result;
        }

        // Якщо аргумент - Матриця
        if (target instanceof Matrix) {
            if (this.#cols !== target.getRows()) {
                throw new Error("Помилка множення матриць: кількість стовпців першої матриці не дорівнює кількості рядків другої!");
            }
            let result = new Matrix(this.#rows, target.getCols());
            for (let i = 0; i < this.#rows; i++) {
                for (let j = 0; j < target.getCols(); j++) {
                    let sum = 0;
                    for (let k = 0; k < this.#cols; k++) {
                        sum += this.get(i, k) * target.get(k, j);
                    }
                    result.set(i, j, sum);
                }
            }
            return result;
        }

        // Якщо аргумент - Вектор (Множення Матриці на Вектор)
        if (target instanceof Vector) {
            if (this.#cols !== target.getSize()) {
                throw new Error("Помилка множення матриці на вектор: кількість стовпців матриці не дорівнює розмірності вектора!");
            }
            let resultVector = new Vector(this.#rows);
            for (let i = 0; i < this.#rows; i++) {
                let sum = 0;
                for (let j = 0; j < this.#cols; j++) {
                    sum += this.get(i, j) * target.get(j);
                }
                resultVector.set(i, sum);
            }
            return resultVector;
        }

        throw new Error("Невідомий тип аргументу для множення!");
    }
}

// Додаткові перевантажені функції для множення (Вектор на Матрицю, Вектор на Вектор, Число на Матрицю/Вектор)
function multiplyObjects(a, b) {
    // Вектор * Число
    if (a instanceof Vector && typeof b === 'number') {
        let res = new Vector(a.getSize());
        for (let i = 0; i < a.getSize(); i++) {
            res.set(i, a.get(i) * b);
        }
        return res;
    }

    // Число * Вектор
    if (typeof a === 'number' && b instanceof Vector) {
        return multiplyObjects(b, a);
    }

    // Число * Матриця
    if (typeof a === 'number' && b instanceof Matrix) {
        return b.multiply(a);
    }

    // Вектор * Матриця (рядок-вектор на матрицю)
    if (a instanceof Vector && b instanceof Matrix) {
        if (1 !== b.getRows() || a.getSize() !== b.getRows()) {
            // Для спрощення: вектор розглядається як сумісний рядок
        }
        // У загальному випадку: Вектор-рядок (1 x N) на Матрицю (N x M)
        if (a.getSize() !== b.getRows()) {
            throw new Error("Помилка множення вектора на матрицю: розмірність вектора не дорівнює кількості рядків матриці!");
        }
        let resVector = new Vector(b.getCols());
        for (let j = 0; j < b.getCols(); j++) {
            let sum = 0;
            for (let i = 0; i < a.getSize(); i++) {
                sum += a.get(i) * b.get(i, j);
            }
            resVector.set(j, sum);
        }
        return resVector;
    }

    // Скалярний добуток двох Векторів
    if (a instanceof Vector && b instanceof Vector) {
        if (a.getSize() !== b.getSize()) {
            throw new Error("Помилка множення векторів: різна розмірність!");
        }
        let sum = 0;
        for (let i = 0; i < a.getSize(); i++) {
            sum += a.get(i) * b.get(i);
        }
        return sum; // Повертає число (скалярний добуток)
    }

    throw new Error("Непідтримувана комбінація аргументів для множення!");
}


// ДЕМОНСТРАЦІЯ
function main() {

    // Створення матриць
    let m1 = new Matrix([
        [1, 2],
        [3, 4]
    ]);

    let m2 = new Matrix([
        [5, 6],
        [7, 8]
    ]);

    console.log("Матриця M1:");
    m1.print();
    console.log("Матриця M2:");
    m2.print();

    // 1. Множення матриці на матрицю
    console.log("\n 1. Множення Матриці на Матрицю (M1 * M2) ");
    let m3 = m1.multiply(m2);
    m3.print();

    // 2. Множення матриці на число
    console.log("\n 2. Множення Матриці на Число (M1 * 3) ");
    let m4 = m1.multiply(3);
    m4.print();

    // 3. Множення числа на матрицю
    console.log("\n 3. Множення Числа на Матрицю (2 * M1) ");
    let m5 = multiplyObjects(2, m1);
    m5.print();

    // Створення векторів
    let v1 = new Vector([1, 2]);
    let v2 = new Vector([3, 4]);

    console.log();
    v1.print();
    v2.print();

    // 4. Скалярний добуток двох векторів
    console.log("\n 4. Скалярний добуток двох Векторів (v1 * v2) -");
    let scalarProduct = multiplyObjects(v1, v2);
    console.log(`Результат (скаляр): ${scalarProduct}`);

    // 5. Множення матриці на вектор
    console.log("\n 5. Множення Матриці на Вектор (M1 * v1) ");
    let resVec1 = m1.multiply(v1);
    resVec1.print();

    // 6. Множення вектора на матрицю
    console.log("\n 6. Множення Вектора на Матрицю (v1 * M1) ");
    let resVec2 = multiplyObjects(v1, m1);
    resVec2.print();

    // Демонстрація деструкторів
    console.log("\n 7. Демонстрація деструкторів");
    m1.destructor();
    v1.destructor();
}

main();