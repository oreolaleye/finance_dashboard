import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import { kpis, products, transactions } from "./data/data.js";
import Transaction from "./models/Transaction.js";

// configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

// mongoose setup
const PORT = process.env.PORT || 9000;
const mongoURI = process.env.DB_CONNECTION;
mongoose
  .connect(mongoURI)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`It's alive!!! On port: ${PORT}`);
    });
    //  Add data one time only or as needed
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((err) =>
    console.log(`Failed to connect to MongoDB with error ${err}`)
  );
