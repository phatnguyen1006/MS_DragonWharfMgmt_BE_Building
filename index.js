const express = require('express');
const app = express(); 
const mongoDB = require("./configs/mongo.db");

require("dotenv").config();
const PORT = process.env.PORT || 8002;

mongoDB.connectDB();

const insertRouter = require("./routes/insert.route");

app.use(express.json());

app.use('/insert', insertRouter);

app.use('/', (req,res) => {

    console.log("Body", req.body);

    return res.status(200).json({"msg": "Hello from Products"});
});


app.listen(PORT, () => {
    console.log(`Products is Listening to Port ${PORT}`);
});