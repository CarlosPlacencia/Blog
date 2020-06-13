let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "Please Login First");
        res.redirect( '/' );
    }
}

module.exports = middlewareObj;