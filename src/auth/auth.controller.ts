import User from "../models/User";
import Role from '../models/Role';
import bcrypt from 'bcryptjs';
import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import * as process from "process";

const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "24h"
    })
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors});
            }
            const {username, password, email} = req.body;
            const candidate = await User.findOne({username}) || await User.findOne({email});
            if(candidate) {
                return res.status(400).json({message: "User already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({
                username,
                email,
                password: hashPassword,
                role: userRole.value
            })
            await user.save()
            return res.json({message: "User created!"})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration Error"})
        }
    }
    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email: email});
            if(!user) {
                return res.status(400).json({message: `User does not exist!`})
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(400).json({message: "Incorrected password!"})
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login Error"})
        }
    }
    async authorization(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id});
            if(!user) {
                return res.status(400).json({message: `User does not exist!`})
            }
            const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: "1h"});
            return res.json( {id: user.id,
                    email: user.email,
                    username: user.username,
                    token: token
                })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Auth Error"})
        }
    }
}

export default new authController();