const Login = require('../models/LoginModel');

exports.cadastro = (req, res) => {
    res.render('cadastro');
};

exports.index = (req, res) => {
    if(req.session.user) return res.render('index');
    return res.render('login');
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('index');
            });
            return
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(() => {
            return res.redirect('index');
        });
    } catch(e) {
        console.error(e);
        return res.render('404');
    }
}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('index');
            });
            return;
        }

        req.flash('success', 'Você entrou no sistema.');
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('index');
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
}

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('back');
}