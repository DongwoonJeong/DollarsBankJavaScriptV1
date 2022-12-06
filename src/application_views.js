const readline = require("readline");

var account = [
    {userId: '1', PIN: '1123', balance: 500.00},
    {userId: '2', PIN: '2123', balance: 100.00},
];
var history =[];

const functions = {
  menu: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);

    // console.log("Enter a valid choice");
    // console.log("1 > Transaction");
    // console.log("2 > Open New Account");

    // rl.on("line", (input) => {
    //   if (input == 1) {
    //     rl.close();
    //     functions.login();
    //   } else if (input == 2) {
    //     rl.close();
    //     functions.addUser();
    //   } else {
    //     console.log("Please type valid number.");
    //     rl.close();
    //     functions.startMenu();
    //   }
    // });

    console.log('');
    rl.question('Enter a valid choice (1. Transaction 2. Open New Account)', (input) => {
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
    });
  },
  login: function () {
    var rl = readline.createInterface(process.stdin, process.stdout);

    rl.question('Enter Account ID: ', (id) => {
        rl.question('Enter PIN: ', (pw) => {
            for(var i=0; i<account.length; i++){
                if(account[i].userId == id && account[i].PIN == pw) {
                    rl.close();
                    console.log('Welcome!');
                    functions.userMenu();
                    break;
                }else if(account[i].userId == id && account[i].PIN != pw){
                    console.log('incorrect password')
                    rl.close();
                    functions.login();
                    break;
                }else{
                    console.log('Please check the info again.');
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

    console.log('Transaction Menu');
    console.log('Enter 1: Account Balance Check');
    console.log('Enter 2: Print Transactions');
    console.log('Enter 3: Update PIN');
    console.log('Enter 4: Withdraw Amount');
    console.log('Enter 5: Deposit Amount');
    console.log('Enter 6: Sign out');
    console.log('');

    rl.setPrompt('Choice should be in 1-6)  ');
    rl.prompt();

    rl.on('line', (input) => {
        const parsed=parseInt(input);
        switch(parsed){
            case 1:
                console.log('4444444441');
                functions.balanceCheck();
                rl.close();
                break;

            case 2:
                console.log('2');
                functions.History();
                rl.close();
                break;

            case 3:
                console.log('3');
                functions.updatePin();
                rl.close();
                break;

            case 4:
                console.log('4');
                functions.Withdraw();
                rl.close();
                break;

            case 5:
                console.log('5');
                functions.Deposit();
                rl.close();
                break;
            case 6:
                console.log('Sign out.');
                functions.login();
                rl.close();
                break;
                
            }

      });
},
  balanceCheck: function () {

  },
  History: function () {

  },
  updatePin: function () {

  },
  Withdraw: function () {

  },
  Deposit: function () {

  },
}
module.exports = functions;