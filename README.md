# Fabulist


## Deployed


## Built With


## Authors

* Jerridd Speidel
* Maiyer Thao
* Craig Christensen
* Joe Semlak
* Cristina Zhang



### **Requirements**
Users must have [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [MySQL](https://www.mysql.com/downloads/) and [Node.js](https://nodejs.org/en/download/) installed before completing these instructions.

### **Installing the app**

1) From git bash, Terminal or Command Prompt, clone this repository to a directory on your computer.  <br>
  ```git clone https://github.com/blahblahblah.git```
2) Change directory to the Fabulist directory.<br>
  ```cd Fabulist```
3) Initialize the app with a package.json file.<br>
  ```npm init```  
  Follow the command line instructions.  You can just accept all of the defaults.
4) Install the app.<br>
  ```npm install```
  This will create a node_modules folder and install all of the dependent modules.

Users will need to add a file name '.env' to the project folder. 
  Add this line to the file:

  ```MYSQL_PASSWORD=?????????```

  Replace the question marks with your MySQL password.

### **Setting up the MySQL database**

1) Log in to MySQL Workbench.  From the home screen, create a new connection by clicking the + symbol beside 'MySQL Connections'.  Name the connection 'fabulist_db'.

2) Click the new connection box to open it.  From the File menu, select 'Open SQL Script'.  Navigate to your project folder/db and select schema.sql.  Run the code to create the database and the tables.

3) Click File/Open SQL Script again, navigate to the project/db folder and select seeds.sql.  Run the code in seeds.sql to populate the table with seed data.


## Copyright

All code (C) Exhausted_Bootcampers;