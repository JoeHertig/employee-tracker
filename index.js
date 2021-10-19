const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require("./db/connection");
const cTable = require("console.table");

console.log(`
.------------------------------------------------------.
|     _____                 _                          |
|    | ____|_ __ ___  _ __ | | ___  _   _ ____ ____    |
|    |  _| |  _ ' _  | '_  | |/ _  | | | |  _ |  _ |   |
|    | |___| | | | | | |_| | | |_| | |_| |  __/  __/   |
|    |_____|_| |_| |_| .__/|_||___/| __, |____| ____|  |
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
      console.log(response);
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

function viewAllDepartments() {
  db.query("SELECT * FROM departments;", function (err, res) {
    if (err) throw err;
    console.table(res);
    startingPrompt();
  });
}

// start prompt
startingPrompt();
