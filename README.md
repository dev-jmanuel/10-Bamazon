# Bamazon

## About

The Bamazon is like an Amazon-like storefront CLI app that connects with MySQL. The app will interact with the MySQL databse either as a customer, manager, or supervisor (depending on which module you choose to run).

## Installation

This app uses the `inquirer` and `mysql` npm packages. Also requires My SQL workbench and server to create a database.



## Customer

To run the app as a customer, type 'node bamazonCustomer.js' on your terminal. This will prompt you the commands available in this module:

![alt text](https://github.com/joshespr/10-Bamazon/blob/master/gifs/customer_main1.gif)


### Customer command: Show Products

Typing 'show-prod' after running this module allows the user to view the available products:

![alt text](https://github.com/joshespr/10-Bamazon/blob/master/gifs/customer_showprod.gif)


### Customer command: Place Order

Typing 'place-order' after running this module allows the user to place an order on a product:

![alt text](https://github.com/joshespr/10-Bamazon/blob/master/gifs/customer_order.gif)

After an order has been placed, the ordered product's stock quantity decreases, and the current product's sales is calculated. This update can be shown by viewing the products list again with 'show-prod'



## Manager

To run the app as a customer, type 'node bamazonManager.js' on your terminal. This will prompt you the commands available in this module:

![alt text](https://github.com/joshespr/10-Bamazon/blob/master/gifs/manager_main.gif)


### Manager command: Show Products

Typing 'show-prod' after running this module allows the user to view the available products:

![alt text](https://github.com/joshespr/10-Bamazon/blob/master/gifs/manager_showprod.gif)


### Manager command: Low Stock

Typing 'low-stock' after running this module allows the user to view the products with low stock quantity:

![alt text](https://github.com/joshespr/10-Bamazon/blob/master/gifs/manager_lowstock.gif)


### Manager command: Add Inventory

Typing 'add-inv' after running this module allows the user to add an inventory quantity to a product:

![alt text](https://github.com/joshespr/10-Bamazon/blob/master/gifs/manager_addinv.gif)

After inventory has been added, the updated product's stock quantity increases. This update can be shown by viewing the products list again with 'show-prod'


### Manager command: Add Product

Typing 'add-prod' after running this module allows the user to add a new product to the database:

![alt text](https://github.com/joshespr/10-Bamazon/blob/master/gifs/manager_addprod.gif)

After a product has been added, a new products list will be logged to confirm the change.


## Supervisor

To run the app as a customer, type 'node bamazonSupervisor.js' on your terminal. This will prompt you the commands available in this module:

![alt text](https://github.com/joshespr/10-Bamazon/blob/master/gifs/supervisor_main.gif)


### Supervisor command: Show Sales

Typing 'show-sales' after running this module allows the user to view the product sales of each department:

![alt text](https://github.com/joshespr/10-Bamazon/blob/master/gifs/supervisor_showsales.gif)

This calculates the total product sales and profits for each department on the fly, and logs it into the console.


### Supervisor command: Add Departments

Typing 'add-dept' after running this module allows the user to add a new department to the database:

![alt text](https://github.com/joshespr/10-Bamazon/blob/master/gifs/supervisor_adddept.gif)

After a department has been added, a new departments list will be logged to confirm the change.


## Authors

Joshua Manuel

## License

MIT License