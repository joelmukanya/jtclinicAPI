// Importing modules
const express = require('express');
const path = require('path');
const db = require('./dbconn');
// const bodyparser = require('body-parse');
//
// app.use(bodyparser.json());
// Create an express app
const app = express();
// Create a router
const router = express.Router();
// Port
const port = process.env.port || 4000;
// Fetch data
router.get('^/$|/clinic', (req, res)=> {
    // Query
    const strQry = 
    `
    SELECT d.id, CONCAT(d.firstname, ' ', d.lastname) 'Doctor Fullname', d.dentistAge, 
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

// Fetch one record
router.get('/clinic/:id', (req, res)=> {
    // Query
    const strQry = 
    `
    SELECT d.id, CONCAT(d.firstname, ' ', d.lastname) 'Doctor Fullname', d.dentistAge, 
    d.contactNumb, d.practiceNumb
    FROM dentists d
    WHERE d.id = ?;
    `;
    db.query(strQry,[req.params.id], (err, data)=> {
        if(err) throw err;
        res.send(data);
    })
});

//Post
// Add a new record
router.post('/clinic', (req, res)=> {
    // Query
    const strQry = 
    `
    INSERT INTO dentists
    VALUES(?, ?, ?);
    `;
    db.query(strQry,[req.params.id], (err, data)=> {
        if(err) throw err;
        res.send(data);
    })
});

//Delete a record
router.delete('/clinic', (req, res)=> {
    // Query
    const strQry = 
    `
    DELETE FROM dentists 
    WHERE id = ?;
    `;
    db.query(strQry,[req.params.id], (err, data, fields)=> {
        if(err) throw err;
        res.send('A row was affected');
    })
});


// express.json(): It a middleware
app.use(router, express.json(), express.urlencoded({
    extended: true
}));
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});
