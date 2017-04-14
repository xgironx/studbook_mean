                        // #####################################
                        // 201704131111L   EL JUEVES   JAY GIRO
var mongoose  = require("mongoose");

console.log('GIRO:  in connection.js, right above var HorseSchema');
var HorseSchema = new mongoose.Schema(
  {
    gender: String,
    name:  String  }
);

mongoose.model("Horse", HorseSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
}else{
    console.log('GIRO:  in connection.js, about to do mongoo.Promise thing');
                        // #####################################
                        // 201704131111L   EL JUEVES   JAY GIRO
                        // https://github.com/Automattic/mongoose/issues/4291
                        // Thu Apr 13 12:25:09 ~/Dropbox/3/x/wdi/exercises/whenpresident (master *)
                        // $ npm list mongoose
                        // whenpresident@1.0.0 /Users/justingiron/Dropbox/3/x/wdi/exercises/whenpresident
                        // └── mongoose@4.9.4
    mongoose.Promise = global.Promise
                        // #####################################
  mongoose.connect("mongodb://localhost/studbook");
}

module.exports = mongoose;
