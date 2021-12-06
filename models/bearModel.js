const mongoose = require ('mongoose');

const BearSchema = new mongoose.Schema({
    name: String,
    location: String,
    color: String,
    description: String
});

const Bear = mongoose.model ('bears', BearSchema);

const BearModel={

    createBear: function(newBear){
        return Bear.create(newBear);
    },

    getBears:function(){
        return Bear.find();
    },

    getBearbyId: function (name){
        return Bear.findOne({name:name})
    },

    deleteBearById: function( name ){
        return Bear.remove( {name:name} );
    },

    updateBear: function( id, toUpdate ){
        return Bear.findOneAndUpdate( {id}, {$set : toUpdate }, {new : true} )
    }
};

module.exports = {BearModel};