import userModel from "../model/userModeel.js";
import productModel from "../model/productModel.js";
import jwt from 'jsonwebtoken'

export async function signup(req, res) {
    try {
        console.log(req.body);
        const { name, email, password, phone } = req.body
        if (name == '' || phone == '' || email == '' || password == '') {
            const message = "Fill the required details"
            return res.json({ error: true, message })
        }
        else {
            const ExistingUser = await userModel.findOne({ email })

            if (ExistingUser) {
                const message = "Already have an account"
                return res.json({ error: true, message })
            } else {


                const user = await userModel.create({
                    name: name,
                    phone: phone,
                    email: email,
                    password: password
                })
                const token = jwt.sign({
                    id: user._id,
                    name: user.name
                }, "jwtsecretkey")

                return res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ error: false })
            }

        }

    } catch (err) {
        console.log(err);
    }
}


export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user)
            return res.json({ error: true, message: "No User found" })

        if (user.password != password) {
            return res.json({ error: true, message: "wrong Password" })
        }


        const token = jwt.sign(
            {
                id: user._id
            },
            "myjwtsecretkey"
        )
        console.log("token :",token)

        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
            sameSite: "none",
        }).json({ error: false, user: user._id })
    }
    catch (err) {
        res.json({ message: "server error", error: err })
        console.log(err);
    }
}
export async function checkAuth(req, res) {

    try {
        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            return res.json({ loggedIn: false, error: true, message: "No Token Found" })
        }
        const verifyJwt = jwt.verify(token, "myjwtsecretkey")
       const _id=verifyJwt.id
        const user = await userModel.findOne({_id})
        console.log(user);
        if (!user) {
            return res.json({ loggedIn: false, messsage: "No Such user" })

        }
        return res.json({ user, loggedIn: true });

    } catch (err) {
        console.log(err)
        res.json({ loggedIn: false, error: err });
    }
}
export async function logout(req,res){
    res.cookie("token","",{ httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",}).json({ message: "logged out", error: false });
}


export const addProduct=async (req, res)=>{
    try{
        const image = req.file;
        let product = await productModel.create({...req.body, category:req.body.category.toLowerCase(), image})
        res.json({error:false})
    }catch(err){
        res.json({error:true, err, message:"something went wrong"})
    }
}

export const getProducts=async (req, res)=>{
    try{
        const search= req.query.search ?? ""
        const category= req.query.category ?? ""
        console.log(search)
        let products = await productModel.find({$or:[{name:new RegExp(search, 'i')},  {category:new RegExp(search, 'i')}], category:new RegExp(category, 'i')}).lean()
        res.json({error:false, products})
    }catch(err){
        res.json({error:true, err, message:"something went wrong"})
    }
}

export const getProduct=async (req, res)=>{
    try{
    
        let product = await productModel.findById(req.params.id)
        let user;
        if(product){
            user= await userModel.findById(product.userId);
        }
   
        res.json({error:false, product, user})
    }catch(err){
        res.json({error:true, err, message:"something went wrong"})
    }
}

export const getCategories=async (req, res)=>{
    try{
        let categories= await productModel.aggregate([{$group:{_id:"$category"}}]);
        return res.json({categories, error:false})

    }catch(err){
        console.log(err)

    }
}
