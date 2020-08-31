const express = require ('express');
const app = express ();
const path = require ('path');
const nodemon = require ('nodemon');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const Joi = require('joi');

/*Mongo DB*/
const MongoClient = require ('mongodb').MongoClient;
const url = "mongodb+srv://uade-clase-36:9nyyH9W87Aezw5qD@cluster0.pv3xb.mongodb.net/"

/*Setting*/
const port = 3000;
const publicDirectory= path.join(__dirname, '../public/');

app.use(express.static(publicDirectory));
app.use(express.json());

app.post ('/', (req, res) => {
    
    console.log ("Entro la request");
    let nombre = req.body.nombreFormulario;
    let apellido = req.body.apellidoFormulario;
    let email = req.body.emailFormulario;
    console.log (email);

    /*Validacion back-end*/
    const esquema = Joi.object().keys(
        {
            email: Joi.string().trim().email().required,
            nombre: Joi.string().min(3).max(25).required,
            apellido: Joi.string().min(3).max(25).required,
        }
    );

    const resultado = esquema.validate (req.body);
    
    /*Nodemailer*/
    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "2f81e9a69ae537",
            pass: "03a129e58adeb2"
        }
        });
    
    let mailOptions = {
        from: '951165034a-7b842e@inbox.mailtrap.io',
        to: email,
        subject: 'Prueba',
        text: "Gracias!"
      };

      transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      let msg = "Correo enviado correctamente a: " + email;
      res.send(msg);

      /*MongoDB*/
      MongoClient.connect (url, {useNewUrlParser: true, useUnifiedTopology: true },(err, db) => {
            if (err) throw err;
            dbo = db.db ("uade-clase-36");
            let usuario = {name: nombre, last_name: apellido, e_mail: email};
            dbo.collection("prueba_emilio").insertOne(usuario, (err, res) => {
               if (err) throw err;
               console.log (usuario);
               db.close;
            });
            
        });



});



app.listen (port, () => {
    console.log ("Conectado!");
});