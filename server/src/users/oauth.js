const { Router } = require("express");
const controller = require("./controller");
const dotenv = require('dotenv');
dotenv.config();
const fetch = require = ('node-fetch');
const {OAuth2Client} = require('google-auth-library');
const router = Router();


//how to get user information
async function getUserData(access_token){
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
    const data = await response.json();
    console.log('data: ', data);
}

const express = require('express');

router.get('/', async (req, res, next) => {
    const code = req.query.code;
    console.log('code:', code);

    try {
        const redirectUrl = 'http://127.0.0.1:3002/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );

        const tokensResponse = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(tokensResponse.tokens);

        console.log('tokens acquired');
        const user = oAuth2Client.credentials;
        console.log('credentials', user);

        // Assuming you have a function like getUserData that uses the access token
        await getUserData(user.access_token);

        // Respond to the client if needed
        res.send('Authentication successful!');
    } catch (error) {
        console.error('Error with signing in with Google:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
