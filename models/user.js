var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// to hash passwords.
var bcrypt = require('bcrypt-nodejs');


//Create a blueprint of a user model.
var userSchema = new Schema({

    email: {type: String , required: true},
    password: {type: String, required: true}

});

// Method to encrypt password , i.e produce a corresponding hashed password for actual password. 
userSchema.methods.encryptPassword = function(password){

    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}; 

// Method to validate client sent password with server stored password.
userSchema.methods.validPassword = function(password) {

    return bcrypt.compareSync(password, this.password);
};


module.exports =mongoose.model('User', userSchema);
