// Imported Modules
const inquirer = require('inquirer');
const mysql = require('mysql');
const Table = require('cli-table');


// Table variable for cli-table module
var table = new Table({
    head: ['Id', 'Product', 'Price', 'Quantity']
});

// Connection variable for mysql module
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'bamazon_db'
});

var productId;
var amount;
var total;

// Connects to the server
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showProduct();
});

// Show the products using the cli-table module
function showProduct() {
    console.log("Here are our products!\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (i=0; i < res.length; i++) {
          table.push(
                [res[i].id, res[i].product_name, "$" + res[i].price, res[i].stock_quantity]
          );
      };
      console.log(table.toString());
    question1();
    });
};

// function that uses inquirer to ask the first question
function question1() {
  inquirer.prompt(
        {
        type: "input",
        name: "idChoice",
        message: "What is the ID of the product you'd like to buy?"
        }
    ).then(function(answer){
        idFind(answer);
    });
};

// function to make sure that the item id exists
function idFind(answer) {
    var query = "SELECT id FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        productId= parseInt(answer.idChoice);
        var idArray = [];
        for (var i=0; i < res.length; i++) {
            idArray.push(res[i].id);
        };
        if (idArray.includes(productId)) {
            return question2();
        } else {
            console.log("That id can not be found. Please choose again");                    
            return question1();
        };
    });
};

// 2nd question that is asked if the id exists
function question2() {
    inquirer.prompt(
        {
        type: "input",
        name: "quantityChoice",
        message: "How much would you like to purchase?"
        }
    ).then(function(answer){
        sellProducts(answer);
    })
    
};


// Function that sells the user X amount of items while making sure they both use a number
// and ask for a quantity less than what's in the database
function sellProducts(answer){
    var query = "SELECT id, price, stock_quantity FROM products WHERE ?";
    connection.query(query, { id: productId }, function(err, res) {
        if (err) throw err;
        amount = parseInt(answer.quantityChoice);
        total = res[0].stock_quantity;
        if (isNaN(amount)) {
            console.log("choose a number please");
            question2();
        } else if (amount > res[0].stock_quantity) {
            console.log("We don't have that much in stock sorry!")
            question2();
        } else {
            var cost = amount * res[0].price;
            console.log("That'll be $" + cost + ".")
            removeProducts();
        };
    });
};

// removes the amount of products the user decided to buy
function removeProducts(){
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query,
        [
            {
                stock_quantity: total -= amount 
            },
            {
                id: productId
            }
        ],
        function (err, res) {
            console.log("Here's " + amount + " units!")
            connection.end();
        })
};