const {Router} = require("express");
const createToken = require("../utils/createToken");
const UserModel = require("./Login.model");


const authRouter = Router()


authRouter.post("/signup", async(req, res) => {
    console.log(req.body)
    const user = await UserModel.findOne({ "email": req.body.email });

    if (user){
            res.send({message:"you are registered with this email"})
        }
        else{
            const newUser = new UserModel(req.body)
            try {
                newUser.save()  
            } catch (error) {
                res.status(500).send({message : "Error occurred"})   
            }
        return res.status(201).send({message : "Sign up success",data:newUser.name})
    }
})

authRouter.post("/login", async (req, res) => {
    console.log(req.body) 
    try {
        const user = await UserModel.findOne({ "email": req.body.email });
        console.log("a",user); 
            if(!user){
                return res.send({message:"wrong email"})
                
            }
            else{        
                const match=user.checkPassword(req.body.password) 
                
                         
                if(!match){
                    return res.send({message:"wrong password"})
                }
                else{
                    console.log(match,'lk'); 
                    const token=createToken(user)
                    console.log(token);
                    return res.send({message:"login successfull",token})
                } 
            }
    } catch (e) {

        res.status(500).send({e})
    }  
})

module.exports = authRouter;