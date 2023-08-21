module.exports = (req, res, next) => {
    const success = req.flash('success');
    const error = req.flash('error');
    const user = req.session.user;

    
}