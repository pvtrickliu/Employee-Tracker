-- * **department**:

--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name

-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to

-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
	dept_name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE roles
(
	id int NOT NULL AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL,
	salary DECIMAL(10,2) NOT NULL,
	department_id int NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE employee
(
	id int NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id int NOT NULL,
	manager_id int NOT NULL,
	PRIMARY KEY (id)
);