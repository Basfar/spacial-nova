import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NotAdminSchema = new Schema(
  {
    booking_id: { type: Schema.Types.ObjectId, ref: "bookings" },
    read: { type: Boolean, required: true, default: false },
  },
  { collection: "notification_admin", timestamps: true }
);

export const NotAdminModel = mongoose.model(
  "NotificationAdmin",
  NotAdminSchema
);
