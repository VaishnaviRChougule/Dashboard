const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose = require ("mongoose");
const cors = require ("cors");
const dotenv = require ("dotenv");
const helmet = require ("helmet");
const morgan = require ("morgan");
const clientRoutes = require ("./routes/client.js");
const generalRoutes = require ("./routes/general.js");
const managementRoutes = require ("./routes/management.js");
const salesRoutes = require ("./routes/sales.js");

// data imports
const User = require("./models/User.js");
const Product = require("./models/Product.js");
const ProductStat = require("./models/ProductStat.js");
const Transaction = require("./models/Transaction.js");
const OverallStat = require("./models/OverallStat.js");
const AffiliateStat = require("./models/AffiliateStat.js");
const {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} = require("./data/index.js");
const { db } = require("./db.js");

// Configration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URL);

app.listen(PORT, ()=>{
  db()
    console.log(`Server is running on http://localhost:${PORT}`);

     /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
})
   

