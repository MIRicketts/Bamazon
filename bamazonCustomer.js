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

    inquirer.prompt([
      {
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
     type: "input",
     validate: function(enteredValue){
       if (isNaN(enteredValue)){
         return true;
       }
       return false;
     }
    }
  ]).then (function(answer){
    if(answer.products_name === dbResponse){

    }
  })

  })

}

// // Use inquirer to ask questions
// // first question
// function startPrompt() {

//   inquirer.prompt([{
//       name: "productQuestion",
//       type: "list",
//       message: "What item would you like to purchase?",
//       choices: ["LFC flag",'Barca ball', "Messi Jersey", "bagpack", "Jacket", "fifa 2019", "Mortal Kombat", "PS$ controller", "Bulbs", "Broom"]
//     },
//     // second question
//     {
//       name: "Quantity",
//       type: "input",
//       message: "How many items would you like to order?",
//       validate: function (value) {
//         if (isNaN(value) === true) {
//           return false;
//         };
//         // when the user choses the quantity add a --i to the quantity 
//         // quantity cannot be less than 0
//       }
//     }
//   ]).then(function (userResponse) {
//     for( var i = 0, i < res.length; i++){

//     if (userResponse.productQuestion === choices )
//   }
//   });
//   }