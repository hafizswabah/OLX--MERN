import express from 'express'
import { signup,login,checkAuth,logout ,addProduct,getProduct,getCategories,getProducts} from '../controller/controller.js'
const Router=express.Router()
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()+".jpg"
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
const upload=multer({storage:storage})
Router.post('/signup',signup)
Router.post('/login',login)
Router.get("/check-auth",checkAuth)
Router.get("/logout",logout)

Router.post('/add-product', upload.single('image'), addProduct )
Router.get('/products', getProducts )

Router.get('/product/:id', getProduct )

Router.get("/categories", getCategories)
export default Router