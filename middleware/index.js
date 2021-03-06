let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "Credentials Required");
        res.redirect( '/' );
    }
}

module.exports = middlewareObj;