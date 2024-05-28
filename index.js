import express from "express";
import cors from "cors";
import rRouter from "./Routers/roomRouter.js";


const app=express();
const PORT=4000;

app.use(cors());

//middleware
app.use(express.json())

app.use("/api",rRouter)


app.get("/",(req,res)=>{
    res.status(200).send( `<div style="font-size:22px">
    <div style="text-align: center"><strong> Nodejs hall booking api task </strong></div>
    <p>Firstly, I added some data to the room variable. Using the GET method, I retrieved all the room details from the API.Change the endpoint to <strong> /api/allRoomDetails </strong> to retrieve all room's data.</p>
    <ol><li><p><strong> /api/createRoom </strong>: Create a new room<p></li>
    <li><p><strong> /api/roomBooking </strong>: Book a room<p></li>
    <li><p><strong> /api/bookedRoomData </strong>: Retrieve booked room's data<p></li>
    <li><p><strong> /api/customerData </strong>: Retrieve all customer's data<p></li>
    <li><p><strong> /api/customerCount </strong>: See the customer's room booking count</li></ol><p>

    </div>`);
    
})


app.listen(PORT,()=>{
    console.log("App is running in the PORT",PORT)
})