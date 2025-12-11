require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; 

app.use(cors()); 
app.use(express.json()); 

const aiRoutes = require('./routes/aiRoutes');
app.use('/api', aiRoutes);

app.get('/', (req, res) => {
    res.send('Back-end Culinária rodando com IA + Tradução Gemini na porta ' + port);
});

app.listen(port, () => {
    console.log(`Back-end rodando em http://localhost:${port}`);
});