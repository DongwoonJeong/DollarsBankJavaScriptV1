const readline = require("readline");

var account = [
  { userId: "1", PIN: "1123", balance: 500.0 },
  { userId: "2", PIN: "2123", balance: 100.0 },
];
var history = [];
var userNum =0;
const functions = {
  menu: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);

    console.log("");
    rl.question(
      "Enter a valid choice (1. Transaction 2. Open New Account)",
      (input) => {
        if (input == 1) {
          rl.close();
          functions.login();
        } else if (input == 2) {
          rl.close();
          functions.addUser();
        } else {
          console.log("Please type valid number.");
          rl.close();
          functions.startMenu();
        }
      }
    );
  },
  login: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);

    rl.question("Enter Account ID: ", (id) => {
      rl.question("Enter PIN: ", (pw) => {
        for (var i = 0; i < account.length; i++) {
          if (account[i].userId == id && account[i].PIN == pw) {
            rl.close();
            userNum = i;
            console.log(`Welcome! ${account[userNum].userId}`);
            functions.userMenu();
            break;
          } else if (account[i].userId == id && account[i].PIN != pw) {
            console.log("incorrect password");
            rl.close();
            functions.login();
            break;
          } else {
            console.log("Please check the info again.");
            rl.close();
            functions.login();
            break;
          }
        }
      });
    });
  },
  userMenu: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);

    console.log("Transaction Menu");
    console.log("Enter 1: Account Balance Check");
    console.log("Enter 2: Print Transactions");
    console.log("Enter 3: Update PIN");
    console.log("Enter 4: Withdraw Amount");
    console.log("Enter 5: Deposit Amount");
    console.log("Enter 6: Sign out");
    console.log("");

    rl.setPrompt("Choice should be in 1-6)  ");
    rl.prompt();

    rl.on("line", (input) => {
      const parsed = parseInt(input);
      switch (parsed) {
        case 1:
          console.log("4444444441");
          functions.balanceCheck();
          rl.close();
          

        case 2:
          console.log("2");
          rl.close();
          functions.History();
          break;

        case 3:
          console.log("3");
          rl.close();
          functions.updatePin();
          break;

        case 4:
          console.log("4");
          rl.close();
          functions.Withdraw();
          break;

        case 5:
          console.log("5");
          rl.close();
          functions.Deposit();
          break;
        case 6:
          console.log("Sign out.");
          rl.close();
          functions.login();
          break;

        default:
          console.log("Wrong input.");
          functions.userMenu();
          rl.close();
          break;
      }
    });
  },
  balanceCheck: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);
    console.log('');
    console.log(' BALANCE: $' + account[userNum].balance);
    console.log('');
    rl.close();
    functions.userMenu();
  },
  History: function () {

  },
  updatePin: function () {

  },
  Withdraw: function () {

  },
  Deposit: function () {
        var rl = readline.createInterface(process.stdin, process.stdout);
        rl.question("Enter deposit amount: ", (amount) => {
            if(amount < 0){
                console.log('Deposit amount should be more then 0.');
                rl.close();
                functions.Deposit();
            }else{
                account[userNum].balance += parseInt(amount);
                console.log(`Balance: ${account[userNum].balance}`);
                history.push({userId: account[userNum].userId, balance: account[userNum].balance, message: 'Deposited Amount of $' + amount + ' to account ' + account[userNum].userId +  '. Balance = $' + account[userNum].balance});            }
                rl.close();
                functions.userMenu();
  });
}
}
module.exports = functions;
