.then(function(answer) {
  //match answer with its corresponding prouct
  let chosenItem = prodresponse.find(item => {
    return item.product_name === answer.purchase;
  });
  console.log(chosenItem);
  //check if there is enough stock. we turn the answer into a number to check against our value
  if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
    //subtract from the inventory based on their quantity choice
    let newQty = chosenItem.stock_quantity - parseInt(answer.quantity);
    //total their transaction
    let total = parseInt(answer.quantity) * chosenItem.price;
    //update our products table to reflect the changes
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          //update your values in here
          SET 
          
          //where stock_quantity: newQty and where id matches chosenItem.id or whatever you want it 
          WHERE stock_quantity : newQty
        }
      ],
      function(error) {
        if (error) throw err;
        //print total to console
        console.log(`
    Order Confirmed
    Your total is: ${total}`);
        //run again
        startBam();
      }
    );
  } else {
    //if we dont have enough in stock, let the user know and run the app again
    console.log("Insufficient Quantity");
    startPrompt();
  }
});