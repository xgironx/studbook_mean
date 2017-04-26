                                    // ################################
                                    // 201704171023L   EL LUNES   GIRO
                                    // ./connection.js
                                            // mongoose.model("Horse", HorseSchema);
                                    // > show dbs
                                            // compliment_express  0.078GB
                                            // jobboard            0.078GB
                                            // local               0.078GB
                                            // menuitems           0.078GB
                                            // scooter             0.078GB
                                            // studbook            0.078GB
                                    // > show collections;
                                            // system.indexes
                                            // horses
                                    // Horse.remove({}).then(function(){
                                    // Horse.collection.insert(seedData, function(err, result)
                                    // Horse.find().exec(function(err, docs) {
                                    // Horse.find().count(function(err, docs) {
                                    // Horse.find({name: 'Zenyatta'});
                                    // Horse.find().count();


var mongoose  = require("./connection");
var seedData  = require("./seeds");
var Horse = mongoose.model("Horse");        // var collection = db.collection('foods')
// var Horse = mongoose.model("HorseModel");        // GIRO:  BREAKS WEBPAGE UTTERLY
// var HorseModel = mongoose.model("HorseModel");        // var collection = db.collection('foods')

console.log('GIRO:  in seed.js, about to do Horse.remove and Horse.collection.insert');

Horse.collection.insert(seedData, function(err, result)
    // var horses = Horse.collection.insert(seedData, function(err, result)
    {
        Horse.find().count(function(err, docs) {
            console.log('GIRO:  COUNT OF HORSES:' );
    });
        Horse.find().exec(function(err, docs) {
            console.log('GIRO:  HERE COMES FIRST HORSE IN DB');
            console.log(docs[0]);
            console.log('GIRO:  HERE COMES LAST HORSE IN DB');
            console.log(docs[21]);
    });
        console.log('GIRO:  THIS WORKED:  Horse.collection.insert(seedData, function(err, result) ');
    });
    // process.exit();

        // GOOD-------------------------------------------- CLEARS DOCUMENTS FR COLLECTION, RETURN TO ZERO
// Horse.remove({}).then(function(){
//   Horse.collection.insert(seedData).then(function()
//      {
//          console.log('GIRO:  in seed.js, inside insertthenfunction');
//          process.exit();
//      });
// });

        // GOOD--------------------------------------------
// Horse.collection.insert(seedData);    //GIRO.  DID NOT ERROR.  DID SEED DATA, 44 HORSES.
// console.log('GIRO:  in seed.js, inside insertthenfunction');

        // GOOD--------------------------------------------
// Horse.collection.insert(seedData, function(err, result)
//      {
//         Horse.find({name: 'Zenyatta'});
//         console.log('THIS WORKED:  Horse.collection.insert(seedData, function(err, result) ');
//      });



// -------------------------------------------------------------------------------------------------
                    //         //   Horse.collection.insert(seedData).then(function(){
//         // horse.insert(seedData);
//         // db.horse.insert(seedData);
//         // db.horses.insert(seedData);
//         // Horse.insert(seedData);
//         //     // Horse.collection.insert(seedData).then(function(){
//         //   // db.Horse.collection.insert(seedData).then(function(){
//         // // Horse.collection.insert(seedData).then(function(){
//         //     // db.horse.insert(seedData).then(function(){
//         //     // Horse.collection.insert(seedData).then(function(){
//         // // Horse.insert(seedData).then(function(){
//         // Horse.collection.insert(seedData){
//         // function({Horse.collection.insert(seedData);        //SyntaxError: Unexpected token (
//         // // Horse.insert(seedData).then(function(){
//         // Horse.collection.insert(seedData);    //GIRO.  DID NOT ERROR.  DID SEED DATA, 44 HORSES.
//         //       console.log('GIRO:  in seed.js, inside insertthenfunction');
//             // process.exit();
// //         });
// // console.log('GIRO:  in seed.js, finished Horse.collection.insert');
//         // $ node db/seed.js
//         // GIRO:  in connection.js, right above var HorseSchema
//         // GIRO:  in connection.js, about to do mongoo.Promise thing
//         // GIRO:  in seed.js, about to do Horse.remove and Horse.collection.insert
//         // GIRO:  in seed.js, inside insertthenfunction
//         // GIRO:  in seed.js, finished Horse.collection.insert
//         // ^C
//         //   Mon Apr 17 10:05:28 ~/Dropbox/3/x/wdi/33/exercises/studbook (master *)
// var horses =         Horse.collection.insert(seedData, function(err, result)
//         {
//             Horse.find().exec(function(err, docs) {
//                 // Horse.find({name: 'Zenyatta'}).exec(function(err, docs) {
//                 // Horse.find({name: 'Zenyatta'}).toArray(function(err, docs) {
//                 // console.log('docs:' docs[0])    // console.log('docs:' docs[0]) ^^^^^^^ SyntaxError: missing ) after argument list
//                 console.log('GIRO:  HERE COMES FIRST HORSE IN DB');
//                 console.log(docs[0])
//                 console.log('GIRO:  HERE COMES LAST HORSE IN DB');
//                 console.log(docs[21])
//             });
//             console.log('GIRO:  THIS WORKED:  Horse.collection.insert(seedData, function(err, result) ');
//                 // db.close()
//                 // mongoose.close()
//                 // Horse.close()
//             // })
//         });
        // var collection = db.collection('foods')
        // collection.insert({name: 'taco', tasty: true}, function(err, result) {
        //   collection.find({name: 'taco'}).toArray(function(err, docs) {
        //     console.log(docs[0])
        //     db.close()
        //   })

                                        //           Mon Apr 17 11:36:56 ~/Dropbox/3/x/wdi/33/exercises/studbook (master *)
                                        // $ node db/seed.js
                                        // GIRO:  in connection.js, right above var HorseSchema
                                        // GIRO:  in connection.js, about to do mongoo.Promise thing
                                        // GIRO:  in seed.js, about to do Horse.remove and Horse.collection.insert
                                        // GIRO:  in seed.js, inside insertthenfunction
                                        // THIS WORKED:  Horse.collection.insert(seedData, function(err, result)
                                        // { _id: 58f4dfc75b9cd9595130696b,
                                        //   id: 22,
                                        //   gender: 'colt',
                                        //   name: 'jim-bob',
                                        //   color: 'bay',
                                        //   foaling_date: '25250525',
                                        //   markings: 'white sock left foreleg',
                                        //   birthplace: 'cackalacki',
                                        //   img_url: 'https://s-media-cache-ak0.pinimg.com/564x/bd/66/d5/bd66d5fcaaaee27f7f07356ef0d88dc2.jpg',
                                        //   stallion_id: 3,
                                        //   broodmare_id: 11,
                                        //   in_foal_now: false,
                                        //   barren: false }
                                        // { _id: 58f4dfc75b9cd95951306980,
                                        //   id: 1,
                                        //   gender: 'stallion',
                                        //   name: 'Temple City',
                                        //   age: 12,
                                        //   color: 'dkb/br',
                                        //   registry_tattoo: 'F12340',
                                        //   stud_fee: 15000,
                                        //   stakes_winner_progeny: 3,
                                        //   img_url: 'http://i.bloodhorse.com/sroimages//medium/0000136098_1.jpg',
                                        //   link_to_pedigree_url: 'http://www.pedigreequery.com/temple+city',
                                        //   in_foal_now: false,
                                        //   barren: false }
