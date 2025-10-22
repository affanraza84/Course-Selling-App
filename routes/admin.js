const { Router } = require('express');
const adminRouter = Router();
const { adminModel, courseModel } = require('../db');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const bcrypt = require('bcrypt');
const { adminMiddleware } = require('../middleware/admin');


adminRouter.post('/signup', async (req, res) => {
    //input validation
    const requireBody = z.object({
        email: z.string().min(3).max(30).email(),
        password: z.string().min(3).max(30),
        firstName: z.string().min(3).max(30),
        lastName: z.string().min(3).max(30)
    })
    const parsedBodyWithSuccess = requireBody.safeParse(req.body);
    if (!parsedBodyWithSuccess) {
        res.status(403).json({
            message: "incorrect format"
        })
        return
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);
    try {
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({
            message: "admin signup succeeded"
        })
        throw new Error("Error")
    } catch (e) {
        res.status(403).json({
            message: "admin sign up error"
        })
    }
})

adminRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email
    })
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (passwordMatch) {
        const token = jwt.sign({
            id: admin._id.toString()
        }, process.env.JWT_ADMIN_PASSWORD)
        res.json({
            token
        })
    }
    else {
        res.status(403).json({
            message: "admin with given credentials does not exist"
        })
    }
})

adminRouter.post('/course', adminMiddleware, async (req, res) => {
    // input validation
    const requireBody = z.object({
        title: z.string(),
        description: z.string(),
        imageUrl: z.string(),
        price: z.number()
    })
    const parsedBodyWithSuccess = await requireBody.safeParse(req.body);
    if (!parsedBodyWithSuccess) {
        res.status(403).json({
            message: "invalid format"
        })
        return
    }
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;

    try {
        const course = await courseModel.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            creatorId: adminId
        })
        res.json({
            message: "course created",
            creatorId: course._id
        })
    } catch (e) {
        res.status(403).json({
            message: "Error"
        })
    }

})

adminRouter.put('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    })
    res.json({
        message: "course updated",
        courseId: course._id
    })
})

adminRouter.get('/course/bulk', adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    })
    res.json({
        message: "this is your course",
        courses
    })

})

module.exports = {
    adminRouter: adminRouter
}