// Set up require variables from this CLI app's npm packaged
const mysql = require('mysql');
const inquirer = require('inquirer');
const command = process.argv[2]; 

// Connect to SQL database
const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon_db',
    port: 3306
});

// Switches for this module's commands
switch(command) {

    case "place-order":
        placeOrder();
        break;

    case "show-prod":
        showProducts();
        break;

    // Log instructions into console for first-time users
    default: console.log(
        "\n<//====================================================//>" +
        "\n\nHELLO CUSTOMER,"+ 
        "\n\ntype one of these commands after running bamazonCustomer.js:" +
        "\n- to place an order: place-order" +
        "\n- to show available products: show-prod" +
        "\n\n<//====================================================//> \n"
    );

}

// Function to show available products
function showProducts() {
    connection.connect(function(err) {

        // Recall all products from SQL database
        connection.query("SELECT * FROM products",
        function(err, data) {
            if (err) throw err;
            console.table(data);
            connection.end();

        });
    });
}

// Function to place an order
function placeOrder() {
    connection.connect(function() {
        console.log('Connected as id ' + connection.threadId + "\n");

        // Prompt user to select an item by item_id and order quantity
        inquirer.prompt([
            {
                name: 'id',
                message: "Enter the item's ID you wish to purchase:"
            },
            {
                name: 'quantity',
                message: "Enter the quantity of your purchase:"
            }
        ]).then(function (prompt){
            connection.query("SELECT * FROM products WHERE ?",
            {
                item_id: prompt.id
            },
            function(err, data) {
                if (err) throw err;

                // Calculate the new stock quantity and product sales after transaction into variables
                var newInv = data[0].stock_quantity - prompt.quantity;
                var sale = data[0].price * prompt.quantity;
                var newSales = data[0].product_sales + sale;

                // Update item with new variables
                connection.query("UPDATE products SET ? WHERE ?",
                [{
                    stock_quantity: newInv,
                    product_sales: newSales
                },
                {
                    item_id: prompt.id
                }]);

                // Confirm order and end connection to database
                console.log("Your order has been placed");
                connection.end();
            })
        });
    });
}
