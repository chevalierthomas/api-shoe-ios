DROP TABLE IF EXISTS order_line;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS client_order;
DROP TABLE IF EXISTS shoe;
DROP TABLE IF EXISTS client;

-- Table pour les chaussons d'escalade
    CREATE TABLE shoe (
    idShoe SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    color TEXT,
    imageURL TEXT
);

-- Table pour les clients
CREATE TABLE client (
    idClient SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) UNIQUE NOT NULL,
    dateOfBirth DATE,
    --Case a cocher
    extraChalk BOOL,
    frequentRefill BOOL
);

-- Table pour les commandes
CREATE TABLE client_order (
    idOrder SERIAL PRIMARY KEY,
    dateOrder TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idClient INT NOT NULL,
    FOREIGN KEY (idClient) REFERENCES CLIENT(idClient)
);

-- Table pour les lignes de commande
CREATE TABLE order_line (
    idOrder INT NOT NULL,
    idShoe INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price INT NOT NULL,
    PRIMARY KEY (idOrder, idShoe),
    FOREIGN KEY (idOrder) REFERENCES client_order(idOrder) ON DELETE CASCADE,
    FOREIGN KEY (idShoe) REFERENCES SHOE(idShoe)
);

CREATE TABLE cart (
    idShoe INT NOT NULL,
    idClient INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY (idShoe, idClient),
    FOREIGN KEY (idShoe) REFERENCES shoe(idShoe) ON DELETE CASCADE,
    FOREIGN KEY (idClient) REFERENCES client(idClient) ON DELETE CASCADE,
    FOREIGN KEY (idShoe) REFERENCES SHOE(idShoe)
);

-- Insertion de chaussures
INSERT INTO shoe (name, description, price, imageURL)
VALUES
('Model X', 'Chaussons ultra confortables', 120.50, 'http://example.com/x.jpg'),
('Model Y', 'Parfaites pour les débutants', 89.99, 'http://example.com/y.jpg');

-- Insertion de clients
INSERT INTO client (firstName, lastName, email, password,dateOfBirth)
VALUES
('Alice', 'Durand', 'alice@example.com','toto' ,'1998-06-15'),
('Bob', 'Martin', 'bob@example.com', 'clemclem','1985-02-22');

-- Insertion d'une commande
INSERT INTO client_order (idClient)
VALUES ( 1);

-- Insertion de lignes de commande
INSERT INTO order_line (idOrder, idShoe, quantity,price)
VALUES
(1, 1, 1, 50), -- Model X en taille 40
(1, 2, 2, 50); -- 2x Model Y en taille 42


INSERT INTO cart (idClient, idShoe, quantity)
VALUES
(1, 1, 1), -- Model X en taille 40
(1, 2, 2); -- 2x Model Y en taille 42


SELECT idClient
FROM client
WHERE email = 'alice@example.com' AND password = 'toto' || '';