const express = require("express");
const connectDB = require("./config/db");
const app = express();

//connect database
connectDB();
//Just testing if the express server is running.
app.get("/", (req, res) => res.send("API running"));

//We have to initilize the middleware for body parser
app.use(express.json({extended: false}))

//we will define our routes here
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
