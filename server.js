require("dotenv").config();

const pool = require("./config/db");

const express = require("express");

const cors=require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/userRoutes");

const companyRoutes =require("./routes/companyRoutes");

const applicationRoutes =require("./routes/applicationRoutes");

const noteRoutes =require("./routes/noteRoutes");

const dashboardRoutes =require("./routes/dashboardRoutes");

const notFound =require("./middleware/notFound");

const errorHandler =require("./middleware/errorMiddleware");

app.use(userRoutes);

app.use(companyRoutes);

app.use(applicationRoutes);

app.use(noteRoutes);

app.use(dashboardRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT =process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server Running on ${PORT}`
    );
});