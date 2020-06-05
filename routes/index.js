const express = require( 'express' );
const router = express.Router();

/* 
    Landig Page
    - Do something creative
    - Will provide a link to '/articles'
*/
router.get( '/', ( req, res ) => {
    res.send("Hello from Landing page");
} );


module.exports = router;