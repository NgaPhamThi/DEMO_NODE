import User from '../models/user'
import { signupSchema, siginSchema } from '../schemas/auth'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const signup = async (req, res) => {
    try {

        const { error } = signupSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }

        const userExit = await User.findOne({ email: req.body.email })
        if (userExit) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            })

        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }

}
export const signin = async (req, res) => {
    try {

        const { error } = siginSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({
                message: "Email không tồn tại"
            })

        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "sai mật khẩu"
            })

        }
        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1d" });

        return res.status(201).json({
            accessToken: token,
            user

        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }

}