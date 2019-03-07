// Set up require variables from this CLI app's npm packaged
const mysql = require('mysql');
const inquirer = require('inquirer');
const command = process.argv[2]; 

// Const to create connection with SQL database data
const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon_db',
    port: 3306
});

// Switches for this module's commands
switch(command) {

    case "show-prod":
        showProducts();
        break;

    case "low-stock":
        showLowStock();
        break;

    case "add-inv":
        addInventory();
        break;

    case "add-prod":
        addProduct();
        break;

    // Log instructions into console for first-time users
    default: console.log(
        "\n<//====================================================//>" +
        "\n\nHELLO MANAGER,"+ 
        "\n\ntype one of these commands after running bamazonManager.js:" +
        "\n- To view products for sale: show-prod" +
        "\n- To view low inventory: low-stock" +
        "\n- To add to a product's inventory: add-inv" +
        "\n- To add new product: add-prod" +
        "\n\n<//====================================================//> \n"
    );
}

// Function to show available products
function showProducts() {
    connection.connect(function() {
        
        // Recall products data from SQL database
        connection.query("SELECT * FROM products",
        function(err, data) {
            if (err) throw err;
            console.table(data);
            connection.end();
            
        });
    });
}

// Function to show low stock products
function showLowStock() {
    connection.connect(function() {
        console.log('Connected as id ' + connection.threadId + "\n");

        // Recall products with 15 or less stock_quantity from SQL database
        connection.query("SELECT * FROM products WHERE stock_quantity <= 15",
        function(err, data) {
            if (err) throw err;
            console.log("\nLow stock products: ");
            console.table(data);
            connection.end();
        });
    });
}

// Function to add inventory to a product
function addInventory() {
    connection.connect(function() {
        console.log('Connected as id ' + connection.threadId + "\n");

        // Prompt the user to select an item by item_id and the amount of inventory added
        inquirer.prompt ([
            {
                name: 'id',
                message: "Enter the product's item id:"
            },
            {
                name: 'inv',
                message: "Enter the amount of inventory added:"
            },
        ]).then(function (prompt){
            connection.query("SELECT * FROM products WHERE ?",
            {
                item_id: prompt.id
            },
            function(err, data) {
                if (err) throw err;

                // Calculate the new stock quantity of item
                var intPrompt = parseInt(prompt.inv);
                var newInv = data[0].stock_quantity + intPrompt;
                var prodName = data[0].product_name;

                // Update item with new variables
                connection.query("UPDATE products SET ? WHERE ?",
                [{
                    stock_quantity: newInv,
                },
                {
                    item_id: prompt.id
                }]);

                // Confirm added inventory and end connection to database
                console.log("\n" + prodName + "'s new inventory has been added");
                connection.end();
            });
        });
    });
}

// Function to add a new product
function addProduct() {
    connection.connect(function() {
        console.log('Connected as id ' + connection.threadId + "\n");

        // Prompt the user to enter the new product's data and insert into table
        inquirer.prompt ([
            {
                name: 'product',
                message: "Enter the new product:"
            },
            {
                name: 'department',
                message: "Enter the product's department:"
            },
            {
                name: 'price',
                message: "Enter the product's price:"
            },
            {
                name: 'stock',
                message: "Enter the product's stock quantity:"
            },
        ]).then(function (prompt){
            connection.query("INSERT INTO products SET ?, product_sales = 0", 
            {
                product_name: prompt.product ,
                department_name: prompt.department ,
                price: prompt.price, 
                stock_quantity: prompt.stock 
            },
            function(err) {
                if (err) throw err;

                // Confirm added product and end connection to database
                console.log("\nA new product has been added");
                showProducts();
            });
        });
    });
}
