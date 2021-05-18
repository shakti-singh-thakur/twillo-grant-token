var express = require("express");
var app = express();



//READ Request Handlers
app.get('/grant-token', (req, res) => {
    const AccessToken = require('twilio').jwt.AccessToken;
    const ChatGrant = AccessToken.ChatGrant;

    // Used when generating any kind of tokens
    const twilioAccountSid = 'ACb7a8da0be56c06f08ea1d3c54f662980';
    const twilioApiKey = 'VLa90f8ecb218e1ae30bd25a911d562ff1';
    const twilioApiSecret = 'af95628db5d9e969e883e8a17976284d';

    // Used specifically for creating Chat tokens
    const serviceSid = 'VA0a14507c2e543af834698c2cf384cd87';
    const identity =  req.identity;

    // Create a "grant" which enables a client to use Chat as a given user,
    // on a given device
    const chatGrant = new ChatGrant({
    serviceSid: serviceSid,
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    {identity: identity}
    );

    token.addGrant(chatGrant);

    // Serialize the token to a JWT string
    console.log(token.toJwt());
    let grantToken = token.toJwt();
    res.send({"status":200,"token":grantToken});
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});