const {model,Schema} = require('mongoose');

const categorySchema=new Schema({
    name:String,
    createdAt:String,
});


module.exports=model('Category',categorySchema);
