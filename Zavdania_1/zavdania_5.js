/* 
   Завдання 5: Реалізація класу Stack з фіксованим масивом на 10 елементів, 
   методами reset(), push(), pop() та print().
*/

class Stack {
    #array = new Array(10); 
    #length = 0;            

    reset() {
        this.#array.fill(0);
        this.#length = 0;
    }

    push(value) {
        if (this.#length >= 10) {
            return false; 
        }
        this.#array[this.#length] = value;
        this.#length++;
        return true;
    }

    pop() {
        if (this.#length <= 0) {
            console.assert(false, "Stack is empty!");
            return undefined;
        }
        this.#length--;
        return this.#array[this.#length];
    }

    print() {
        let result = "( ";
        for (let i = 0; i < this.#length; i++) {
            result += this.#array[i] + " ";
        }
        result += ")";
        console.log(result);
    }
}

function main() {
    let stack = new Stack();
    stack.reset();
    stack.print();

    stack.push(3);
    stack.push(7);
    stack.push(5);
    stack.print();

    stack.pop();
    stack.print();

    stack.pop();
    stack.pop();

    stack.print();
}

main();