INSERT INTO department(name) VALUES
("Sales"),             
("Production"),         
("Accounting"),         
("Human Resources"),    
("Customer Service");   

INSERT INTO role(title, salary, department_id) VALUES
("Sales Associate", 36000, 1),             
("Sales Lead", 60000, 1),                  
("Production - Floor", 30000, 2),          
("Production - Floor Manager", 60000, 2),  
("Accountant", 40000, 3),                   
("HR Representative", 20000, 4),           
("Customer Service Rep", 40000, 5);        

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
("John", "Doe", 1, 3),           
("Jane", "Doe", 1, 3),           
("Jojo", "Doe", 2, NULL),        
("Brian", "Mann", 3, 6),         
("Boris", "Han",3,6),
("Brie", 'Sui', 4, NULL),          
("George", "Table", 5,NULL),       
("Georgina", "Chair", 6 ,NULL),     
("Chloe", "Carniverious", 7 ,NULL), 
("Carlos", "Can", 7,NULL);         