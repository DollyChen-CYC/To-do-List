# To-do List
A To-do list App built with [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/).
* Features: Create, reade, edit and delete your todos.

## Installation and Execution
1.  Clone the files to your computer
```bash
git clone https://github.com/DollyChen-CYC/To-do-List.git
```
2. Init: install the npm packages
```bash
cd To-do-List
```
```
npm install
```
3. Run MongoDB Server
Open another terminal to run MongoDB
```bash
[~] $ cd ~/mongodb/bin/

```
```bash
[~/mongodb/bin] $ ./mongod --dbpath /Users/<your user name>/mongodb-data
```
4. Insert seeder
```bash
npm run seed
```
- While the terminal shows `mongoDB connected!` and `done`, MongoDB has connected and inserted seeder successfully.

5. Run the project
```bash
npm run dev
```
- While the terminal returns `Express app is running on the http://localhost:3000`, please open the browser and navigate to http://localhost:3000 
