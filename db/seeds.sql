INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Lead', '100000', 1),
  ('Salesperson', '80000', 2),
  ('Lead Engineer', '150000', 3),
  ('Software Engineer', '120000', 4),
  ('Accountant', '125000', 5),
  ('Legal Team Lead', '250000', 6),
  ('Lawyer', '190000', 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, 3),
  ('Mike', 'Chan', 2, 1),
  ('Ashley', 'Rodriguez', 3, NULL),
  ('Kevin', 'Tupik', 4, 3),
  ('Malia', 'Brown', 5, NULL),
  ('Sarah', 'Lourd', 6, NULL),
  ('Tom', 'Allen', 7, 6),
  ('Christian', 'Echenrode', 8, 2);
