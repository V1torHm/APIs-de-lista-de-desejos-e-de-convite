// listaDesejosService.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// Simulação de banco de dados em memória
let listas = {};

// Inserir item na lista
app.post("/lista/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  const { item } = req.body;

  if (!listas[idUsuario]) {
    listas[idUsuario] = [];
  }
  listas[idUsuario].push(item);

  res.status(201).json({ mensagem: "Item adicionado com sucesso!", lista: listas[idUsuario] });
});

// Remover item da lista
app.delete("/lista/:idUsuario/:idItem", (req, res) => {
  const { idUsuario, idItem } = req.params;

  if (!listas[idUsuario]) {
    return res.status(404).json({ mensagem: "Lista não encontrada" });
  }

  listas[idUsuario] = listas[idUsuario].filter((item, index) => index != idItem);

  res.json({ mensagem: "Item removido com sucesso!", lista: listas[idUsuario] });
});

// Mostrar itens da lista
app.get("/lista/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  res.json({ lista: listas[idUsuario] || [] });
});

app.listen(3001, () => console.log("Lista de Desejos Service rodando na porta 3001"));
