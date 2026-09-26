const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentroutes");

const app = express();

app.use(logger);
app.use(express.json());

app.use("/students", studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});