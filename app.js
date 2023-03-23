const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const https = require('https');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static("public"));


app.get('/', function(req, res) {
   res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]  
    }

    const JSONData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/d1c530a14a";
    const option = {
        method: "POST",
        auth: "Rutuja1234:651203ad40e1ae2af02a37a42b528714-us21"
    }

    var sendFile = "";

    const request = https.request(url, option, function(response) {

        console.log(response);

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");                      
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    // request.write(JSONData);
    request.end();
})



app.listen('3000', function() {
    console.log("Server running at port 3000");
});




//651203ad40e1ae2af02a37a42b528714-us21
// audiance-id: d1c530a14a

