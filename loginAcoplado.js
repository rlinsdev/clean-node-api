const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

module.exports = () => {
  router.post('/signup', new SignUpRouter().route)
}

class SignUpRouter {
  async route (req, res) {
    // ACOMPLAMENTO - PRESO AO FRAMEWORK - EXPRESS
    const { email, password, repeatPassword } = req.body
    if (password === repeatPassword) {
      // ACOPLAMENTO - VALIDAÇÃO DE NEGÓCIO
      const user = await AccountModel.create({ email, password }) // ACOPLAMENTO - ACOPLAMENTO DE ACESSO AO BANCO
      return res.json(user)
    }
    res
      .status(400)
      .json({ error: 'Password must be equal to repeat password' }) // ACOPLAMENTO - VALIDAÇÃO DE RETORNO
  }
}
