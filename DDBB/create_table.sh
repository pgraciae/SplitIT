#!/bin/bash
#sudo apt install $userql $userql-contrib

if [ -z "$1" ] | [ -z "$2"]
  then
    echo "No BD name or user to create tables provided, exiting..."
    exit 1
else
    username=$1
    bd=$2
    echo "Welcome user: $username"
    echo "Creating tables in $bd"
fi

user="CREATE TABLE USERTABLE (
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
);"

friends="CREATE TABLE FRIENDS ( 
    nick_name_u1 VARCHAR(20) REFERENCES usertable(nickname),
    nick_name_u2 VARCHAR(20) REFERENCES usertable(nickname),
    date TIMESTAMP NOT NULL
);"

# title Hauria de ser unique?????
group="CREATE TABLE GROUPS ( 
    group_id INT PRIMARY KEY,
    title VARCHAR(20) NOT NULL, 
    spend INT NOT NULL,
    n_user INT,
    creation DATE NOT NULL
);"

# groupuser="CREATE TABLE GROUPUSER ( 

# );"

ticket="CREATE TABLE TICKET ( 
    ticket_id INT PRIMARY KEY,
    group_id_ref INT REFERENCES groups(group_id),
    status VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    place VARCHAR(50) NOT NULL
);"

#userticket="CREATE TABLE USERTICKET ( 

#);"
payment_method="CREATE TABLE PAYMENT_METHOD( 
    payment_id  INT PRIMARY KEY,
    nick_name_f VARCHAR(20) REFERENCES usertable(nickname),
    nick_name_u VARCHAR(20) REFERENCES usertable(nickname),
    date TIMESTAMP NOT NULL,
    bank VARCHAR(50)
);"

subticket="CREATE TABLE SUBTICKET ( 
    subticket_id INT PRIMARY KEY,
    nickname_user VARCHAR(20) REFERENCES usertable(nickname),
    payment_id_ref INT REFERENCES payment_method(payment_id),
    date TIMESTAMP NOT NULL,
    total NUMERIC (5, 2),
    status VARCHAR(20) NOT NULL
);"


product="CREATE TABLE PRODUCT( 
    product_id INT PRIMARY KEY,
    item VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL
);"

products_prop="CREATE TABLE PRODUCTS_PROP( 
    product_id_ref INT REFERENCES product(product_id),
    subticket_id_ref INT REFERENCES subticket(subticket_id),
    nick_name_user VARCHAR(20) REFERENCES usertable(nickname),
    proportion INT
);"


sudo -u $username psql $bd -c "${user}"
sudo -u $username psql $bd -c "${friends}"
sudo -u $username psql $bd -c "${group}"
sudo -u $username psql $bd -c "${ticket}"
sudo -u $username psql $bd -c "${payment_method}"
sudo -u $username psql $bd -c "${subticket}"
sudo -u $username psql $bd -c "${product}"
sudo -u $username psql $bd -c "${products_prop}"