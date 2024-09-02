CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE horarios (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    budget DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE services (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    description TEXT,
    horario_id CHAR(36),
    FOREIGN KEY (horario_id) REFERENCES horarios(id)
);
