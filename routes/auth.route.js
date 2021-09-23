const {Router} = require('express')
const User = require('../models/User')           //импортируем модель
const {check, validationResult} = require('express-validator')     //подключаем валидацию
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')


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

      const hashedPassword = await bcrypt.hash(password, 12)  //хэшируем пароль

      const user = new User({ email, password: hashedPassword });   //создаем нового юзера
      await user.save()                                     //сохраняем его в бд
      res.status(201).json({message: 'Пользователь создан'})



  } catch (error) {
    console.log(error)
  }
})

router.post("/login",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Неправильный пароль").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
              return res.status(400).json({

          errors: errors.array(),
          message: "Введены некоректные данные",
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({email})    //находим юзера по емайлу в бд

      if(!user) {                                  //если такого юзера нет, возвращаем джейсон с ответом
        return res.status(400).json({
          message: 'Такого пользователя не существует'})
      }

      const isMatch = bcrypt.compare(password, user.password)   //методом библиотеки bcrypt - compare, сравниваем пришедший с клиента пароль с паролем, сохраненным в бд
      if(!isMatch) {                                            //если не совпадают - возвращаем ошибку
        return res.status(400).json({
          message: 'Неправильный пароль'
        })
      }

      const jwtSecret = 'thcrk96wklmv678Z3WD6KOULL90v1'

      const token = jwtToken.sign(
        {userId: user.id},            //данные, которые мы зашифровали в токене
        jwtSecret,                     //секретная строка
        {expiresIn: '1h'}              //срок действия токена
      )

      res.json({token, userId: user.id})     //возвращаем данные на фронт

    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router