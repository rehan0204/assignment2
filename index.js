const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentroutes");

const app = express();

app.use(logger);
app.use(express.json());

app.use("/students", studentRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});