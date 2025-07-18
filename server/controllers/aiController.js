
import OpenAI from "openai";
import sql from "../config/db.js";
import 'dotenv/config';
import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from 'cloudinary'
import axios from "axios";
import FormData from 'form-data';
import fs from 'fs';
import pdf from "pdf-parse/lib/pdf-parse.js";


const Ai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const gernerateArticle = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { prompt, length } = req.body
        const plan = req.plan
        const free_usage = req.free_usage

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: 'You have reached your free usage limit, Upgrade to premium plan to continue' })
        }


        const response = await Ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
        });

        const { content } = response.choices[0].message;

        if (!content) {
            return res.json({
                success: false,
                message: "AI did not return a valid response.",
            });
        }

        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article');`

        if (plan !== 'premium') {
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })

        }

        res.json({ success: true, content })


    } catch (error) {
        console.log('last', error.message)
        res.json({ success: false, message: error.message })
    }
}


export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { prompt } = req.body
        const plan = req.plan
        const free_usage = req.free_usage

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: 'You have reached your free usage limit, Upgrade to premium plan to continue' })
        }


        const response = await Ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "user", content: prompt, },
            ],
            temperature: 0.7,
            max_tokens: 100,
        });

        const { content } = response.choices[0].message;
        console.log(content)
        if (!content) {
            return res.json({
                success: false,
                message: "AI did not return a valid response.",
            });
        }

        await sql`INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, ${prompt}, ${content}, 'blog-title');`

        if (plan !== 'premium') {
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })

        }

        res.json({ success: true, content })


    } catch (error) {
        console.log('last', error.message)
        res.json({ success: false, message: error.message })
    }
}


export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { prompt, publish } = req.body

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized access' })
        }

        if (!req.body?.prompt) {
            return res.status(400).json({ success: false, message: 'Prompt is required' })
        }

        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: 'This feature is only available to premium users' })
        }


        // clipdroap api
        const formdata = new FormData()
        formdata.append('prompt', prompt)

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
            headers: { 'x-api-key': process.env.CLIPDROP_API_KEY, },
            responseType: 'arraybuffer',
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`

        // upload to cloudinary
        const { secure_url } = await cloudinary.uploader.upload(base64Image)

        // save to database
        await sql`INSERT INTO creations (user_id, prompt, content, type, publish) 
VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false});`


        return res.status(200).json({ success: true, secure_url })

    } catch (error) {
        console.error('Error generating image:', error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth()
        const image = req.file
        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: 'This feature is only available to premium users' })
        }

        // upload to cloudinary
        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: [{
                effect: 'background_removal',
                background_removal: 'remove_the_background'
            }]
        })

        // save to database
        await sql`INSERT INTO creations (user_id, prompt, content, type) 
VALUES (${userId}, 'remove background from image', ${secure_url}, 'image');`


        return res.status(200).json({ success: true, secure_url })

    } catch (error) {
        console.error('Error removing image background:', error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}


export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { object } = req.body
        const image = req.file
        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: 'This feature is only available to premium users' })
        }

        // upload to cloudinary
        const { public_id } = await cloudinary.uploader.upload(image.path)

        const imageUrl = cloudinary.url(public_id, {
            transformation: [{ effect: `gen_remove:${object}` }],
            resource_type: 'image',
        })


        // save to database
        await sql`INSERT INTO creations (user_id, prompt, content, type) 
VALUES (${userId}, ${`Remove ${object} from image`}, ${imageUrl}, 'image');`


        return res.status(200).json({ success: true, imageUrl })

    } catch (error) {
        console.error('Error removing object from image:', error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}


export const resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth()
        const resume = req.file
        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: 'This feature is only available to premium users' })
        }

        if (resume.size > 5 * 1024 * 1024) {
            return res.json({ success: false, message: 'File size must be less than 5MB' })
        }

        const dataBuffer = fs.readFileSync(resume.path)
        const pdfData = await pdf(dataBuffer)

        const prompt = `Review the resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`

        const response = await Ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: prompt, }],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const content  = response.choices[0].message.content;


        // save to database
        await sql`INSERT INTO creations (user_id, prompt, content, type) 
VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review');`


        return res.status(200).json({ success: true, content })

    } catch (error) {
        console.error('Error reviewing resume:', error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

















