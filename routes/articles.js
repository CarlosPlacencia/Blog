const express = require( 'express' );
const router = express.Router();

const Article = require( '../models/article');
const middleware = require( '../middleware/index');
const middlewareObj = require('../middleware/index');

let User = require( '../models/user' );

/*
    Routes
    '/'             GET         | Displays all articles created, creates new article
    '/new'          GET         | Shows form to create article
    '/new'          POST        | Save newly created article to the databse
    '/:id'          GET         | Display specific article
    '/edit/:id'     GET         | Modify specific article
    '/edit/:id'     PUT         | Save changes made to specific article
    '/:id/delete    DELETE      | Delete specific article


*/

router.get( '/', async (req, res) => {
    try{
        const articles = await Article.find();
        if(req.user === undefined){
            res.render( 'blog/index', {articles: articles, currentUser: 'guest'});
        } else {
            res.render( 'blog/index', {articles: articles, currentUser: req.user.username});
        }
    } catch {
        res.redirect('/');
    }
});

router.get( '/new', middlewareObj.isLoggedIn,(req, res) => {
    res.render( 'blog/new', {article: new Article()});
});

router.post( '/new', middlewareObj.isLoggedIn, async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect( 'new' ));


router.get( '/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    res.render( "blog/show", {article: article} );
});

router.get( '/edit/:id', middlewareObj.isLoggedIn,async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render( 'blog/edit', {article: article});
});

router.put( '/edit/:id', middlewareObj.isLoggedIn, async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next();
}, saveArticleAndRedirect( 'edit' ));

router.delete( '/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect( '/articles' );

})

// Functions
function saveArticleAndRedirect(path){
    return async (req, res) => {
        let article = req.article
        article.id = req.body.id;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        try{
            article = await article.save();
            res.redirect(`/articles/${article.slug}`);
            
        } catch(e){
            res.render(`/articles/${path}/${article.slug}`, {article: article});
        }
    }
}

module.exports = router;