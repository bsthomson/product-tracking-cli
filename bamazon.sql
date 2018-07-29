DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(75) NULL,
    department_name VARCHAR(75) NULL,
    price FLOAT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('garbage', 'trash_services', .10, 20214), ('filth', 'trash_services', .35, 48001), 
('treasure', 'trash_services', 45.39, 4), ('dog', 'animal_containment', 400, 490), 
('cat', 'animal_containment', 250, 103), ('horse', 'animal_containment', 1056.02, 9),
('marble', 'knick_knacks', .90, 3098), ('top', 'knick_knacks', 1.34, 55),
('rubber_chicken', 'knick_knacks', 4.64, 151), ('bouncy_ball', 'knick_knacks', .50, 974);