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
        idFind(answer);
    });
};

function idFind(answer) {
    var query = "SELECT id FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        var productId= parseInt(answer.idChoice);
        var idArray = [];
        for (var i=0; i < res.length; i++) {
            idArray.push(res[i].id);
        };
        if (idArray.includes(productId)) {
            return question2(productId);
        } else {
            console.log("That id can not be found. Please choose again");                    
            return question1();
        };
    });
}

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
    
}

function sellProducts(answer){
    var query = "SELECT id, price, stock_quantity FROM products WHERE ?";
    connection.query(query, { id: productId }, function(err, res) {
        if (err) throw err;
        if (isNanN(parseInt(answer))) {
            console.log("choose a number please");
            question2();
        } else if (parseInt(answer) > res.stock_quantity) {
            console.log("We don't have that much in stock sorry!")
            question2();
        } else {
            var cost = parseInt(answer) * res.price;
            console.log("That'll be $" + cost + ".")
            removeProducts();
        }

    })
}

function rem