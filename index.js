// Importing modules
const express = require('express');
const path = require('path');
const db = require('./dbconn');
// Create an express app
const app = express();
// Create a router
const router = express.Router();
// Port
const port = 4000;
// Fetch data
router.get('^/$|/index.html', (req, res)=> {
    // Query
    const strQry = 
    `
    SELECT CONCAT(d.firstname, ' ', d.lastname) 'Doctor Fullname', d.dentistAge, 
    d.contactNumb, d.practiceNumb, CONCAT(p.firstname, ' ', p.lastname) 'Patient Fullname', 
    p.paymentMethods, p.medicalAid
    FROM dentists d
    INNER JOIN patients p
    ON d.id = p.dentistid;
    `;
    db.query(strQry, (err, data)=> {
        if(err) throw err;
        res.send(data);
    })
});

// express.json(): It a middleware
app.use(router, express.json(), express.urlencoded({
    extended: true
}));
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});
