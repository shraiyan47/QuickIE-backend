const router = require('express').Router();
//import todo model 
const MonthlySheetModel = require('../models/MonthlySheetmodel');
const TokenChecker = require('../TokenChecker');

const ts = Date.now();

//create first route --add Todo Item to database
router.post('/api/MonthlySheet', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {

                const newItem = new MonthlySheetModel({
                    month_name: req.body.month_name,
                    starting_balance: req.body.starting_balance,
                    isActive: true,
                    date: ts,
                    userId: tokenResult.userId
                })
                //save this item in database
                const saveItem = await newItem.save()
                console.log("Done 1")
                const allMonthlySheet = await MonthlySheetModel.find({"userId":tokenResult.userId});
                console.log("Done 2")
                
                res.status(200).json({ saveItem, allMonthlySheet });
                // res.status(200).json(saveItem);
            }
            else {
                res.status(401).json({ "ErrorMsg": "Unauthorized User" })
            }
        }
        else {
            res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
        }


    } catch (err) {
        res.json(err);
    }
})

// // get All Item from database
router.get('/api/MonthlySheet', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {

                const allMonthlySheet = await MonthlySheetModel.find({"userId":tokenResult.userId});
                res.status(200).json(allMonthlySheet);

            }
            else {
                res.status(401).json({ "ErrorMsg": "Unauthorized User" })
            }
        }
        else {
            res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
        }

    } catch (err) {
        res.json(err);
    }
})

// //Get by id route 
// router.get('/api/items/:id', async (req, res) => {
//     try {
//         const theToken = req.headers.authorization;
//         if (!!theToken) {
//             const tokenResult = TokenChecker.TokenChecker(theToken);
//             console.log("Return Token ", tokenResult);

//             if (tokenResult) {
//                 const theTodo = await MonthlySheetModel.findById(req.params.id, {});
//                 res.status(200).json(theTodo);
//             }
//             else {
//                 res.status(401).json({ "ErrorMsg": "Unauthorized User" })
//             }
//         }
//         else {
//             res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
//         }

//     } catch (err) {
//         res.json(err);
//     }
// })



// //update item
// router.put('/api/item/:id', async (req, res) => {
//     try {

//         const theToken = req.headers.authorization;
//         if (!!theToken) {
//             const tokenResult = TokenChecker.TokenChecker(theToken);
//             console.log("Return Token ", tokenResult);

//             if (tokenResult) {

//                 //find the item by its id and update it
//                 const updateItem = await MonthlySheetModel.findByIdAndUpdate(req.params.id, { $set: req.body });
//                 // res.status(200).json(updateItem);
//                 const allMonthlySheet = await MonthlySheetModel.find({"userId":tokenResult.userId});
//                 res.status(200).json({ updateItem, allMonthlySheet });

//             }
//             else {
//                 res.status(401).json({ "ErrorMsg": "Unauthorized User" })
//             }
//         }
//         else {
//             res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
//         }
//     } catch (err) {
//         res.json(err);
//     }
// })


// //Delete item from database
// router.delete('/api/item/:id', async (req, res) => {
//     try {
//         const theToken = req.headers.authorization;
//         if (!!theToken) {
//             const tokenResult = TokenChecker.TokenChecker(theToken);
//             console.log("Return Token ", tokenResult);

//             if (tokenResult) {
//                 //find the item by its id and delete it
//                 const deleteItem = await MonthlySheetModel.findByIdAndDelete(req.params.id);
//                 res.status(200).json({ 'msg': 'Item Deleted' });

//             }
//             else {
//                 res.status(401).json({ "ErrorMsg": "Unauthorized User" })
//             }
//         }
//         else {
//             res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
//         }
//     } catch (err) {
//         res.json(err);
//     }
// })


//export router
module.exports = router;