const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: ''},
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: ''},
    criadoEm: { type: Date, required: false, default: '' }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = function() {
    this.valida();
};

Contato.prototype.valida = function() {
    this.cleanUp();
    // Validar campos
    if(!validator.isEmail(this.body.email)) {
        this.errors.push('E-mail inválido');
    }

    if(this.body.password.length < 8 || this.body.password.length > 20) {
        this.errors.push('A senha precisa ter entre 8 e 20 caracteres.');
    }
}

Contato.prototype.cleanUp = function() {
    for(const key in this.body) {
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        email: this.body.email,
        password: this.body.password
    };
}

module.exports = Contato;