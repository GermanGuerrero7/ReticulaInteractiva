module.exports = {
    ensureAuthenticated : function(req,res,next) {
    if(req.isAuthenticated()) {
    return next();
    }
    req.flash('error_msg' , 'Por favor inicia sesión para acceder a este recurso');
    res.redirect('/login');
    }
    }