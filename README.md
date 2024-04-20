Objectives:
Create a server application with Node and Express.
Create a RESTful API using Express.
Create Express middleware.
Use Express middleware.
Use a template engine to render views with Express.
Interact with a self-made API through HTML forms.

I created my first node and express server. I organized my routes into one folder called "Routes". This routes folder holds all my routes for each file that include: actors.js,abilities.js and avenger.js. I then separated my data files into one folder called "Data". It holds 3 files
that are : actors.js, abilities.js and avengers.js. I add the node_modules into a file called .gitignore. The template engine I used was ejs. I created a folder called "Views" that would hold my "avengers.ejs" file. In that file I put how I wanted my file to be organized
when its in view. Making sure to also add my "styles.css" file as a link. I made another folder called "Public" which would hold my "styles.css" file. That is where I styled my server. 
My main file is called "server.js". I added all my imports for the data files and routes. I also added my view engine , ejs and made a function to call all the data for the information I wanted to show on my views. I created two custom middlewares. One is a logger that logs everytime
a req,res or next is executed. Another middleware I created was a customer error handler. I tested every route,error handler and logger to ensure it works. I used postman to check my routes for each data file. This project was challenging but also fun to do. It pushed me 
to research and find answers. I committed a few times along the way. Overall, I am pleased with the outcome. 
