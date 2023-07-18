const express = require("express")
const router = express.Router();
const {User} = require("../models");
const bcrypt = require("bcrypt")
const {where} = require("sequelize");
const {sign} = require("jsonwebtoken")


router.post("/", async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        User.create({
            username: username,
            password: hash
        });
    });
    res.json("Success")
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    if (username === '' || password === '') return res.json("empty")
    const user = await User.findOne({where: {username: username}})
    if (!user) return res.json({error: "User Doesn't Exist"})
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) return res.json({error: "Wrong Username and Password Combination"})
        const accessToken = sign({username: user.username, user: user.id},
            "importantsecret");
        res.json(accessToken);
        // res.json("You Logged In!!")
    });
});
module.exports = router