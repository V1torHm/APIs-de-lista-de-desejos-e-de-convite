
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vitorhm.morais@gmail.com",   
    pass: "123456"             
  }
});


app.post("/conviteEmail", async (req, res) => {
  const { email, remetente, grupo } = req.body;

  try {
    let info = await transporter.sendMail({
      from: `"${remetente}" <vitorhm.morais@gmail.com>`,
      to: email,
      subject: "Convite para participar do Amigo Secreto ",
      text: `Olá! Você foi convidado para participar do Amigo Secreto no grupo: ${grupo}. 
             Acesse o sistema e confirme sua participação!`,
    });

    res.json({ mensagem: "Convite enviado com sucesso!", info });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao enviar convite", erro: error.message });
  }
});

app.listen(3002, () => console.log("Convite Service rodando na porta 3002"));
