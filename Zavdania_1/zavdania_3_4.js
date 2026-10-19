/* 
   Завдання 3: Створити клас Numbers з трьома приватними полями типу double (m_a, m_b, m_c),
   методом setValues(), методом print() для виводу у форматі <ma, mb, mc> та (Завдання 4) - методом isEqual().
*/

class Numbers {
    #m_a;
    #m_b;
    #m_c;

    setValues(a, b, c) {
        this.#m_a = a;
        this.#m_b = b;
        this.#m_c = c;
    }

    print() {
        console.log(`<${this.#m_a}, ${this.#m_b}, ${this.#m_c}>`);
    }

    // Метод для порівняння двох об'єктів (Завдання 4)
    isEqual(other) {
        return this.#m_a === other.#m_a && 
               this.#m_b === other.#m_b && 
               this.#m_c === other.#m_c;
    }
}

function main() {
    // Перевірка Завдання 3
    let point = new Numbers();
    point.setValues(3.0, 4.0, 5.0);
    point.print();

    // Перевірка Завдання 4
    let point1 = new Numbers();
    point1.setValues(3.0, 4.0, 5.0);

    let point2 = new Numbers();
    point2.setValues(3.0, 4.0, 5.0);

    if (point1.isEqual(point2))
        console.log("point1 and point2 are equal");
    else
        console.log("point1 and point2 are not equal");

    let point3 = new Numbers();
    point3.setValues(7.0, 8.0, 9.0);

    if (point1.isEqual(point3))
        console.log("point1 and point3 are equal");
    else
        console.log("point1 and point3 are not equal");
}

main();