class Calc {
    static #value = '';
    static #isDot = false;
    static #isZero = true;
    static #toReset = false;
    static #storageKey = 'calc';

    static add = (newValue) => {
        if (this.#toReset) {
            this.reset();
        }
        if (
            this.#isZero &&
            !this.#isDot &&
            newValue == '0'
        ) {
            return null;
        } else {
            this.#isZero = false;
            this.#value += newValue;
        }
        this.#toReset = false;
        this.#output();
    };

    static #output = () => {
        this.#save();
        window.result.innerHTML = this.#value;
    };

    static dot = () => {
        if (
            this.#isDot ||
            isNaN(this.#value[this.#value.length - 1])
        ) {
            return null;
        }
        this.#isDot = true;
        this.#value += '.';
        this.#output();
    };

    static operation = (opValue) => {
        if (isNaN(this.#value[this.#value.length - 1])) {
            return null;
        }
        this.#isDot = false;
        this.#isZero = true;
        this.#value += opValue;
        this.#output();
    };

    static reset = () => {
        this.#isDot = false;
        this.#isZero = true;
        this.#value = '';
        this.#output();
    };

    static equals = () => {
        this.#value = String(eval(this.#value));
        this.#toReset = true;
        this.#output();
    };

    static #save = () => {
        window.localStorage.setItem(
            this.#storageKey,
            this.#value,
        );
    };

    static #load = () => {
        return (
            window.localStorage.getItem(this.#storageKey) ||
            ''
        );
    };

    static init = () => {
        this.#value = this.#load();
        this.#output();
        console.log('Initialized Calculator');
    };
}

window.calc = Calc;
