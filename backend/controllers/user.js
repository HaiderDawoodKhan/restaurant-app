import { ExamUser } from "../models/user.js";

export const createUser = async (req,res) => {
    try {
        const { username, password, name, created_orders } = req.body;
        if(!username || !password || !name)
        {
            return res.status(400).json({error : "Fill in the required fields"})
        }
        const user = await ExamUser.create({name,username,password,created_orders})
        return res.status(201).json({user})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

export const loginUser = async (req,res) => {
    try {
        const user = await ExamUser.findOne({
            username : req.body.username,
            password : req.body.password
        })

        if(user)
        {
            console.log(user)
            return res.status(200).json({user,found:true})
        }

        return res.status(401).json({ message: "Invalid username or password", found: false });
        
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

export const changePassword = async (req,res) => {
    try {
        const user = await ExamUser.findByIdAndUpdate(req.body.id,{password : req.body.password})
        if(user)
        {
            return res.status(200).json({user,found:true})
        }
        return res.status(401).json({ message: "User not found", found: false });
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

export const getUserInfo = async (req,res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        if(user)
        {
            return res.status(201).json({user})
        }
        return res.status(500).json({error : error.message})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}