const router = require('express').Router();

const UserInfo = require('../models/UserInfo');
const CounterInfo = require("../models/CounterInfo")
const autoIncrementNumberId = require('../middleware/AutoIncrementId');

router.post("/addcard", autoIncrementNumberId, async (req, res) => {
    const { user_id, email, values } = req.body;
    console.log(values);
    try {
        const user = await UserInfo.findById(user_id);
        if (user) {
            let cards = user.cards;
            cards.unshift(values);
            const response = await UserInfo.findOneAndUpdate({ _id: user_id }, {
                $set: {
                    cards: cards,
                }
            });
            if (response)
                res.status(200).json({ message: `Card Added Successfully!` });
        }
    }
    catch (e) {
        res.json({ error: `Card Not Added! Try Again` });
    }
})

router.post("/updatecard", async (req, res) => {
    const { userid, cardid, values } = req.body;
    const updated = await UserInfo.findOneAndUpdate({ _id: userid, 'cards._id': cardid },
        {$set: { 'cards.$': values }},
        { returnOriginal: false }
    );
    
    if (updated && Object.keys(updated).length > 0) {
        res.status(200).json({ user: updated, message: `Card Updated Successfully!` });
    }
    else {
        res.json({ error: `Card Not Updated! Try Again` });
    }
})


module.exports = router