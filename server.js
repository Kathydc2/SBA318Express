// -----------------------[Require statements for server]
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//--------------------[Require data info]
const avengers = require("./Data/avengers"); 
const abilities = require("./Data/abilities");
const actors = require("./Data/actors");

// Set the view engine to use EJS
app.set('view engine', 'ejs');

// function for all the data
function joinAvengerData(avengers, abilities, actors) {
  return avengers.map(avenger => {
    const ability = abilities.find(item => item.avenger === avenger.avenger);
    const actor = actors.find(item => item.avenger === avenger.avenger);
    return {
      avenger: avenger.avenger,
      Name: avenger.name,
      abilities: ability ? ability.abilities : {},
      actor: actor ? actor.actor : {}
      };
  });
};

// Route handler for displaying avengers with their abilities and actors
app.get('/avengers/view', (req, res) => {
  const avengersWithDetails = joinAvengerData(avengers, abilities, actors);
  res.render('avengers', { avengersWithDetails });
});

// -------[Custom logger middleware]
const loggerMiddleware = (req, res, next) => {
  console.log('Logger middleware executed.');
  console.log(`Request received: ${req.method} ${req.url}`);
  
  next();
};

// -----------------------[Middleware for parsing JSON and URL-encoded data]
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//------------------------[Static files]
app.use(express.static('public'));

// -----------------------[Logger Middleware]
app.use(loggerMiddleware);

// -----------------------[Require statements for routes files]
const avengersRouter = require("./Routes/avengers");
const abilitiesRouter = require("./Routes/abilities");
const actorsRouter = require("./Routes/actors");

// -----------------------[use app to inialize new app express for the routes, we only need the routes info since inside the routes files they import the data]

app.use("/api/avengers", avengersRouter);
app.use("/api/abilities", abilitiesRouter);
app.use("/api/actors", actorsRouter);


// -----[customer Error Handling middeware]
app.use((err, req, res, next) => {
  console.log("Error handling middleware triggered:", err);
  console.error(err); // Log the error information for debugging

  // Check if the error has a status code, default to 500 if not provided
  const statusCode = err.status || 500;

  // will display this message if one is not provided
  const errorMessage = err.message || "Something Broke!";
 
  // Send the JSON response with the appropriate status code and error message
  res.status(statusCode).json({ error: errorMessage });
});

// --------------------------------[Port]
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
  });