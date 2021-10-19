const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require("./db/connection");
const cTable = require("console.table");

// Text banner
console.log(`
.------------------------------------------------------.
|     _____                 _                          |
|    | ____|_ __ ___  _ __ | | ___  _   _ ____ ____    |
|    |  _| |  _ ' _  | '_  | |/ _  | | | |  _ |  _ |   |
|    | |___| | | | | | |_| | | |_| | |_| |  __/  __/   |
|    |_____|_| |_| |_| .__/|_||___/| __, |____|____|   |
|                    |_|            |___/              |
|                                                      |
|     __  __                                           |
|    |   V  | __ _ _ ___  __ _  __ _  ___ _ __         |
|    | |  | |/ _' | '_  |/ _' |/ _' |/ _ | '__|        |
|    | |  | | (_| | | | | (_| | (_| |  __/ |           |
|    |_|  |_||__,_|_| |_||__,_||__, ||___|_|           |
|                              |___/                   |
'------------------------------------------------------'
`);

// Beginning prompt questions
const startingPrompt = async () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "startingPrompt",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add A Role",
          "Add An Employee",
          "Update An Employee Role",
        ],
      },
    ])
    .then((response) => {
      switch (response.startingPrompt) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add A Department":
          addDepartment();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Update An Employee Role":
          updateEmployeeRole();
          break;
      }
    });
};
// Starting prompt end

// Queries
function viewAllDepartments() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    startingPrompt();
  });
}

function viewAllRoles() {
  db.query(
    "SELECT roles.id, roles.title, departments.name As department, roles.salary FROM roles LEFT JOIN departments on roles.department_id = departments.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startingPrompt();
    }
  );
}

function viewAllEmployees() {
  db.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startingPrompt();
    }
  );
}

function addDepartment() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    startingPrompt();
  });
}

function addRole() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    startingPrompt();
  });
}

function addEmployee() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    startingPrompt();
  });
}

function updateEmployeeRole() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    startingPrompt();
  });
}
//Queries End

// start prompt
startingPrompt();
