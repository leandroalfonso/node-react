const express = require('express')
const cors = require('cors')
const mysql2 = require('mysql2/promise')


const app = express()
app.use(cors())
app.use(express.json())



const db = mysql2.createPool({
    host: 'sql.freedb.tech',    
    password:'4jvEN!EyQ3TJ3k&',
    user: 'freedb_leandro_bd3',
    database: 'freedb_leiloes'
})




app.post('/upload', async (req, res) => {
    const { nome, descricao, imagem } = req.body
  

    await db.execute('INSERT INTO lailao (nome, descricao,url_imagem) VALUES (?,?,?)', [nome, descricao, imagem])

    res.send('Imagem enviada com sucesso')
})

// Endpoint para obter dados
app.get('/dados', async (req, res) => {
    const [rows, fields] = await db.execute('SELECT * FROM lailao')
    res.send(rows)
})



app.listen(3003, () => console.log('Server started'))
