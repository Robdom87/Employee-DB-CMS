INSERT INTO department(name) VALUES
("Sales"),              --1
("Production"),         --2
("Accounting"),         --3
("Human Resources"),    --4
("Customer Service");   --5

INSERT INTO role(title, salary, department_id) VALUES
("Sales Associate", 36000, 1),             --1
("Sales Lead", 60000, 1),                  --2
("Production - Floor", 30000, 2),          --3
("Production - Floor Manager", 60000, 2),  --4
("Accountant", 40000, 3),                  --5  
("HR Representative", 20000, 4),           --6
("Customer Service Rep", 40000, 5);        --7

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
("John", "Doe", 1, 3),           --1  
("Jane", "Doe", 1, 3),           --2
("Jojo", "Doe", 2, ),           --3
("Brian", "Mann", 3, 6),         --4
("Brianna", "Wuhan", 3, 6),      --5
("B", "Swizzle", 4, ),          --6
("George", "Table", 5, ),       --7
("Georgina", "Chair", 6, ),     --8
("Chloe", "Carniverious", 7, ), --9
("Carlos", "Can", 7, );         --10