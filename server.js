// -----------------------[Require statements]
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000

// -----------------------[Require statements for middleware and routes files]

const avengersRouter = require("./routes/avengers");
const abilitiesRouter = require("./routes/abilities");
const actorsRouter = require("./routes/actors");
const bodyParser = require("body-parser");


// -----------------------[Middleware]
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



// -----------------------[use app to inialize new app express for the routes, we only need the routes info since inside the routes files they import the data]

app.use("/api/avengers", avengersRouter);
app.use("/api/abilities", abilitiesRouter);
app.use("/api/actors", actorsRouter);

// Error Handling 
// app.use((err, req, res, next) => {
//   console.error(err); // Log the error information for debugging
//   res.status(err.status).send({
//     error: {
//       status: err.status,
//       message: err.message,
//     },
//   });
// });

app.use((err, req, res, next) => {
  console.log("Error handling middleware triggered!");
  console.error(err); // Log the error information for debugging
  res.status(err.status).send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});



// --------------------------------[Port]


app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
  });