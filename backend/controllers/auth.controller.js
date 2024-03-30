// import user Model from schema
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    // if user already exist or not ...
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "Username already exist " });
    }

    // Hash password ...
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Creating avatar as per the user gender ...
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT token here ...
      generateTokenAndSetCookie(newUser._id , res); 
      // save the user to database ...
      await newUser.save();

      // response json payload ...
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in Signup controller ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async(req, res) => {
    try{
        const {userName , password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcryptjs.compare(password , user?.password || "");
        
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error : "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id ,res) ;

        res.status(200).json({
            _id : user._id , 
            fullName : user.fullName , 
            userName : user.userName , 
            profilePic : user.profilePic
        });
    }catch(error){
        console.log("Error in Login controller ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try{
        res.cookie("jwt" ,"" , {maxAge  : 0});
        res.status(200).json({message : "Logged out successfully"});
    }catch(error){
        console.log("Error in Logout controller ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
