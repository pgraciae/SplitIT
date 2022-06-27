
/* TABLES FRIENDS, GROUP_USER AND PRODUCTS_PROP DO NOT NEED PRIMARY KEY BUT IT MUST BE DEFINED FOR SQL ALCHEMY ORM*/

-- DROP TABLE IF EXISTS USERTABLE CASCADE;

CREATE TABLE USERTABLE (
    nickname    VARCHAR(30) PRIMARY KEY,
    phone   VARCHAR(20) UNIQUE NOT NULL,
    email   VARCHAR(1000)   UNIQUE NOT NULL,
    password    VARCHAR(30) NOT NULL,
    name    VARCHAR(20)   NOT NULL,
    money   REAL NOT NULL,
    address VARCHAR(1000) NOT NULL,
    birth   DATE,
    gender  VARCHAR(10),
    registration    TIMESTAMP   NOT NULL
);

-- DROP TABLE IF EXISTS GROUPS CASCADE;

CREATE TABLE GROUPS ( 
    group_id INT PRIMARY KEY,
    title VARCHAR(20) NOT NULL, 
    spend FLOAT NOT NULL,
    n_users INT,
    creation DATE NOT NULL
);

-- DROP TABLE IF EXISTS GROUP_USER CASCADE;

CREATE TABLE GROUP_USER ( 
    groupuser_id INT PRIMARY KEY,
    group_id INT REFERENCES groups(group_id),
    nickname VARCHAR(20) REFERENCES usertable(nickname),
    creation_date TIMESTAMP NOT NULL
);

-- DROP TABLE IF EXISTS TICKET CASCADE;

CREATE TABLE TICKET ( 
    ticket_id INT PRIMARY KEY,
    group_id INT REFERENCES groups(group_id),
    status VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    place VARCHAR(50) NOT NULL,
    place_id INT,
    type VARCHAR(50) NOT NULL
);


-- DROP TABLE IF EXISTS SUBTICKET CASCADE;

CREATE TABLE SUBTICKET ( 
    subticket_id INT PRIMARY KEY,
    ticket_id INT REFERENCES ticket(ticket_id),
    nickname_user VARCHAR(20) REFERENCES usertable(nickname),
    payment_id INT UNIQUE NOT NULL,
    date TIMESTAMP NOT NULL,
    total NUMERIC (5, 2),
    status VARCHAR(20) NOT NULL
);

-- DROP TABLE IF EXISTS PAYMENT_METHOD CASCADE;

CREATE TABLE PAYMENT_METHOD( 
    payment_id  INT PRIMARY KEY REFERENCES subticket(payment_id),
    paypal_id INT,
    date TIMESTAMP NOT NULL,
    bank VARCHAR(50)
);


-- DROP TABLE IF EXISTS PRODUCT CASCADE;

CREATE TABLE PRODUCT( 
    index_id INT PRIMARY KEY,
    product_id INT,
    ticket_id INT REFERENCES ticket(ticket_id),
    paid_by VARCHAR(30) REFERENCES usertable(nickname),
    item VARCHAR(1000) NOT NULL,
    rating INT,
    food_rating INT,
    service_rating INT,
    price NUMERIC(5,2) NOT NULL
);

-- DROP TABLE IF EXISTS PRODUCTS_PROP CASCADE;

CREATE TABLE PRODUCTS_PROP( 
    products_prop_id INT PRIMARY KEY,
    product_id INT REFERENCES product(index_id),
    subticket_id INT REFERENCES subticket(subticket_id),
    proportion REAL
);

-- DROP TABLE IF EXISTS FRIENDS CASCADE;

CREATE TABLE FRIENDS ( 
    friendship_id INT PRIMARY KEY,
    nick_name_u1 VARCHAR(20) REFERENCES usertable(nickname),
    nick_name_u2 VARCHAR(20) REFERENCES usertable(nickname),
    date TIMESTAMP NOT NULL
);

CREATE TABLE RECOMMENDATIONS (
    recommendation_id INT PRIMARY KEY,
    nickname INT,
    place VARCHAR(1000),
    type VARCHAR(100),
    estimation NUMERIC(5,2)
);

ALTER DATABASE postgres SET datestyle TO 'ISO, DMY'; --Dates format dd/mm/yyyy

--INSERT INTO USERTABLE VALUES('TEST', '603244633', 'polgraciae@gmail.com', 'splitit', 'Pol', 0, 'Carrer santa llucia', '12/02/2000', 'M', NOW());
--INSERT INTO USERTABLE VALUES('TEST2', '60324633', 'DANI@gmail.com', 'splitit', 'DA', 0, 'Carrer santa llucia', '12/02/2000', 'M', NOW());
--INSERT INTO USERTABLE VALUES('TEST3', '684244189', 'ferran.vera.filella@gmail.com', 'splitit', 'Ferran', 0, 'Carrer santa llucia', '12/02/2000', 'M', NOW());

--COPY USERTABLE FROM '/home/ferran/Escritorio/TFG/SplitIT/BD/Data/usertable.csv' DELIMITER ',' CSV HEADER;

