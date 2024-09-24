const cors = require('cors')
const express = require('express')
const app = express()
const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'trello'
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err)
        }
        db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hash],
            (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send("Values Inserted")
                }
            }
        )
    })
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        const token = jwt.sign({ id: result[0].id, username: result[0].username }, 'jwtkey', {
                            expiresIn: "1h"
                        })
                        res.send({ message: 'Login Successful', token: token })
                    } else {
                        res.send({ message: 'Wrong Username or Password' })
                    }
                })
            } else {
                res.send({ message: 'Wrong Username or Password' })
            }
        }
    )
})