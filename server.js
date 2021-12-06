const express = require ('express');
const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/bears_db', {useNewUrlParser: true});

const {BearModel} = require( './models/bearModel' );

const app = express ();

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname+ '/views');
app.set ('view engine', 'ejs');

app.use(express.urlencoded({extendend:true}) );

app.get ('/', function (request, response){
    BearModel
        .getBears()
        .then (data  => {
            response.render ('index', {bears:data});
        });
});

app.get ('/bears/new', function (request, response){
    response.render ('new');    
});

app.get ('/bears/:name', function (request, response){
    let id = request.params.name;
    BearModel
    .getBearbyId (id)
    .then (result  => {
        if (result === null){
            throw new Error("null");
        }
        response.render('bear', {found:true, bear:result});
    })
    .catch( err => {
        response.render('bear', {found:false});
    });
});

app.post ('/bears', function (request, response){
    const name= request.body.name;
    const location= request.body.location;
    const color= request.body.color;
    const description= request.body.description;

    const newBear = {
        name,
        location,
        color,
        description
    };

    BearModel
        .createBear(newBear)
        .then( result => {
            response.redirect('/');
       })
        .catch( err => {
            console.log("Something goes wrong!");
            console.log(err);
        });
    response.redirect('/');
});

app.get('/bears/edit/:name', function(request, response){
    var name = request.params.name;
    BearModel
    .getBearbyId (name)
    .then (result  => {
        if (result === null){
            throw new Error("null");
        }
        response.render('edit', {found:true, bear:result});
    })
    .catch( err => {
        response.render('edit', {found:false});
    });
});


app.post('/bears/:id', function( request, response){
    const bearToChange = request.params.id;

    const name= request.body.name;
    const location= request.body.location;
    const color= request.body.color;
    const description= request.body.description;

    const change={
        name,
        location,
        color,
        description
    }

    BearModel
        .updateBear(bearToChange, change)
        .then( result =>{
            console.log(result);
        })
        .catch( err =>{
            console.log(err);
        })
    response.redirect('/');
});

app.post ('/bears/destroy/:name', function (request, response){
    let id = request.params.name;
    console.log (id);
    console.log ("test test test test");
    BearModel
    .deleteBearById (id)
    .then( result => {
        console.log(result );
   })
    .catch( err => {
        console.log("Something went wrong!");
        console.log(err);
    });
response.redirect('/');
});

app.listen (8080, function (){
    console.log ("The user server is running on 8080")
});