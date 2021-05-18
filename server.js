var express = require("express");
const { check, validationResult } = require('express-validator');
var app = express();

//Express Methods
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//READ Request Handlers
app.post('/grant_token', [
    check('room').exists(),
    check('username').exists(),
], (req, res,next) => {
        try{      
            validationResult(req).throw();      
            const AccessToken   = require('twilio').jwt.AccessToken;
            const ChatGrant     = AccessToken.ChatGrant;
            const VideoGrant    = AccessToken.VideoGrant;
            // Used when generating any kind of tokens
             const twilioAccountSid = 'AC7212e3ea5d4204d27e2a782fd05950e5';
            const twilioApiKey      = 'SK18233076d87af15cacbd81bafffc9dc6';
            const twilioApiSecret   = '6jX9cNLTBwkDUpeRVmreat5uxVCfm2Ry';
            const serviceSid        = 'IS43d6dbe9027e4f8390354d306f6f4ada';  // Used specifically for creating Chat tokens
            const identity          =  req.body.username;
        
            // Create a "grant" which enables a client to use Chat and video as a given user,
            // on a given device
            const chatGrant = new ChatGrant({serviceSid: serviceSid});
            const videoGrant = new VideoGrant({room:req.body.room})
            // Create an access token which we will sign and return to the client,
            // containing the grant we just created
            const token = new AccessToken(
            twilioAccountSid,
            twilioApiKey,
            twilioApiSecret,
            {identity: identity}
            );
        
            token.addGrant(chatGrant);
            token.addGrant(videoGrant);
            // Serialize the token to a JWT string
            let grantToken = token.toJwt();
            res.send({"status":200,"token":grantToken});
        }
        catch(err)
        {
            res.send(err);
        }
});
const port = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, function() {
    console.log(`Server listening on port ${port}`);
});