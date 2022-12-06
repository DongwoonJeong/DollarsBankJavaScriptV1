
// create customer account object.
class customer_account{
    constructor(number, pin, balance){
        this.number = number;
        this.pin=pin;
        this.balance=balance;
    }

    get getNumber() {
		return Number;
	}
	set setNumber(number) {
		this.number = number;
	}

	get getBal() {
		return bal;
	}

	set setBal(bal) {
		this.bal = bal;
	}

	get getPin() {
		return pin;
	}

	set setPin(pin) {
		this.pin = pin;
	}

    
}