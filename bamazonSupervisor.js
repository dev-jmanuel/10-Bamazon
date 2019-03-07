// Set up require variables from this CLI app's npm packaged
const mysql = require('mysql');
const inquirer = require('inquirer');
const command = process.argv[2]; 

// Const to create connection with SQL database info
const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon_db',
    port: 3306
});

// Switches for this module's commands
switch(command) {

    case "show-sales":
        showSales();
        break;
        
    case "add-dept":
        addDepartment();
        break;

    // Log instructions into console for first-time users
    default: console.log(
        "\n<//====================================================//>" +
        "\n\nHELLO SUPERVISOR,"+ 
        "\n\ntype one of these commands after running bamazonCustomer.js:" +
        "\n- to view product sales by department: show-sales" +
        "\n- to create a new department: add-dept" +
        "\n\n<//====================================================//> \n"
    );
}

// Function to show product sales by department
function showSales() {
    connection.connect(function() {

        // Create an SQL query which adds the specified data from the products table to the departments table in a variable
        var innerJoin = `
        SELECT 
            departments.department_id,
            departments.department_name,
            departments.over_head_costs,
            products.product_sales
        FROM products
        INNER JOIN departments ON departments.department_name = products.department_name 
        ORDER BY department_id
        `;

        // Create an SQL query which calculates the product_sales of duplicate departments in a variable
        var prodSales = `
        SELECT department_id, department_name, over_head_costs, SUM(product_sales) AS product_sales
        FROM 
            (` + innerJoin + `) a
        GROUP BY department_name
        `;

        // Create an SQL query which calculates the total_profits of each department in a variable
        var totalProfits = `
        SELECT department_id, department_name, over_head_costs, product_sales, product_sales - over_head_costs AS total_profits
        FROM 
            (` + prodSales + `) b
        GROUP BY department_name
        ORDER BY department_id
        `;

        // Run variables with SQL queries to recall calculated data on the fly
        connection.query(totalProfits,
        function(err, data) {
            if (err) throw err;

            // Display calculated data of each department
            console.table(data);
            connection.end();
            
        });
    });
}

// Function to add a new department
function addDepartment() {
    connection.connect(function() {
        console.log('Connected as id ' + connection.threadId + "\n");

        // Prompt the user to enter the new department's data and insert into table
        inquirer.prompt ([
            {
                name: 'department',
                message: "Enter the new department:"
            },
            {
                name: 'over_head_costs',
                message: "Enter the department's over head cost:"
            },
        ]).then(function (prompt){
            connection.query("INSERT INTO departments SET ?", 
            {
                department_name: prompt.department ,
                over_head_costs: prompt.over_head_costs, 
            },
            function(err, table) {
                if (err) throw err;

                // Confirm added departments and end connection to database
                console.log("\n " + table.affectedRows + " new department has been added");
                showDepts();
            });
        });
    });
}

// Function to show available products
function showDepts() {
    connection.connect(function(err) {

        // Recall all products from SQL database
        connection.query("SELECT * FROM departments",
        function(err, data) {
            if (err) throw err;
            console.table(data);
            connection.end();

        });
    });
}