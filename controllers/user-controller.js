const user= require ("../models/user");
 
exports.getAllUsers = async (req, res) => {
    let users;
    try {
        users = await user.find();
    }
    catch(err){
        console.log(err)
    }   
    if(!users){
        return res.status(404).json({message: "No users found"})
    }
    return res.status(200).json(users)
    // res.send("Hello World")

    
}

exports.createUsers =async(req,res) =>{
    let createdUser;
    console.log(req)
    try {
        createdUser = await user.create(req.body)
    }
    catch(err){
        console.log(err)
    }
    if(!createdUser){
        return res.status(404).json({message: "No users created"})
    }
    return res.status(200).json(createdUser)
    // res.send("Hello World")
}
    