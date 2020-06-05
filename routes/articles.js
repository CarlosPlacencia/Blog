const express = require( 'express' );
const router = express.Router();

/*
    Routes
    '/'             GET         | Displays all articles created, creates new article
    '/new'          GET         | Shows form to create article
    '/new'          POST        | Save newly created asrticle to the databse
    '/:id'          GET         | Display specific article
    '/:id/edit'     GET         | Modify specific article
    '/:id/edit'     PUT         | Save changes made to specific article
    '/:id/delete    DELETE      | Delete specific article


*/

router.get( '/', (req, res) => {
    
});

module.exports = router;