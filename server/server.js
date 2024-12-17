const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", employeeRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
