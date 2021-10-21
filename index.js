const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require("./db/connection");
const cTable = require("console.table");

var roleArr = [];
var managersArr = [];

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
  db.query("SELECT * FROM departments;", function (err, res) {
    if (err) throw err;
    console.table(res);
    startingPrompt();
  });
}

function viewAllRoles() {
  db.query(
    "SELECT roles.id, roles.title, departments.name As department, roles.salary FROM roles LEFT JOIN departments on roles.department_id = departments.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startingPrompt();
    }
  );
}

function viewAllEmployees() {
  db.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startingPrompt();
    }
  );
}

function addDepartment() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the Department name?",
      },
    ])
    .then((response) => {
      var query = db.query(
        "INSERT INTO departments SET ? ;",
        {
          name: response.departmentName,
        },
        function (err) {
          if (err) throw err;
          console.table(response);
          startingPrompt();
        }
      );
    });
}

function addRole() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the Role's Title?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the Salary?",
      },
      //   {
      //     type: "input",
      //     name: "roleDepartment",
      //     message: "What is the Role's Department?",
      //   },
    ])
    .then((response) => {
      db.query(
        "SELECT roles.title, roles.salary FROM roles",
        {
          title: response.roleName,
          salary: response.roleSalary,
        },
        function (err) {
          if (err) throw err;
          console.table(response);
          startingPrompt();
        }
      );
      //   db.query(
      //     "INSERT INTO departments SET ? ",
      //     {
      //       name: response.roleDepartment,
      //     },
      //     function (err) {
      //       if (err) throw err;
      //       console.table(response);
      //       startingPrompt();
      //     }
      //   );
    });
}

function selectRole() {
  db.query("SELECT * FROM roles;", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}

function selectManager() {
  db.query(
    "SELECT first_name, last_name FROM employees WHERE manager_id IS NULL;",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managersArr.push(res[i].first_name);
      }
    }
  );
  return managersArr;
}

function addEmployee() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "employeeName",
        message: "What is the Employee's first name?",
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "What is the Employee's last name?",
      },
      {
        type: "list",
        name: "employeeRole",
        message: "What is the Employee's Role?",
        choices: selectRole(),
      },
      {
        type: "rawlist",
        name: "employeeManager",
        message: "Who is the Employee's Manager?",
        choices: selectManager(),
      },
    ])
    .then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1;
      var managerId = selectManager().indexOf(val.choice) + 1;
      db.query(
        "INSERT INTO employees SET ? ",
        {
          first_name: val.employeeName,
          last_name: val.employeeLastName,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
          startingPrompt();
        }
      );
    });
}

function updateEmployeeRole() {
  db.query(
    "SELECT employees.last_name, roles.title FROM employees JOIN roles ON employees.role_id = roles.id;",
    function (err, res) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "rawlist",
            name: "lastName",
            choices: function () {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employees last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title?",
            choices: selectRole(),
          },
        ])
        .then(function (val) {
          var roleId = selectRole().indexOf(val.role) + 1;
          db.query(
            "UPDATE employees SET WHERE ?",
            {
              last_name: val.lastName,
            },
            {
              role_id: roleId,
            },
            function (err) {
              if (err) throw err;
              console.table(val);
              startingPrompt();
            }
          );
        });
    }
  );
}
//Queries End

// start prompt
startingPrompt();
