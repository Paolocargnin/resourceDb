var express = require('express');
var router = express.Router();

var gimmeDb= function(){
	fs = require('fs');
	fs.readFile(__dirname+'/../public/json/people.json', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}

		return data;
	});
};

var gimmeRealImages = function(){
	fs = require('fs');
	var files_ = [],
		dir = __dirname+'/../public/images';
    if (typeof files_ === 'undefined') files_=[];
    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i],
        	printName='/images/'+files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name,files_);
        } else {
            files_.push(printName);
        }
    }
    return files_;
};
/* GET users listing. */
router.get('/', function(req, res) {
	res.json({enjoy:true});
});

/* GET users listing. */
router.get('/db/', function(req, res) {
	fs = require('fs');
	fs.readFile(__dirname+'/../public/json/people.json', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		
		res.json(data);
	});
});

/* GET users listing. */
router.post('/db/', function(req, res) {
	var objToSave =  {images:[]};

	req.body.images.forEach(function(i){
		objToSave.images.push({
			path:i.path,
			tags:i.tags
		})
	});

	console.log(objToSave);

	fs = require('fs');
	fs.writeFile(__dirname+'/../public/json/people.json', JSON.stringify(objToSave) , 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}		
	});
});

/* GET users listing. */
router.get('/images/', function(req, res) {
	res.json(gimmeRealImages());
});



module.exports = router;
