const express = require( 'express' );
const router = express.Router();

const passport = require( 'passport');

const Article = require( '../models/article');
let User = require( '../models/user' );
const { findOne } = require('../models/article');

router.get( '/', async (req, res) => {
    let page = "Home";
    try{
        const articles = await Article.find().sort({createdAt: -1});
        if(req.user === undefined){
            res.render( 'blog/index', {articles: articles, currentUser: 'guest', page: page});
        } else {
            res.render( 'blog/index', {articles: articles, currentUser: req.user.username, page: page});
        }
    } catch {
        res.redirect('/');
    }
});

router.get( '/admin', ( req, res ) => {
    let currentUser = '';
    let page = "Admin";
    res.render( 'index', {currentUser, page: page});
} );

router.post( '/login', passport.authenticate( 'local', {
    successRedirect: '/',
    failureRedirect: '/admin'
}));



module.exports = router;