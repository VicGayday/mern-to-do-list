const {Router} = require('express')
const User = require('../models/User')           //импортируем модель
const {check, validationResult} = require('express-validator')     //подключаем валидацию

const router = Router()

router.post('/registration',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Пароль должен содержать не менее 6 символов').isLength({min: 6})
  ],
  async (req, res) => {
  try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {                     //проверяем, что результат валидации на ошибки - не пустой
          return res.status(400).json({              //если да - возвращаем джейсон
            errors: errors.array(),                  //с массивом ошибок
            message: "Введены некоректные данные"    //и текстом
          })
        }
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