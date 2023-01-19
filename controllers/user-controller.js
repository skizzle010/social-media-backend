const user = require("../models/user");
const bcrypt = require("bcrypt");
const { findByIdAndDelete, findByIdAndRemove } = require("../models/blog");

exports.getAllUsers = async (req, res) => {
  let users;
  try {
    users = await user.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json(users);
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  let existing_user;
  try {
    existing_user = await user.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (existing_user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const userpp = new user({
    name,
    email,
    password: hashPassword,
  });
  let data;
  try {
    data = await user.create(userpp);
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ data });
};

exports.login = async(req,res)=>{
  const {email, password } = req.body;
  let existing_user;
  try {
    existing_user = await user.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existing_user) {
    return res.status(400).json({ message: "Couldn't find user" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password,existing_user.password)
  if(!isPasswordCorrect){
    res.status(400).json({message:"Incorrect Password"})
  } 
  return res.status(200).json({message:"Login Successful"})

}

