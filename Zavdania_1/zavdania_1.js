/* 
   Завдання 1: Створити клас Numbers з двома цілими числами, 
   методом set() для присвоєння та методом print() для виводу.
*/
class Numbers {
    #num1;
    #num2;

    constructor(a = 0, b = 0) {
        this.#num1 = a;
        this.#num2 = b;
    }

    set(a, b) {
        this.#num1 = a;
        this.#num2 = b;
    }
    
    print() {
        console.log(`Numbers (${this.#num1}, ${this.#num2})`);
    }
}

function main() {
    let n1 = new Numbers();
    n1.set(3, 3); 

    let n2 = new Numbers(4, 4); 

    n1.print();
    n2.print();
}

main();