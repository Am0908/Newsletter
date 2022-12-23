//jshint esversion: 6

const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https =  require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req, res){
res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){

    const firstname = req.body.fname;
    const lastname  = req.body.lname;
    const email = req.body.email;
    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstname,
            LNAME: lastname
          }

        }
      ]
    };

    const jsonData =  JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/84022cdd32"

    const options = {
      method: "POST",
      auth: "amrita1:b84ac0be49f68dfc1d500af83dcd3287-us20"
    }

    const request = https.request(url, options, function(response){

      if(response.statusCode ==200)
        {
          res.sendFile(__dirname + "/success.html");
        }
        else{
          res.sendFile(__dirname + "/failure.html");
        }

        console.log(response.statusCode);

        // response.on("data", function(data){
        //   console.log(JSON.parse(data));
        // })
    })

    request.write(jsonData);
    request.end();

})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
})


// TO UPDATE :
// You need to perform:
//
// git add .
// git commit -m "updated the header and footer"
// git push heroku master
