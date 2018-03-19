# Fabulist


## Deployed


## Built With
  - [Node.js](https://nodejs.org/en/download/)
  - [express](https://www.npmjs.com/package/express)
  - [express-handlebars](https://www.npmjs.com/package/express-handlebars)
  - [body-parser](https://www.npmjs.com/package/express)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [MySQL](https://www.mysql.com/downloads/)
  - [Sequelize](https://www.npmjs.com/package/sequelize)


## Authors

* [Jerridd Speidel](https://github.com/TowerGuy2909)
* [Maiyer Thao](https://github.com/jaethao)
* [Craig Christensen](https://github.com/ruffcorn33)
* [Joe Semlak](https://github.com/semlak)
* [Cristina Zhang](https://github.com/rami0141)



### **Requirements**
Users must have [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [MySQL](https://www.mysql.com/downloads/) and [Node.js](https://nodejs.org/en/download/) installed before completing these instructions.

### **Installing the app**

1) From git bash, Terminal or Command Prompt, clone this repository to a directory on your computer.

```
git clone https://github.com/rami0141/Fabulist

# change to the application direction
cd Fabulist

# install the required packages
npm install

```


Users will need to add a file name '.env' to the project folder.
Add these lines to the file:

```
MYSQL_PASSWORD=?????????
MYSQL_USERNAME=?????????

```

Replace the question marks with your MySQL password and username (without these variables, the app will still try to run with default user is root, and password as NULL)


### **Setting up the MySQL database**

1) Log in to MySQL Workbench.  From the home screen, create a new connection by clicking the + symbol beside 'MySQL Connections'.  Name the connection 'fabulist_db'.

2) Click the new connection box to open it.  From the File menu, select 'Open SQL Script'.  Navigate to your project folder/db and select schema.sql.  Run the code to create the database.  

<!-- 3) Click File/Open SQL Script again, navigate to the project/db folder and select seeds.sql.  Run the code in seeds.sql to populate the table with seed data. -->


## Copyright

All code (C) Exhausted_Bootcampers;