const express = require( 'express' );
const router = express.Router();

const article = require( '../models/article');

/*
    Routes
    '/'             GET         | Displays all articles created, creates new article
    '/new'          GET         | Shows form to create article
    '/new'          POST        | Save newly created article to the databse
    '/:id'          GET         | Display specific article
    '/:id/edit'     GET         | Modify specific article
    '/:id/edit'     PUT         | Save changes made to specific article
    '/:id/delete    DELETE      | Delete specific article


*/

router.get( '/', (req, res) => {
    res.send( `Welcome ${req.user.username}`);
});

router.get( '/new', (req, res) => {
    res.render( 'blog/new', {article: new article()});
});

router.post( '/new', async (req, res, next) => {
    req.article = new article();
    next();
}, saveArticleAndRedirect( 'new' ));

router.get( '/:id', (req, res) => {
    res.send("An article will be displayed here");
});



// Functions
function saveArticleAndRedirect(path){
    return async (req, res) => {
        let article = req.article
        article.id = req.body.id;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        res.redirect(`/articles/${article.id}`);
        try{
            article = await article.save();
            
        } catch(e){
            res.render(`/articles/${path}`, {article: article});
        }
    }
}

module.exports = router;