import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone_number: { type: Number },
    is_pilot: { type: Boolean },
    has_pilot: { type: Boolean },
    booking_date: { type: Date },
    details: { type: String },
  },
  { collection: "bookings", timestamps: true }
);

export const BookingModel = mongoose.model("Booking", BookingSchema);
