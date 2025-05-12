//import mongoose to create mongoose model
const mongoose = require("mongoose");

//create Schema
const GuestSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    acceptLang: {
      type: String,
    },
    referer: {
      type: String,
    },
    encoding: {
      type: String,
    },
    connection: {
      type: String,
    },
    host: {
      type: String,
    },
    fingerprintRaw: {
      type: String,
      required: true,
    },
    fingerprintHash: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { collection: "guest" }
);

//export this Schema

module.exports = mongoose.model("guests", GuestSchema);
