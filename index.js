const app = require('express')(); //Same as doing "const express = require('express') const app = express()" 
const configuration = require("./configuration.json") //Gathering configuration

//Test endpoint (EX: localhost/test?apikey=XYZ)
app.get("/test", async (req, res) => {
    const apiKey = req.params.apikey //API Key (?apikey=XYZ)
    if(configuration.apiKeys.enabled === true || configuration.apiKeys.enabled === "true") {
        if(apiKey) { //If they specified an API Key
            if(configuration.apiKeys.ApiKeys.includes(apiKey)) {
                //If they are using a Verified API Key
                return res.send("API Key correct - authorized")
            } else {
                //If they aren't
                return res.send("API Key incorrect - unauthorized")
            }
        } else {
            //No API Key specified
            return res.send("No API Key specified - unauthorized")
        }
    } else {
        //ApiKey required is falpse
        return res.send("API Key not required - authorized")
    }
})

//Default port 80 if not specified in config
let port = configuration.port || 80;

//Listening on {port}
app.listen(port, () => {
    console.log("Listening on port" + port)
})