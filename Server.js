const express = require('express');
const mongoose = require('mongoose');
const userData = require('./model');
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://tirupatammajavisetty_db_user:71a3k6cYmuTfUHtp@cluster0.lkz2wgb.mongodb.net/").then(()=>console.log("database connected")).catch((err)=> console.log(err.message))
app.post('/send',async (req,res)=>{
    const{username,email,password}= req.body;
    try{
        const data=new userData({
            username,
            email,
            password
        });
        await data.save();
        return res.json({"message": "Data sent successfully"});
    }
    catch (err){
        console.log(err.message)
    }
}) ;

app.get ('/get_data',async(req,res)=>{
    try{
        const data = await userData.find()
        return res.json({
            message:"getting data...",
            userdata:data
        })
        }
        catch(err){
            console.log(err.message)
        }

    
})

app.get('/get_data/:id', async(req,res)=>{
    try{
        const user = await userData.findById(req.params.id).select("username email")
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
          return res.status(200).json(user)

    }
    catch(err){
        console.log(err.message)
    }
})
    app.put('/update/:id',async (req,res)=>{
    try{
        const{username,email,password} = req.body;
        const user = await userData.findByIdAndUpdate(
            req.params.id,{
                username,
                email,
                password
            },
            {
                new: true
            }
        );
        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }
        return res.status(200).json({
            message:"user updated successfully",
            userdata:user
               
            });
    } catch (err){
        console.log(err.message);

    }
    
    })
    app.delete('/delete/:id', async(req,res)=>{
        try{
            const user = await userData.findByIdAndDelete(req.params.id).select("username,email")
            if(!user){
                return res.status(404).json({
                    message:"user not found"
                })
            }
            return res.status(200).json(user)
        }
        catch(err){
            console.log(err.message)
        }
    })
        

app.listen(3000, ()=>
    { 
        console.log("server is running.....");
    });

