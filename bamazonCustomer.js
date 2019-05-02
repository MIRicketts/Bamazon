const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("easy-table");


const connection = mysql.createConnection({

  host: "localhost",

  port: 3306,

  user: "root",

  password: "82ithemar",

  database: "bamazon_db"
});

// first function - create table 
connection.connect(function (error) {
  if (error) throw error;

  // starting the app
  startBam()
})

// define the function for startBam()
function startBam() {
  // get info from mysql workbench and print to page  
  connection.query("SELECT * FROM products", function (error, prodresponse) {
    if (error) throw error
    console.log(table.print(prodresponse))
  })

  // starting new function for questions
  startPrompt()

}

function startPrompt() {
  connection.query("SELECT * FROM products", function (error, prodresponse) {
    if (error) throw error

    inquirer.prompt([{
        message: "What would you like to buy?",
        name: "purchase",
        type: "list",
        choices: function () {
          let prodArr = [];
          for (let i = 0; i < prodresponse.length; i++) {
            prodArr.push(prodresponse[i].product_name)
          }
          return prodArr;
        }
      },
      {
        message: "How many items would you like to purchase",
        name: "quantity",
        type: "input"
        // validate: function (enteredValue) {
        //   if (isNaN(enteredValue)) {
        //     return true;
        //   }
        //   return false;
        // }
      }
    ]).then(function (answer) {
      // match answer with its corresponding product
      // create variable to hold chosen item value
      let chosenItem = prodresponse.find(item => {
        return item.product_name === answer.purchase;
      });
      

      // Check if there is enough stock. turm the answer into a number to check against our value.  enquirer stores all values as "strings".
      if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {

        // subtract from the inventory based on their quantity choice. create variable to hold new quantity value
        let newQty = chosenItem.stock_quantity - parseInt(answer.quantity);

        // Now total the transaction. create variable to hold the value of the total transaction value
        let total = parseInt(answer.quantity) * chosenItem.price;

        // update table to reflect the changes made from purchase.
        // connect to database to update changes
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [

            {

              stock_quantity: newQty
            },
            // update your values in here
            // SET ?
            {

              b_id: chosenItem.b_id
            }

          ],
          function (error) {
            if (error) throw error;

            // print total to console
            console.log(`Order Confirmed Your total is: ${total}`)

            // run again
            startBam();
          }
        );
      } else {
        // if we dont have enough in stock, let the user know and run the app again
        console.log("Insufficient Quantity");
        startPrompt();
      }



    });

  })

}