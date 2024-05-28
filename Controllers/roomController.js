const rooms = [
    {
        room_id: 1,
        room_name: "normal",
        room_status: "available",
        seats: 3,
        amenities: "TV, Washing Machine, AC",
        price_per_hour: 1000
    },
    {
        room_id: 2,
        room_name: "deluxe",
        room_status: "available",
        seats: 5,
        amenities: "TV, Washing Machine, AC, Fridge",
        price_per_hour: 2000
    },
    {
        room_id: 3,
        room_name: "suite",
        room_status: "occupied",
        seats: 4,
        amenities: "TV, AC, Mini Bar, Wi-Fi",
        price_per_hour: 3000
    },
    {
        room_id: 4,
        room_name: "conference",
        room_status: "occupied",
        seats: 20,
        amenities: "Projector, Wi-Fi, Whiteboard, Conference Phone",
        price_per_hour: 5000
    },
    {
        room_id: 5,
        room_name: "single",
        room_status: "available",
        seats: 1,
        amenities: "TV, AC",
        price_per_hour: 500
    }
];


//getall
export const roomDetails=(req,res)=>{
    res.status(200).json({message:"All room details",data:rooms})
}

// 1. createRoom
export const createRoom=(req,res)=>{
    const {room_name,room_status,seats,amenities,price_per_hour} =req.body;
    const newRoom={
        id:rooms.length+1,
        room_name:room_name,
        room_status:room_status,
        seats:seats,
        amenities:amenities,
        price_per_hour:price_per_hour
    }
    rooms.push(newRoom);
    res.status(200).json({message:"Room created successfully",data:newRoom})
}

//2. room booking
const bookings=[
    {booking_id:1,customer_name:"sri",date:"4/2/2024",start_time:"9am",end_time:"5pm",room_id:3},
    {booking_id:2,customer_name:"rishi",date:"5/3/2024",start_time:"11am",end_time:"2pm",room_id:4}
];

export const bookRoom=(req,res)=>{
    const{customer_name,date,start_time,end_time,room_id}=req.body;
    const room=rooms.find(room=>room.room_id==room_id);
    if(!room){
        res.status(404).json({message:"Room not found"})
    }
    if(room.room_status!="available"){
        res.status(400).json({message:"Room is not available"})
    }
    const newBooking={
        booking_id:bookings.length+1,
        customer_name:customer_name,
        date:date,
        start_time:start_time,
        end_time:end_time,
        room_id:room_id
    }
    bookings.push(newBooking);
    res.status(200).json({message:"Room booked successfully",data:newBooking})

}

// 3. all rooms with booked data
export const bookedRoomData=(req,res)=>{
    const bookedRoom=bookings.map((booking)=>({
        room_name:rooms.find(r=>r.room_id==booking.room_id).room_name,
        room_status:rooms.find(r=>r.room_id==booking.room_id).room_status,
        customer_name:booking.customer_name,
        date:booking.date,
        start_time:booking.start_time,
        end_time:booking.end_time
    }));
    res.status(200).json({message:"All booked room's data",data:bookedRoom})
}

//4. all customers with booked data
export const bookedCustomerData=(req,res)=>{
    const bookedCustomer=bookings.map((booking)=>({
        customer_name:booking.customer_name,
        room_name: rooms.find(r=>r.room_id==booking.room_id).room_name,
        date:booking.date,
        start_time:booking.start_time,
        end_time:booking.end_time
    }))
    res.status(200).json({message:"All customers data",data:bookedCustomer})

}

//5. customer bookings count
export const customerDataCount=(req,res)=>{
    const customersDetails=bookings.map((booking)=>({
        customer_name:booking.customer_name,
        room_name:rooms.find(r=>r.room_id==booking.room_id).room_name,
        date:booking.date,
        start_time:booking.start_time,
        end_time:booking.end_time,
        booking_id:booking.booking_id,
        booking_status:"booked"
    }));
    const bookingCounts = customersDetails.reduce((acc, booking) => {
        if (!acc[booking.customer_name]) {
            acc[booking.customer_name] = { count: 0, bookings: [] };
        }
        acc[booking.customer_name].count += 1;
        acc[booking.customer_name].bookings.push(booking);
        return acc;
    }, {});

    const result = Object.keys(bookingCounts).map(customer => ({
        customer_name: customer,
        total_bookings: bookingCounts[customer].count,
        bookings: bookingCounts[customer].bookings
    }));

    res.status(200).json({ message: "Customer booking count", data: result });
};
