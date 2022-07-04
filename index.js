import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connect } from "./connection.js";
import { BookingModel } from "./Booking.js";
import { NotAdminModel } from "./NotificationAdmin.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/notifications", async (req, res) => {
  try {
    const notifications = await NotAdminModel.find();
    res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.post("/booking", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      is_pilot,
      has_pilot,
      booking_date, // Format: 2022-06-25 / YYYY-MM-DD
      booking_time, // Format: 18:32 / HH:MM
      details,
    } = req.body;

    const newBooking = new BookingModel({
      first_name,
      last_name,
      email,
      phone_number,
      is_pilot,
      has_pilot,
      booking_date: booking_date + "T" + booking_time,
      details,
    });
    const savedBooking = await newBooking.save();
    const newNot = new NotAdminModel({
      booking_id: savedBooking._id,
    });
    await newNot.save();

    res.status(201).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.listen(PORT, async () => {
  await connect(process.env.NODE_ENV);
  console.log(`${process.env.NODE_ENV}`);
  console.log(`Server listening on port ${PORT}`);
});
