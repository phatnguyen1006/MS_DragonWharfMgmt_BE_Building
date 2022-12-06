const express = require('express');
const app = express(); 
const cors = require("cors");
const mongoDB = require("./configs/mongo.db");

require("dotenv").config();
const PORT = process.env.PORT || 8002;

mongoDB.connectDB();

const blockRouter = require("./routes/block.route");
const buildingRouter = require("./routes/building.route");
const insertRouter = require('./routes/insert.route');


app.use(express.json());
app.use(cors());

app.use('/block', blockRouter);
app.use('/insert', insertRouter);
app.use('/building', buildingRouter);

app.get('/', (req,res) => {
    return res.status(200).json({"msg": "Hello from Building"});
});


app.listen(PORT, () => {
    console.log(`Products is Listening to Port ${PORT}`);
});
