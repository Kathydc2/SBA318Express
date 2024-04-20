// -----------------------[Require statements]
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000


// -------[Custom logger middleware]
const loggerMiddleware = (req, res, next) => {
  console.log('Logger middleware executed.');
  console.log(`Request received: ${req.method} ${req.url}`);
  
  next();
};

app.use(loggerMiddleware);

// -----------------------[Require statements for middleware and routes files]

const avengersRouter = require("./routes/avengers");
const abilitiesRouter = require("./routes/abilities");
const actorsRouter = require("./routes/actors");
const bodyParser = require("body-parser");


// -----------------------[Middleware for parsing JSON and URL-encoded data]
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


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