const express = require("express");
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");

const pool = require('./db');

// Using the ejs (Embedded JavaScript templates) as our template engine

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// Simple routing to the index.ejs file
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/scan", async (req, res) => {
    const phone = req.body.phone;

   
    // If the input is null return "Empty Data" error
    if (phone.length === 0) res.send("Empty Data!");
    
    // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
    // It shall be returned as a png image format
    // In case of an error, it will save the error inside the "err" variable and display it
    
    qr.toDataURL(phone, (err, src) => {
        if (err) res.send("Error occured");
      
        // Let us return the QR code image as our response and set it to be the source used in the webpage
        res.render("scan", { src });
    });

    /* const newTermin = await pool.query("INSERT INTO termins (phone) VALUES($1) RETURNING *", [phone]);
        res.json(newTermin.rows[0])*/
        try {
        const newTermin = await pool.query("INSERT INTO termins (phone) VALUES($1) RETURNING *", [phone]);
        res.json(newTermin.rows[0])
    } catch (err) {
        console.error(err.message);
    }
});

//MiddleWare
app.put('/termins', async (req, res) => {
    const phone = req.body.phone;
    
})


//get all termin emails and phones
app.get('/termins', async (req, res) => {
     try {
        const allTermins = await pool.query("SELECT * FROM termins");
        res.json(allTermins.rows);
    }
    catch (err) { console.error(err.message) }
})

// Setting up the port for listening requests
const port = 5000;
app.listen(port, () => console.log("Server is running at 5000"));