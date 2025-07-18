import express from 'express'
import { generateBlogTitle, generateImage, gernerateArticle, removeImageBackground, removeImageObject, resumeReview } from '../controllers/aiController.js'
import auth from '../middlewares/auth.js'
import { upload } from '../config/multer.js'

const aiRouter = express.Router()

aiRouter.post('/gererate-article', auth, gernerateArticle )
aiRouter.post('/gererate-blog-title', auth, generateBlogTitle )
aiRouter.post('/generate-image', auth, generateImage )
aiRouter.post('/remove-image-background', upload.single('image'), auth, removeImageBackground )
aiRouter.post('/remove-image-object', upload.single('image'), auth, removeImageObject)
aiRouter.post('/resume-review', upload.single('resume'), auth, resumeReview)



export default aiRouter