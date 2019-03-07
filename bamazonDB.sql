DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

CREATE TABLE products (
	item_id INT(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INT(100) NOT NULL,
    stock_quantity INT(100) NOT NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INT(11) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs INT(100) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('iPhone Case', 'Accessories', 16.91, 14), 
	   ('Prismacolor', 'Art', 24.95, 60),
       ('Bodum Brazil French Press', 'Miscellaneous', 16.99, 45),
       ('Blood Pressure Cuff', 'Medical', 24.95, 25),
       ('Grean Tea Memory Foam Mattress', 'Furniture', 239.00, 10);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Accessories', 10),
       ('Art', 10),
       ('Furniture', 10),
       ('Medical', 10),
       ('Miscellaneous', 10);
       
ALTER TABLE products
ADD department_sales INT(100);

SELECT departments.department_id, departments.department_name, departments.over_head_costs,
       products.department_name, products.department_sales
FROM   departments
RIGHT JOIN products
ON departments.department_name = products.department_name;


