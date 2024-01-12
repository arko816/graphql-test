const {model,Schema} = require('mongoose');

const recipeSchema=new Schema({
    name:String,
    description:String,
    createdAt:String,
});


module.exports=model('Product',recipeSchema);
