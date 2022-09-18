-- viewDepartments
SELECT id, name AS department 
FROM department

-- viewRoles
--show id, title, salary, department
SELECT role.id, role.title, department.name AS department, role.salary
FROM role 
RIGHT JOIN department
ON department.id = role.department_id
ORDER BY role.id; 

-- viewEmployees
--id, first, last, title, dept, salary, manager
SELECT department.department_name AS department, 
role.title AS title,
role.salary AS salary,
employee.id, employee.first_name,employee.last_name,
employee.manager_id
FROM employee
LEFT JOIN department
ON department.id = role.department_id
RIGHT JOIN role
ON employee.role_id = role.id
ORDER BY employee.id;

-- addDepartment
INSERT INTO department (department_name)
    VALUES (?)

-- addRole
-- ask for role, salary, and which department(list)
INSERT INTO role (role_title, role_salary, role_department_id)
    VALUES (?,?,?)

-- addEmployee
-- ask first, last, role(list),manager(list)
INSERT INTO employee (employee_first, employee_last, employee_role_id, employee_manager_id)
    VALUES (?,?,?,?)

-- updateEmpRole
--ask which employee(list), new role(list)
--employee name concatenated
UPDATE employee SET employee.role_id = ? WHERE id = ?
