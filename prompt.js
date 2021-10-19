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

const startingPrompt = () => {
  return inquirer.prompt([
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
  ]);
};

startingPrompt();
