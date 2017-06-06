const express = require('express')
const app = express()

app.set('view engine','ejs');

//opening home h2.html page using express
app.use(express.static(__dirname+'/public_static'))

var Datastore=require('nedb')
var db=new Datastore({filename:'store2.db',autoload:true})


app.get('/',function(req,res){
	res.render('new2')
})

app.get('/signupsubmit',function(req,res){
	var d={
		'name':req.query.firstname,
		'email':req.query.email,
		'password':req.query.pwd,
		'mobile':req.query.mobile
	}
db.insert(d,function(err,newdoc){
	console.log(newdoc)
	res.render('signup')
})
})

app.get('/loginsubmit',function(req,res){

	db.find({'name':req.query.name,'password':req.query.password},function(err,resu1){
		if(resu1.length>0){
			db.find({},function(err2,resu2){
			res.render('login',{result1:resu1.name,result2:resu2})
			//console.log(result)
			})	
		}else{
		res.render('new2')
		 }
	})

})

app.get('/search',function(req,res){
	db.find({'name':req.query.search},function(err,result){
		res.render('login',{results:result})
	})
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})






