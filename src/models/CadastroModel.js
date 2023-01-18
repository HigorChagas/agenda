const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const CadastroSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true}
});

const CadastroModel = mongoose.model('Cadastro', CadastroSchema);

class Cadastro {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    valida() {
        this.cleanUp();
        // Validar campos
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido');
        }

        if(this.body.password.length < 8 || this.body.password.length > 20) {
            this.errors.push('A senha precisa ter entre 8 e 20 caracteres.');
        }
    }

    cleanUp() {
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

    async register() {
        this.valida();
        if(this.errors.length > 0) return;

        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
       
        this.user = await CadastroModel.create(this.body);
        
    }

    async userExists() {
       const user = await CadastroModel.findOne({ email: this.body.email });
       if(user) this.errors.push('Usuário já existe.');
    }
}

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await CadastroModel.findOne({ email: this.body.email });
        console.log(CadastroModel.findOne({ email: this.body.email }));

        if(!this.user) {
            this.errors.push('Usuário não existe.');
            return;
        };

        // if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
        //     this.errors.push('Senha inválida');
        //     this.user = null;
        //     return;
        // }
    }

    valida() {
        this.cleanUp();
        // Validar campos
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido');
        }

        if(this.body.password.length < 8 || this.body.password.length > 20) {
            this.errors.push('A senha precisa ter entre 8 e 20 caracteres.');
        }
    }

    cleanUp() {
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

    async register() {
        this.valida();
        if(this.errors.length > 0) return;

        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
       
        this.user = await CadastroModel.create(this.body);
    }

    async userExists() {
       this.user = await CadastroModel.findOne({ email: this.body.email });
       if(this.user) this.errors.push('Usuário já existe.');
    }
}

module.exports = Cadastro;
module.exports = Login;