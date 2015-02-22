var express = require('express');
var router = express.Router();
var db = require('orchestrate')("d8f53af2-1f9b-4144-8c7a-2bac7bff4418");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  // req.username, req.password
  var username = req.body.username;
  var password = req.body.password;
  
});

router.post('/create', function(req, res, next) {
	create(req,res);
});


router.post('/nearbyPackages', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	if(login(username,password)){

	}
}

function login(username,password){
   db.search('users','value.username: "'+username+'"')
   .then(function(results){
   		results.results.forEach(function(user){
   			if(user.value.password == password){
   				return true;
   			}else{
   				return false;
   			}
   		});
   })
   .fail(function(err){
   		return false;
   });
}

function create(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var username = req.body.username;
  var password = req.body.password;
  var phoneNumber = req.body.phoneNumber;
  var lat = req.body.lat;
  var lang = req.body.lang;
  var addressLine = req.body.addressLine;
  var postalCode = req.body.postalCode;
  var city = req.body.city;
  var province = req.body.province;
  
  db.post('users', {
	  "firstName": firstName,
	  "lastName": lastName,
	  "username": username,
	  "password": password,
	  "phoneNumber": phoneNumber,
	  "lat": lat,
	  "lang": lang,
	  "addressline": addressLine,
	  "postalCode": postalCode,
	  "city": city,
	  "province": province
  })
  .then(function (result) {
  	  res.json({
  	  	status:result.statusCode,
  	  	message:"User created successfully."
  	  });
   })
  .fail(function (err) {
  	  res.json({
  	  	status:err.statusCode,
  	  	message:"Unexpected error creating user, try again."
  	  });
   });
}


function findNearbyPackages(position,packages){
  var packageMap = new Map();
  //   var packages =  [
  //   {
  //   packageId : "fake pussy",
  //   packageInitiatedByUserName : "",
  //   packageRecievedByUserName : "",
  //   packageLat : 3000,
  //   packageLang : -6020,
  //   userDist : 0
  //   },
  //   {
  //   packageId : "fake pussy",
  //   packageInitiatedByUserName : "",
  //   packageRecievedByUserName : "",
  //   packageLat : 1,
  //   packageLang : -6,
  //   userDist : 0
  //   },
  //   {
  //   packageId : "fake pussy",
  //   packageInitiatedByUserName : "",
  //   packageRecievedByUserName : "",
  //   packageLat : 300,
  //   packageLang : -602,
  //   userDist : 0
  //   }
  // ];

  packageMap = new Map();
  for(var i = 0; i < packages.length; i++){
  	if(packages[i].packageRecievedByUserName.length == 0){
  		var distance = (Math.pow((packages[i].packageLat - position.lat), 2) + Math.pow((packages[i].packageLang - position.lang), 2));
    	packages[i].userDist = distance;
    	packageMap.sortedPut("userDist",packages[i]);
  	}
  }
  return packageMap;
}


function Map(obj){
  if(obj)
    this.entity = obj;
  else
    this.entity = new Array();
  this.keyInObj = "";
}
Map.prototype.getValue = function(key){
  for (var i in this.entity[0]){
    var temp = i.toUpperCase();
    if(temp.indexOf("ID") != -1){
       this.keyInObj = i;
       break;
    }
  }
  for(var i = 0; i < this.entity.length; i++){
    if((this.entity[i])[this.keyInObj] == key){
      return this.entity[i];
    }
  }
}
Map.prototype.put = function(key,value){
  if(this.keyInObj.length != 0){
    this.keyInObj = key;
  }
  this.entity[this.entity.length] = value;
}
Map.prototype.sortedPut = function(key,value){
  if(this.entity.length == 0){
    this.entity[0] = value;
  }
  else{
  for(var i = this.entity.length - 1; i >= 0 ; i--){
    if(((this.entity[i])[key]) < value[key]){
      this.entity.splice(i + 1, 0, value);
      break;
    } 
    else if(i == 0){
      this.entity.splice(0,0,value);
    }
  }
  }

}

module.exports = router;