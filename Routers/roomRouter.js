import express from "express";
import { bookRoom, bookedCustomerData, bookedRoomData, createRoom, customerDataCount, roomDetails } from "../Controllers/roomController.js";


const router=express.Router();

router.get("/allRoomDetails" ,roomDetails);
router.post("/createRoom",createRoom);
router.post("/roomBooking",bookRoom);
router.get("/bookedRoomData",bookedRoomData);
router.get("/customerData",bookedCustomerData);
router.get("/customerBookingsCount",customerDataCount);

export default router;