const express = require('express');
const app = express();
const http = require('http');
const PORT = 3000;

const produtos = [
    { id: 1, nome: 'Camiseta', categoria: 'roupas', cor: 'azul' },
    { id: 2, nome: 'Calça Jeans', categoria: 'roupas', cor: 'preto' },
    { id: 3, nome: 'Tênis Esportivo', categoria: 'calçados', cor: 'branco' },
    { id: 4, nome: 'Jaqueta', categoria: 'roupas', cor: 'vermelho' }
];

app.get('/', (req, res) => {
    res.send('Bem-vindo à API da Loja de Roupas!<br> Av2 - Desenvolvimento em Nuvem - UNIFOR');
});

app.get('/produtos', (req, res) => {
    const categoria = req.query["categoria"];
    const cor = req.query["cor"];

    let produtosFiltrados = produtos;

    if (categoria) {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.categoria === categoria);
    }

    if (cor) {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.cor === cor);
    }

    res.json(produtosFiltrados);
});

app.get('/produtos/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === produtoId);

    if (produto) {
        res.json(produto);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})