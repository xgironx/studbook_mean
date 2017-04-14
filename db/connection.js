                        // #####################################
                        // 201704131111L   EL JUEVES   JAY GIRO
var mongoose  = require("mongoose");

console.log('GIRO:  in connection.js, right above var HorseSchema');
var HorseSchema = new mongoose.Schema(
  {
    id: Number,
    gender: String,
    name:  String,
    age: { type: Number, min: 0, max: 44 },
    color:    String,
    markings: String,
    birthplace: String,
    registry_tattoo:    String,
    link_to_pedigree_url: String,
    img_url: String,
    stallion_id: Number,
    stud_fee: Number,
    stakes_winner_progeny: Number,
    barren: { type: Boolean, default: false },
    num_foals: { type: Number, min: 0, max: 11 },
    in_foal_now: { type: Boolean, default: false },
    expected_foaling_date: { type: String },
    foaling_date: { type: String },
    broodmare_id: Number
  }
);

mongoose.model("Horse", HorseSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
}else{
    console.log('GIRO:  in connection.js, about to do mongoo.Promise thing');
                        // #####################################
                        // 201704141522L   EL VIERNES   JAY GIRO
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
