const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "google33",
    database: "employee_db"
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  
    console.log("connected as id " + connection.threadId);
  });

function prompt(){
    return inquirer.prompt([
        {
            type:"list",
            name:"firstSelection",
            message: "What would you like to do?",
            choices: ["List employees", "Add an employee", "Add a department", "Add roles", "View departments", "View roles", "View employees", "Update roles" ]
        }
    ])
    .then(selection => {
        if(selection.firstSelection == "List employees"){
            listEmployees();
        }
        if(selection.firstSelection == "Add an employee"){
            promptEmployeeInfo();
        }
        if(selection.firstSelection == "Add a department"){
            promptDeptInfo();
        }
        if(selection.firstSelection == "View departments"){
            listDepartments();
        }
        if(selection.firstSelection == "Add roles"){
            promptRoleInfo();
        }
        if(selection.firstSelection == "View roles"){
            listRoles();
        }
    })
}

function promptEmployeeInfo(){
    return inquirer.prompt([
        {
            type:"input",
            name: "employeeFirstName",
            message: "What is the employee's first name?"
        },
        {
            type:"input",
            name: "employeeLastName",
            message: "What is the employee's last name?"
        },
        {
            type:"input",
            name: "employeeRoleID",
            message: "What is the employee's role id?"
        },
        {
            type:"input",
            name: "managerID",
            message: "What is the employee's manager id?"
        }
    ])
    .then(selection => {
        addEmployees(selection);
    })
}

function promptDeptInfo(){
    return inquirer.prompt([
        {
            type:"list",
            name:"deptSelection",
            message: "What is the employee's department?",
            choices: ["Technical", "Finance", "Management", "Legal", "Marketing"]
        }
    ])
    .then(selection => {
        addDept(selection);
    })
}

function promptRoleInfo(){
    return inquirer.prompt([
        {
            type:"list",
            name:"roleSelection",
            message: "What is the employee's role?",
            choices: ["Engineer", "Finance Officer", "Manager", "Lawyer", "Intern"]
        },
        {
            type:"list",
            name:"salarySelection",
            message: "What is the employee's annual salary?",
            choices: ["30000", "60000", "90000", "125000"]
        },
        {
            type:"list",
            name:"deptIdSelection",
            message: "What is the employee's department id? (Technical=1, Finance=2, Management=3, Legal=4, Marketing=5)",
            choices: [1, 2, 3, 4, 5]
        }
    ])
    .then(selection => {
        addRole(selection);
    })
}

function listEmployees(){
    connection.query("SELECT * FROM employee;", (err, data) =>{
        if(err){
            throw err;
        }
        console.table(data);
    })
}

function listDepartments(){
    connection.query("SELECT * FROM department;", (err, data) =>{
        if(err){
            throw err;
        }
        console.table(data);
    })
}

function listRoles(){
    connection.query("SELECT * FROM roles;", (err, data) =>{
        if(err){
            throw err;
        }
        console.table(data);
    })
}

function addEmployees(newEmployee){
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [newEmployee.employeeFirstName, newEmployee.employeeLastName, newEmployee.employeeRoleID, newEmployee.managerID], (err, data) =>{
        if(err){
            throw err;
        }
        listEmployees();
    })
}

function addDept(newDept){
    connection.query("INSERT INTO department (dept_name) VALUES (?)", [newDept.deptSelection], (err, data) =>{
        if(err){
            throw err;
        }
        listDepartments();
    })
}

function addRole(newRole){
    connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [newRole.roleSelection, newRole.salarySelection, newRole.deptIdSelection], (err, data) =>{
        if(err){
            throw err;
        }
        listRoles();
    })
}

prompt();