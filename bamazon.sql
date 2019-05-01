DROP DATABASE bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  b_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (b_id)
);

INSERT INTO products
(product_name, department_name, price, stock_quantity)

VALUES
("LFC flag", "Sporting", 15.99, 3),
("Barca ball", "Sporting", 21.00, 10),
("Messi Jersey", "Clothing", 25.50, 7),
("bagpack", "Accessories", 31.99, 5),
("Jacket", "Clothing", 20.00, 8),
("fifa 2019", "Gaming", 39.99, 10),
("Mortal Kombat", "Gaming", 45.99, 4),
("PS4 controller", "Accessories", 12.50, 1),
("Bulbs", "Home Improvement", 10.99, 8),
("Broom", "Home Improvement", 6.99, 9);

SELECT * FROM products;