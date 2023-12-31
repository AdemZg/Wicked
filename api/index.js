const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const dbConnect = require('./config/dbConnect')
const { notFound, errorHandler } = require('./middlewares/error.handler')
const dotenv = require('dotenv').config()
const PORT =  4000
const authRoutes = require('./routes/auth.route.js')
const userRoutes = require('./routes/user.route.js')
const productRoutes = require('./routes/product.route.js')
const blogRoutes = require('./routes/blog.route.js')
const productCategoryRoutes = require('./routes/productCategory.route.js')
const blogCategoryRoutes = require('./routes/blogCategory.route.js')
const brandRoutes = require('./routes/brand.route.js')
const colorRoutes = require('./routes/color.route.js')
const couponRoutes = require('./routes/coupon.route.js')
const enqRoutes = require('./routes/enq.route.js')
const uploadRoutes = require('./routes/upload.route.js')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')

dbConnect()

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001','http://localhost:3002'],  credentials: true}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())


app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/brand', brandRoutes)
app.use('/api/color', colorRoutes)
app.use('/api/coupon', couponRoutes)
app.use('/api/product-category', productCategoryRoutes)
app.use('/api/blog-category', blogCategoryRoutes)
app.use('/api/enquiry', enqRoutes)
app.use('/api/upload', uploadRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('listening on port ', PORT)
})