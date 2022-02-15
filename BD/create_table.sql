CREATE TABLE USERTABLE (
    nickname    VARCHAR(20) PRIMARY KEY,
    phone   VARCHAR(12) UNIQUE NOT NULL,
    email   VARCHAR(20)   UNIQUE NOT NULL,
    password    VARCHAR(20) NOT NULL,
    name    VARCHAR(20)   NOT NULL,
    money   INT,
    address VARCHAR(40) NOT NULL,
    birth   DATE,
    gender  VARCHAR(5),
    registration    TIMESTAMP   NOT NULL
);

CREATE TABLE FRIENDS ( 
    nick_name_u1 VARCHAR(20) REFERENCES usertable(nickname),
    nick_name_u2 VARCHAR(20) REFERENCES usertable(nickname),
    date TIMESTAMP NOT NULL
);


CREATE TABLE GROUPS ( 
    group_id INT PRIMARY KEY,
    title VARCHAR(20) NOT NULL, 
    spend FLOAT NOT NULL,
    n_user INT,
    creation DATE NOT NULL
);

CREATE TABLE GROUP_USER ( 
    group_id INT references groups(group_id),
    nick_name_1 VARCHAR(20) REFERENCES usertable(nickname),
    nick_name_2 VARCHAR(20) REFERENCES usertable(nickname),
    creation_date TIMESTAMP NOT NULL
);

CREATE TABLE TICKET ( 
    ticket_id INT PRIMARY KEY,
    group_id_ref INT REFERENCES groups(group_id),
    status VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    place VARCHAR(50) NOT NULL
);


CREATE TABLE PAYMENT_METHOD( 
    payment_id  INT PRIMARY KEY,
    nick_name_f VARCHAR(20) REFERENCES usertable(nickname),
    nick_name_u VARCHAR(20) REFERENCES usertable(nickname),
    date TIMESTAMP NOT NULL,
    bank VARCHAR(50)
);

CREATE TABLE SUBTICKET ( 
    subticket_id INT PRIMARY KEY,
    nickname_user VARCHAR(20) REFERENCES usertable(nickname),
    payment_id_ref INT REFERENCES payment_method(payment_id),
    date TIMESTAMP NOT NULL,
    total NUMERIC (5, 2),
    status VARCHAR(20) NOT NULL
);


CREATE TABLE PRODUCT( 
    product_id INT PRIMARY KEY,
    item VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL
);

CREATE TABLE PRODUCTS_PROP( 
    product_id_ref INT REFERENCES product(product_id),
    subticket_id_ref INT REFERENCES subticket(subticket_id),
    nick_name_user VARCHAR(20) REFERENCES usertable(nickname),
    proportion INT
);

