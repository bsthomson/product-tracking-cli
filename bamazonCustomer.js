const inquirer = require('inquirer');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'bamazon_db'
});

function showProduct() {
    console.log("Here are our products!\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log("Id --- Product --- Price --- Quantity")
      for (i=0; i < res.length; i++) {
      console.log(res[i].id + " --- " + res[i].product_name + " --- $" + res[i].price + " --- " + res[i].stock_quantity);
      }
    question1();
    });
};

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showProduct();
  });

function question1() {
  inquirer.prompt(
        {
        type: "input",
        name: "idChoice",
        message: "What is the ID of the product you'd like to buy?"
        }
    ).then(function(answer){
        var query = "SELECT id FROM products";
        connection.query(query, function(err, res) {
            if (err) throw err;
            var idString;
            var productId= answer.idChoice;
            for (i=0; i < res.length; i++) {
                idString =+ " " + res[i].id;
                console.log(idString);
                if (idString.indexOf(answer.idChoice) === -1) {
                    console.log("That id can not be found. Please choose again");                    
                    question1();
                } else {
                    return question2();
                };
            };
        });
    });
};

function question2() {
    inquirer.prompt(
        {
        type: "input",
        name: "quantityChoice",
        message: "How much would you like to purchase?"
        }
    ).then(function(answer){
        var query = "SELECT id, stock_quantity FROM products WHERE ?";
        connection.query(query, { id: productId }, function(err, res) {

        })
    })
    
}