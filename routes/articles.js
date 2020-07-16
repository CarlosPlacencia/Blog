const express = require( 'express' );
const router = express.Router();

const Article = require( '../models/article');
const middleware = require( '../middleware/index');
const middlewareObj = require('../middleware/index');

let User = require( '../models/user' );

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

/*
    Routes
    '/new'          GET         | Shows form to create article
    '/new'          POST        | Save newly created article to the databse
    '/:id'          GET         | Display specific article
    '/edit/:id'     GET         | Modify specific article
    '/edit/:id'     PUT         | Save changes made to specific article
    '/:id/delete    DELETE      | Delete specific article


*/

router.get( '/new', middlewareObj.isLoggedIn,(req, res) => {
    res.render( 'blog/new', {article: new Article(), currentUser: req.user.username});
});

router.post( '/new', middlewareObj.isLoggedIn, async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect( 'new' ));


router.get( '/:slug', async (req, res) => {
    let currentUser = '';
    if(req.isAuthenticated()){ currentUser = 'Admin'}
    
    const article = await Article.findOne({slug: req.params.slug});
    
    res.render( "blog/show", {article: article,  currentUser: currentUser} );
});

router.get( '/edit/:id', middlewareObj.isLoggedIn,async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render( 'blog/edit', {article: article, currentUser: req.user.username});
});

router.put( '/edit/:id', middlewareObj.isLoggedIn, async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next();
}, saveArticleAndRedirect( 'edit' ));

router.delete( '/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect( '/' );

})

// Functions
function saveArticleAndRedirect(path){
    return async (req, res) => {
        let article = req.article
        article.id = req.body.id;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        if(req.body.image != null && req.body.image !== ''){
            saveImage(article, req.body.image);
        }
        try{
            article = await article.save();
            res.redirect(`/articles/${article.slug}`);
            
        } catch(e){
            console.log(e);
            res.redirect(`/`);
        }
    }
}

function saveImage(article, imageEncoded){
    if(imageEncoded == null ) return;
    const image = JSON.parse(imageEncoded);
    if(image != null && imageMimeTypes.includes(image.type)){
        article.image = new Buffer.from(image.data, 'base64');
        article.imageType = image.type;
    }
}

module.exports = router;