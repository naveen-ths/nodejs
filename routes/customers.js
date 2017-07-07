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
            phone: customerData.phone

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

router.get('/edit/:customerId(\d+)', function (req, res, next) {
    console.log(req.params);
    res.render('customers/edit', {title: 'Edit Customer'});
});

router.get('/delete/:customerId(\d+)', function (req, res, next) {
    res.render('customers/delete', {title: 'Delete Customer'});
});

module.exports = router;
