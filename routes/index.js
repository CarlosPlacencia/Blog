const express = require( 'express' );
const router = express.Router();

const passport = require( 'passport');

let User = require( '../models/user' );

/* 
    Landig Page
    - Do something creative
    - Have Admin Login or Continue as a Guest 
    - Will redirect to the articles '/articles'
*/
router.get( '/', ( req, res ) => {
    res.render( 'index');
} );

router.post( '/login', passport.authenticate( 'local', {
    successRedirect: '/articles',
    failureRedirect: '/'
}));


// function RegisterGuestandAdmin(){
//     let admin = {
//         username: process.env.ADMIN_USERNAME,
//     }
//     let guest = {
//         username: process.env.GUEST_USERNAME
//     }

//     User.register(admin, process.env.ADMIN_PASSWORD);
//     User.register(guest, process.env.GUEST_PASSWORD);
// }

module.exports = router;