const express = require("express");
const cors = require("cors");
require("dotenv").config();

const marketsRoutes = require("./routes/marketsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", marketsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Polymarket backend running on http://localhost:${PORT}`);
});