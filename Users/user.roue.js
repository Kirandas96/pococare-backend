const {Router} = require("express");
const UserModel = require("../loginSignup/Login.model");


const UserRouter = Router()


UserRouter.get("/users", async(req, res) => {
    console.log(req.body)
    const users = await UserModel.find();

    if (user){
            res.send(users)
        }
        else{
        res.send("no users")    
    }
})


module.exports = UserRouter;