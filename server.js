const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/verificar-chave', (req, res) => {
    const { key } = req.body;

    // Lê o ficheiro chaves.json de forma segura
    fs.readFile('chaves.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ valido: false, mensagem: "Erro no servidor." });
        }

        try {
            const chaves = JSON.parse(data);
            if (chaves.includes(key)) {
                return res.json({ valido: true, mensagem: "Chave válida!" });
            } else {
                return res.status(403).json({ valido: false, mensagem: "Chave inválida ou expirada." });
            }
        } catch (e) {
            return res.status(500).json({ valido: false, mensagem: "Erro ao ler as chaves." });
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor a correr na porta 3000');
});
app.get('/', (req, res) => {
    res.send('API da Calculadora dos Pragados a funcionar!');
});