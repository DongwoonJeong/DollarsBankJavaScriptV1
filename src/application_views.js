const readline = require("readline");

var account = [
  //   { userId: "1", PIN: "1", balance: 500.0 },
  //   { userId: "2", PIN: "2", balance: 100.0 },
];
var history = [];
var userNum = 0;

const TransactionDate = new Date();
const atm = {
  menu: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);

    console.log("");
    rl.question(
      "Enter a valid choice (1. Transaction 2. Open New Account)",
      (input) => {
        if (input == 1) {
          rl.close();
         atm.login();
         
        } else if (input == 2) {
          rl.close();
          atm.CreateUser();
        
        } else {
          console.log("Please type valid number.");
          rl.close();
         atm.menu();
         
        }
      }
    );
  },
  login: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);
    console.log(' ');
    rl.question("Enter Account ID: ", (id) => {
      rl.question("Enter PIN: ", (pw) => {
        if(account.length == 0){
          console.log("No account found in the system. create an account.")
          console.log(' ');
          rl.close();
          atm.CreateUser();
        }else{
        for (let i = 0; i < account.length; i++) {
          

          if (account[i].userId == id && account[i].PIN == pw) {
           
            rl.close();
            userNum = i;
            console.log(' ');
            console.log(`Account ${account[userNum].userId} logged in.`);
            console.log(' ');
            atm.userMenu();
            break;
          }
        if (account[i].userId != id || account[i].PIN != pw) {
          console.log(' ');
            console.log("incorrect password");
            console.log(' ');
            rl.close();
            atm.login(); 
          }
        }
      }
      });
    });
  
  },
  userMenu: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);

    console.log("");
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
          console.log("");  
          console.log("Balance check");
        rl.close();
          atm.balanceCheck();

          break;
        case 2:
          console.log("");  
          console.log("Transaction History");
          rl.close();
          atm.History();
          
          break;

        case 3:
          console.log("");  
          console.log("Update Pin");
          rl.close();
          atm.updatePin();
          break;

        case 4:
          console.log("");  
          console.log("Withdraw");
          rl.close();
          atm.Withdraw();
          break;

        case 5:
          console.log("");  
          console.log("Deposit");
          rl.close();
          atm.Deposit();
          break;
        case 6:
          console.log("");  
          console.log("bye.");
          rl.close();
          atm.menu();
          break;

        default:
          console.log("Wrong input.");
          rl.close();
          atm.userMenu();
          break;
      }
    });
  },
  balanceCheck: function () {
    console.log("");
    console.log("Your BALANCE: $" + account[userNum].balance);
    console.log("");
    atm.userMenu();
  },
  History: function () {
    var found = false;
    console.log("");
    for (var i = 0; i < history.length; i++) {
      if (history[i].userId == account[userNum].userId) {
        found = true;
        console.log(history[i].message + " " + TransactionDate);
      }
       if(found = false){
        
        console.log("no transaction has been made yet.");
    }
  }
    atm.userMenu();
  },
  updatePin: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);
    console.log("");
    rl.question("Enter current PIN: ", (inputPin) => {
      if (account[userNum].PIN == inputPin) {
        rl.question("Enter new PIN: ", (inputPin) => {
          var newpin = inputPin;
          rl.question("Verify new PIN: ", (inputPin2) => {
            if (inputPin == inputPin2) {
              account[userNum].PIN = newpin;
              console.log("");
              console.log("PIN UPDATED. PLEASE LOG IN AGAIN.");
              rl.close();
              atm.login();
            } else {
              console.log("New PIN does not match.");
              rl.close();
              atm.updatePin();
            }
          });
        });
      } else {
        console.log("");
        console.log("Wrong PIN try again.");
        rl.close();
        atm.updatePin();
      }
    });
  },
  Withdraw: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);
    console.log("");
    rl.question("Enter withdraw amount: ", (amount) => {
      if (account[userNum].balance > amount && amount > 0) {
        account[userNum].balance -= parseInt(amount);
        console.log(`Balance: ${account[userNum].balance}`);
        history.push({
          userId: account[userNum].userId,
          balance: account[userNum].balance,
          message:
            "$ " +
            amount +
            " Withdraw " +
            " from account id" +
            account[userNum].userId +
            ". Balance $" +
            account[userNum].balance,
          TransactionDate: Date.now(),
        });
        rl.close();
        atm.userMenu();
      } else {
        console.log(
          "Withdraw amount should be more then 0, more then the remaining balance."
        );
        rl.close();
        atm.Withdraw();
      }
    });
  },
  Deposit: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);
    console.log("");
    rl.question("Enter deposit amount: ", (amount) => {
      if (amount < 0) {
        console.log("Deposit amount should be more then 0.");
        rl.close();
        atm.Deposit();
      } else {
        account[userNum].balance += parseInt(amount);
        console.log(`Balance: ${account[userNum].balance}`);
        history.push({
          userId: account[userNum].userId,
          balance: account[userNum].balance,
          message:
            "$ " +
            amount +
            " Deposited " +
            " to account id" +
            account[userNum].userId +
            ". Balance $" +
            account[userNum].balance,
          TransactionDate: Date.now(),
        });
      }
      rl.close();
      atm.userMenu();
    });
  },
  CreateUser: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);
    console.log("");
    rl.question("Enter user Id Number: ", (actNum) => {
      rl.question("Enter initial deposit: ", (deposit) => {
        rl.question("Enter PIN: ", (newpin) => {
          rl.question("Verify PIN: ", (newpin2) => {
            if (newpin == newpin2) {
              account.push({
                userId: actNum,
                PIN: newpin2,
                balance: parseInt(deposit),
              });
              console.log(' ');
              console.log("new account created.");
              history.push({
                userId: actNum,
                balance: deposit,
                message:
                  "new account id " +
                  actNum +
                  " created with initial deposit $" +
                  deposit,
                TransactionDate: Date.now(),
              });
              rl.close();
              atm.menu();
            } else {
              console.log("");
              console.log("PIN does not match. please do it again.");
              rl.close();
              atm.CreateUser();
            }
          });
        });
      });
    });
  },
};
module.exports = atm;
