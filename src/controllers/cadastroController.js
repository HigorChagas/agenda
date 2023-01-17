const Cadastro = require('../models/CadastroModel');
const Login = require('../models/CadastroModel');

exports.index = (req, res) => {
    res.render('cadastro');
};

exports.register = async (req, res) => {
    try {
        const cadastro = new Cadastro(req.body);
        await cadastro.register();

        if(cadastro.errors.length > 0) {
            req.flash('errors', cadastro.errors);
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
        await login.login;

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