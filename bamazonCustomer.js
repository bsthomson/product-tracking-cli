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
    connection.end();
    });
};

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showProduct();
  });