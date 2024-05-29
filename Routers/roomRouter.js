import express from "express";
import { bookRoom, bookedCustomerData, bookedRoomData, createRoom, customerDataCount, roomDetails } from "../Controllers/roomController.js";


const router=express.Router();

router.use("/allRoomDetails" ,roomDetails);
router.use("/createRoom",createRoom);
router.use("/roomBooking",bookRoom);
router.use("/bookedRoomData",bookedRoomData);
router.use("/customerData",bookedCustomerData);
router.use("/customerBookingsCount",customerDataCount);

export default router;