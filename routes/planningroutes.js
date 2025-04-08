const router = require("express").Router();
//import todo model
const PlanningModel = require("../models/planingmodel");
const TokenChecker = require("../TokenChecker");

const ts = Date.now();

//create first route --add Expense Plan to database
router.post("/api/planning", async (req, res) => {
  console.log(req.body);
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const newPlanning = new PlanningModel({
          monthly_sheet_id: req.body.monthly_sheet_id,
          plan_id: req.body.plan_id,
          plan_amount: req.body.plan_amount,
          plan_type: req.body.plan_type,
          isActive: true,
          date: ts,
          userId: tokenResult.userId,
        });
        //save this Plan in database
        const savePlanning = await newPlanning.save();
        console.log("Done 1");
        const allPlanning = await PlanningModel.find({
          userId: tokenResult.userId,
        });
        console.log("Done 2");

        res.status(200).json({ savePlanning, allPlanning });
        // res.status(200).json(savePlan);
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

// // get All Planning from database
router.get("/api/planning", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allPlanning = await PlanningModel.find({
          userId: tokenResult.userId,
        });
        const activePlans = allPlanning.filter(plan => plan.isActive==true);
        const inactivePlans = allPlanning.filter(plan => plan.isActive==false);

        res.status(200).json({activePlans, inactivePlans});
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//Get by id route
router.get("/api/planning/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const APlanning = await PlanningModel.findById(req.params.id, {});
        res.status(200).json(APlanning);
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//update Planning
router.put("/api/planning/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log("Expense Plan update ID: ", req.params.id);
        //find the Planning by its id and update it
        const updatePlanning = await PlanningModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body }
        );
        // res.status(200).json(updatePlanning);
        const allPlanning = await PlanningModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json({ updatePlanning, allPlanning });
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//Soft Delete Planning
router.delete("/api/planning/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the Planning by its id and delete it
        // const deletePlanning = await PlanningModel.findByIdAndDelete(
        //   req.params.id
        // );
        const updateDailyReport = await PlanningModel.findByIdAndUpdate(
          req.params.id,
          {
            isActive: false,
          }
        );
        res
          .status(200)
          .json({ msg: req.params.id + " - Expense Plan Deleted" });
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//Delete Planning from database
router.delete("/api/planningDelete/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the Planning by its id and delete it
        const deletePlanning = await PlanningModel.findByIdAndDelete(
          req.params.id
        );

        res.status(200).json({
          msg: req.params.id + " - Expense Plan Permanently Deleted",
        });
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//export router
module.exports = router;
