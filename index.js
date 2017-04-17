var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var session = require("express-session");
var cmongo  = require("connect-mongo");
var request = require("request");
var qstring = require("qs");
var mongoose= require("./db/connection");

var app     = express();
var MongoSession = cmongo(session);
var env;

if(process.env.NODE_ENV !== "production"){
  var env = require("./env.json");
  process.env.session_secret = env.session_secret;
  process.env.t_callback_url = env.t_callback_url;
  process.env.t_consumer_key = env.t_consumer_key;
  process.env.t_consumer_secret = env.t_consumer_secret;
}

var Horse_mongooseModel = mongoose.model("Horse");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));
app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoSession({
    mongooseConnection: mongoose.connection
  })
}));
app.use(function(req, res, next){
  res.locals.current_user = (req.session.current_user || null);
  next();
});

app.get("/login/twitter", function(req, res){
  var postData = {
    url:    "https://api.twitter.com/oauth/request_token",
    oauth:  {
      callback:         process.env.t_callback_url,
      consumer_key:     process.env.t_consumer_key,
      consumer_secret:  process.env.t_consumer_secret
    }
  };
  request.post(postData, function(err, rawResponse){
    var response = qstring.parse(rawResponse.body);
    var querystring = qstring.stringify({
      oauth_token: response.oauth_token
    });
    req.session.temp_token  = response.oauth_token;
    req.session.temp_secret = response.oauth_token_secret;
    res.redirect("https://api.twitter.com/oauth/authenticate?" + querystring);
  });
});

app.get("/logout", function(req, res){
  req.session.destroy();
  res.redirect("/");
});

app.get("/login/twitter/callback", function(req, res){
  var querystring = qstring.parse(req.query);
  var postData = {
    url: "https://api.twitter.com/oauth/access_token",
    oauth: {
      consumer_key:     process.env.t_consumer_key,
      consumer_secret:  process.env.t_consumer_secret,
      token:            req.session.temp_token,
      token_secret:     req.session.temp_secret,
      verifier:         querystring.oauth_verifier
    }
  };
  request.post(postData, function(err, rawResponse){
    var response = qstring.parse(rawResponse.body);
    req.session.t_user_id           = response.user_id;
    req.session.t_screen_name       = response.screen_name;
    req.session.t_oauth_data        = {
      token:            response.oauth_token,
      token_secret:     response.oauth_token_secret,
      consumer_key:     process.env.t_consumer_key,
      consumer_secret:  process.env.t_consumer_secret
    };
    res.redirect("/login/twitter/refresh_user_data");
  });
});

app.get("/login/twitter/refresh_user_data", function(req, res){
  var apiRequestParameters = {
    url:    "https://api.twitter.com/1.1/users/show.json",
    json:   true,
    oauth:  req.session.t_oauth_data,
    qs:     {
      screen_name: req.session.t_screen_name
    }
  };
  request.get(apiRequestParameters, function(err, response){
    var horse_info  = {
      name:         response.body.name,
      screen_name:  response.body.screen_name,
      photo_url:    response.body.profile_image_url
    };
    var search_params   = {
      screen_name:  response.body.screen_name
    };
    Horse_mongooseModel.findOneAndUpdate(
      search_params, horse_info, {new: true}
    ).then(function(horse){
      if(horse){
        req.session.current_user = horse;
        res.redirect("/");
      }else{
        Horse_mongooseModel.create(horse_info).then(function(horse){
          req.session.current_user = horse;
          res.redirect("/");
        });
      }
    });
  });
})

app.get("/api/horses", function(req, res){
  Horse_mongooseModel.find({}).then(function(horses){
    res.json(horses);
  });
});

app.get("/api/horses/:name", function(req, res){
  Horse_mongooseModel.findOne(req.params).then(function(horse){
    res.json(horse);
  });
});

app.get("/user", function(req, res){
  res.json(req.session.current_user || {failure: true});
});

app.get("/user/destroy", function(req, res){
  if(req.session.current_user){
    Horse_mongooseModel.findOneAndRemove(req.session.current_user).then(function(){
      req.session.destroy();
      res.redirect("/");
    });
  }else{
    res.redirect("/");
  }
});

app.put("/api/horses/:name", function(req, res){
  if(req.session.current_user){
    Horse_mongooseModel.findOne(req.params).then(function(horse){
      if(horse._id !== req.session.current_user._id){
        res.json({failure: true});
      }else{
        Horse_mongooseModel.update(horse, req.body, {new: true}).then(function(horse){
          res.json(horse);
        });
      }
    });
  }else{
    res.json({failure: true});
  }
});

app.get("/*", function(req, res){
  res.render("layout-main", {layout: false});
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
