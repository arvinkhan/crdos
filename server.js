const express = require("express");
const path = require("path");

const logger = require("./backend/utils/logger");
const resultRoutes = require("./backend/routes/resultRoutes");
const weatherRoutes = require("./backend/routes/weatherRoutes");

const app = express();

app.get("/stats", (req, res) => res.json(logger.getStats()));
app.get("/logs", (req, res) => res.json(logger.getLogs()));

app.use("/api/result", resultRoutes);
app.use("/api/weather", weatherRoutes);

app.use("/result", express.static(path.join(__dirname, "frontend/result-app/dist")));
app.use("/weather", express.static(path.join(__dirname, "frontend/weather-app/dist")));
app.use("/admin", express.static(path.join(__dirname, "dashboard")));

app.get("/", (req,res) => res.redirect("/result"));

app.listen(3000, () => {
    console.log("CRDAS Central API Gateway running on port 3000");
});