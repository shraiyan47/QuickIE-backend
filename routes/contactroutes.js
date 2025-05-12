const router = require("express").Router();
//import todo model
const ContactModel = require("../models/contactmodel");
const guestmodel = require("../models/guestmodel");
const getClientFingerprint = require("../userfingerprints");

const ts = Date.now();

//create first route --add Monthly Sheet to database
router.post("/api/contactus", async (req, res) => {
  const fingerprint = getClientFingerprint(req);
  console.log("Contact Form Data ", fingerprint);
  try {
    console.log("Fingerprint: ", fingerprint);
    const newGuest = new guestmodel({
      ip: fingerprint.ip,
      userAgent: fingerprint.userAgent,
      acceptLang: fingerprint.acceptLang,
      referer: fingerprint.referer,
      encoding: fingerprint.encoding,
      connection: fingerprint.connection,
      host: fingerprint.host,
      fingerprintRaw: fingerprint.fingerprintRaw,
      fingerprintHash: fingerprint.fingerprintHash,
      date: ts,
    });
    //save this Plan in database
    const saveGuest = await newGuest.save();
    console.log("Done 1");
    // const allGuests = await guestmodel.find();
    // console.log("Done 2");

    const newContact = new ContactModel({
      contact_name: req.body.name,
      contact_email: req.body.email,
      contact_message: req.body.message,
      contact_guest_id: saveGuest._id,
      isActive: true,
      date: ts,
      userId: req.body.userId,
    });
    //save this Plan in database
    const saveContact = await newContact.save();
    console.log("Done 3");

    res.status(200).json({ saveContact });
    // res.status(200).json(savePlan);
  } catch (err) {
    res.json(err);
  }
});

// // get All Plan from database
router.get("/api/plan", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allPlan = await ContactModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json(allPlan);
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
router.get("/api/plan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const APlan = await ContactModel.findById(req.params.id, {});
        res.status(200).json(APlan);
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

//update Plan
router.put("/api/plan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log("Monthly Sheet update ID: ", req.params.id);
        //find the Plan by its id and update it
        const updatePlan = await ContactModel.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        // res.status(200).json(updatePlan);
        const allPlan = await ContactModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json({ updatePlan, allPlan });
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

//Soft Delete Plan
router.delete("/api/plan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the Plan by its id and delete it
        // const deletePlan = await ContactModel.findByIdAndDelete(
        //   req.params.id
        // );
        const updateDailyReport = await ContactModel.findByIdAndUpdate(
          req.params.id,
          {
            isActive: false,
          }
        );
        res
          .status(200)
          .json({ msg: req.params.id + " - Monthly Sheet Deleted" });
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

//Delete Plan from database
router.delete("/api/planDelete/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the Plan by its id and delete it
        const deletePlan = await ContactModel.findByIdAndDelete(req.params.id);

        res
          .status(200)
          .json({
            msg: req.params.id + " - Monthly Sheet Permanently Deleted",
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
