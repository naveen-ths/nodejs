var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('customers/index',{title:"Customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });

});

router.get('/add', function(req, res, next) {
  res.render('customers/add', { title: 'Add Customer' });
});

router.get('/edit/:customerId(\d+)', function(req, res, next) {
  console.log(req.params);
  res.render('customers/edit', { title: 'Edit Customer' });
});

router.get('/delete/:customerId(\d+)', function(req, res, next) {
  res.render('customers/delete', { title: 'Delete Customer' });
});

module.exports = router;
