const { Router } = require('express');
const courseRouter = Router();
const { userMiddleware } = require('../middleware/user');
const { purchaseModel, courseModel } = require('../db');


courseRouter.post('/purchase', userMiddleware, async (req, res) => {
    const userId = req.body;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })

    res.json({
        message : "you have successfully purchased the course"
    })
})

courseRouter.get('/preview', async (req, res) => {
    const thumbnail = await courseModel.find({});

    res.json({
        thumbnail
    })
})

module.exports = {
    courseRouter: courseRouter
}
