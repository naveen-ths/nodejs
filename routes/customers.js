var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM customer ORDER BY `id` DESC ', function (err, rows)
        {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('customers/index', {title: "Customers - Node.js", data: rows});


        });

        //console.log(query.sql);
    });

});

/**
 * function to load add customer page
 */
router.get('/add', function (req, res, next) {
    res.render('customers/add', {title: 'Add Customer'});
});

/**
 * function to save customer data
 */
router.post('/save', function (req, res) {
    var customerData = req.body;
    req.getConnection(function (err, connection) {
        var data = {
            name: customerData.name,
            address: customerData.address,
            email: customerData.email,
            phone: customerData.phone,
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        var query = connection.query("INSERT INTO customer set ? ", data, function (err, rows)
        {
            if (err)
                console.log("Error inserting : %s ", err);

            res.redirect('/customers');

        });

        // console.log(query.sql); get raw query

    });
});

router.get('/edit/:id', function (req, res, next) {
    var customer_id = req.params.id;
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM customer WHERE id = ? ', [customer_id], function (err, rows)
        {

            if (err)
                console.log("Error Selecting : %s ", err);
            
            res.render('customers/edit', {title: "Edit Customer", data: rows});
        });
        //console.log(query.sql);
    });
});

router.post('/update', function (req, res, next) {
    var customerData = req.body;
    
    req.getConnection(function (err, connection) {

        var data = {
            name: customerData.name,
            address: customerData.address,
            email: customerData.email,
            phone: customerData.phone,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        connection.query("UPDATE customer set ? WHERE id = ? ", [data, customerData.id], function (err, rows)
        {

            if (err)
                console.log("Error Updating : %s ", err);
            res.redirect(301, '/customers')
        });
    });
});

router.get('/delete/:id', function (req, res, next) {
    var customer_id = req.params.id;
    
    req.getConnection(function (err, connection) {
        connection.query("DELETE FROM customer  WHERE id = ? ",[customer_id], function(err, rows)
        {
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
     });
});

module.exports = router;
