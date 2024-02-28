const { Router } = require("express");
const controller = require("./controller");
const dotenv = require('dotenv');
dotenv.config();
const {OAuth2Client} = require('google-auth-library');

const router = Router();
router.get("/", controller.getUsers);
router.get("/:id", controller.getUsersById);
router.put("/:id", controller.changeUser);
//router.post("/", controller.createUser);

router.post('/', async (req, res, next) => {
    try {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  
      const redirectUrl = 'http://127.0.0.1:3002/oauth';
  
      const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
      );
  
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent',
      });
  
      // Log statements for debugging
      console.log('Generated authorizeUrl:', authorizeUrl);
  
      res.json({ url: authorizeUrl });
    } catch (error) {
      console.error('Error during POST /:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

router.post("/login", controller.loginUser);
router.delete("/:id", controller.deleteAccount);

module.exports = router;