const express = require("express")
const { UserData } = require("../modal/modal")
const router = express.Router();
const verifyToken = require("../middleWare/jwtToken")


router.get('/get_role', verifyToken, async (req, res) => {
    try {
        const { uid } = req;
        if (!uid) {
            res.status(403).json({ error: `uid is not present ${error}` })
        }
        const user = await UserData.findOne({ user_id: uid })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { role, user_approval_status, name } = user;
        return res.json({ role: role, status: user_approval_status, name: name })
    } catch (error) {
        res.status(500).json({ error: ` Error getting role ${error}` })
    }
})


router.get('/get_teacher_data', verifyToken, async (req, res) => {
    try {
        const { uid } = req;
        console.log(uid)
        if (!uid) {
            res.status(403).json({ error: `uid is not present ${error}` })
        }
        const user = await UserData.findOne({ user_id: uid })
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: ` Error getting role ${error}` })
    }

})

module.exports = router