const {Router} = require('express')
const User = require('../models/User')           //импортируем модель

const router = Router()

router.post('/registration', async (req, res) => {
  try {
      const { email, password } = req.body              //получаем с фронта(req - то, что мы получаем с фронта) емайл и пароль
      const userExist = await User.findOne({ email })   //находим юзера по емайлу
      if (userExist) {
        return res.status(300).json({message: 'Данный email уже используется'})  //статус редирект
      }
      const user = new User({ email, password });         //создаем нового юзера
      await user.save()                                     //сохраняем его в бд
      res.status(201).json({message: 'Пользователь создан'})
  } catch (error) {
    console.log(error)
  }
})

module.exports = router