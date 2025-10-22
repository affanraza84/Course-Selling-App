const { Router } = require('express');
const userRouter = Router();
const { z } = require('zod');
const bcrypt = require('bcrypt');
const { userModel, purchasesModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken');
const { userMiddleware } = require('../middleware/user');


userRouter.post('/signup', async (req, res) => {
    // Input validation using zod
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
        return;
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({
            message: "signup succeeded"
        })
        throw new Error("Sign up error");
    } catch (e) {
        res.status(403).json({
            message: "Error"
        })
    }
})

userRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
    })
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, process.env.JWT_USER_PASSWORD)
        res.json({
            token
        })
    }
    else {
        res.status(403).json({
            message: "user with this match does not exist "
        })
    }
})

userRouter.get('/purchases', userMiddleware, async (req, res) => {
    const userId = req.userId;
    const purchases = await purchasesModel.find({
        userId
    })

    const courseData = await courseModel.find({
        _id: { $in: purchases.map(x => x.purchases) }
    })
    res.json({
        purchases,
        courseData
    })
})

module.exports = {
    userRouter: userRouter
}