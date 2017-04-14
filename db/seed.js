var mongoose  = require("./connection");
var seedData  = require("./seeds"); 

var Horse = mongoose.model("Horse");

console.log('GIRO:  in seed.js, about to do Horse.remove and Horse.collection.insert');
Horse.remove({}).then(function(){
  Horse.collection.insert(seedData).then(function(){
      console.log('GIRO:  in seed.js, inside insertthenfunction');
    process.exit();
  });
});
console.log('GIRO:  in seed.js, finished Horse.collection.insert');
