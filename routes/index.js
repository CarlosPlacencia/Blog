const express = require( 'express' );
const router = express.Router();

const passport = require( 'passport');

const Article = require( '../models/article');
let User = require( '../models/user' );
const { findOne } = require('../models/article');

router.get( '/', async (req, res) => {
    try{
        const articles = await Article.find().sort({createdAt: -1});
        if(req.user === undefined){
            res.render( 'blog/index', {articles: articles, currentUser: 'guest'});
        } else {
            res.render( 'blog/index', {articles: articles, currentUser: req.user.username});
        }
    } catch {
        res.redirect('/');
    }
});

router.get( '/admin', ( req, res ) => {
    let currentUser = '';
    res.render( 'index', {currentUser});
} );

router.post( '/login', passport.authenticate( 'local', {
    successRedirect: '/',
    failureRedirect: '/admin'
}));



module.exports = router;