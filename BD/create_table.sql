DROP TABLE IF EXISTS USERTABLE CASCADE;

CREATE TABLE USERTABLE (
    nickname    VARCHAR(20) PRIMARY KEY,
    phone   VARCHAR(12) UNIQUE NOT NULL,
    email   VARCHAR(40)   UNIQUE NOT NULL,
    password    VARCHAR(20) NOT NULL,
    name    VARCHAR(20)   NOT NULL,
    money   INT,
    address VARCHAR(40) NOT NULL,
    birth   DATE,
    gender  VARCHAR(5),
    registration    TIMESTAMP   NOT NULL
);

DROP TABLE IF EXISTS GROUPS CASCADE;

CREATE TABLE GROUPS ( 
    group_id INT PRIMARY KEY,
    title VARCHAR(20) NOT NULL, 
    spend FLOAT NOT NULL,
    n_user INT,
    creation DATE NOT NULL
);

DROP TABLE IF EXISTS GROUP_USER CASCADE;

CREATE TABLE GROUP_USER ( 
    groupuser_id INT PRIMARY KEY,
    group_id INT REFERENCES groups(group_id),
    nick_name_1 VARCHAR(20) REFERENCES usertable(nickname),
    nick_name_2 VARCHAR(20) REFERENCES usertable(nickname),
    creation_date TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS TICKET CASCADE;

CREATE TABLE TICKET ( 
    ticket_id INT PRIMARY KEY,
    group_id_ref INT REFERENCES groups(group_id),
    status VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    place VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS PAYMENT_METHOD CASCADE;

CREATE TABLE PAYMENT_METHOD( 
    payment_id  INT PRIMARY KEY,
    nick_name_f VARCHAR(20) REFERENCES usertable(nickname),
    nick_name_u VARCHAR(20) REFERENCES usertable(nickname),
    date TIMESTAMP NOT NULL,
    bank VARCHAR(50)
);

DROP TABLE IF EXISTS SUBTICKET CASCADE;

CREATE TABLE SUBTICKET ( 
    subticket_id INT PRIMARY KEY,
    nickname_user VARCHAR(20) REFERENCES usertable(nickname),
    payment_id_ref INT REFERENCES payment_method(payment_id),
    date TIMESTAMP NOT NULL,
    total NUMERIC (5, 2),
    status VARCHAR(20) NOT NULL
);

DROP TABLE IF EXISTS PRODUCT CASCADE;

CREATE TABLE PRODUCT( 
    product_id INT PRIMARY KEY,
    item VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL
);

DROP TABLE IF EXISTS PRODUCTS_PROP CASCADE;

CREATE TABLE PRODUCTS_PROP( 
    products_prop_id INT PRIMARY KEY,
    product_id_ref INT REFERENCES product(product_id),
    subticket_id_ref INT REFERENCES subticket(subticket_id),
    nick_name_user VARCHAR(20) REFERENCES usertable(nickname),
    proportion INT
);

DROP TABLE IF EXISTS FRIENDS CASCADE;

CREATE TABLE FRIENDS ( 
    friend_id INT PRIMARY KEY,
    nick_name_u1 VARCHAR(20) REFERENCES usertable(nickname),
    nick_name_u2 VARCHAR(20) REFERENCES usertable(nickname),
    date TIMESTAMP NOT NULL
);

INSERT INTO USERTABLE VALUES('TEST', '603244633', 'polgraciae@gmail.com', 'splitit', 'Pol', 0, 'Carrer santa llucia', '12/02/2000', 'M', NOW());
INSERT INTO USERTABLE VALUES('TEST2', '60324633', 'DANI@gmail.com', 'splitit', 'DA', 0, 'Carrer santa llucia', '12/02/2000', 'M', NOW());
INSERT INTO USERTABLE VALUES('TEST3', '684244189', 'ferran.vera.filella@gmail.com', 'splitit', 'Ferran', 0, 'Carrer santa llucia', '12/02/2000', 'M', NOW());

