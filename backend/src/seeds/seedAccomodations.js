import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import Accommodation from "../models/Accomodation.model.js";

config();

const accommodations = [
  {
    name: "Luxury Resort",
    type: "hotel",
    price: 300,
    maxSize: 2,
    phone: 1234567890,
    city: "Los Angeles",
    address: "123 Sunset Blvd",
    photo:
      "https://res.cloudinary.com/ddjnomwqw/image/upload/v1740470765/hotel1_s9pwbm.jpg",
    desc: "Experience ultimate luxury with breathtaking views.",
    featured: true,
  },
  {
    name: "Boutique Hotel",
    type: "hotel",
    price: 200,
    maxSize: 2,
    phone: 9876543210,
    city: "New York",
    address: "456 Manhattan Ave",
    photo:
      "https://res.cloudinary.com/ddjnomwqw/image/upload/v1740470766/hotel2_moqiiu.jpg",
    desc: "A cozy stay with personalized service.",
  },
  {
    name: "City Hotel",
    type: "hotel",
    price: 150,
    maxSize: 2,
    phone: 5555555555,
    city: "Chicago",
    address: "789 Downtown St",
    photo:
      "https://res.cloudinary.com/ddjnomwqw/image/upload/v1740470766/hotel3_iah4za.jpg",
    desc: "Perfect for business and leisure travelers.",
  },
  {
    name: "Cozy Cottage",
    type: "guesthouse",
    price: 180,
    maxSize: 4,
    phone: 1122334455,
    city: "Austin",
    address: "101 Countryside Ln",
    photo:
      "https://res.cloudinary.com/ddjnomwqw/image/upload/v1740470766/house1_jfl7nf.jpg",
    desc: "A peaceful retreat in the countryside.",
    featured: true,
  },
  {
    name: "Rustic Cabin",
    type: "guesthouse",
    price: 150,
    maxSize: 3,
    phone: 2233445566,
    city: "Denver",
    address: "202 Forest Rd",
    photo:
      "https://res.cloudinary.com/ddjnomwqw/image/upload/v1740470767/house2_vgb4ir.jpg",
    desc: "Experience nature in a rustic setting.",
  },
  {
    name: "Seaside Villa",
    type: "guesthouse",
    price: 220,
    maxSize: 5,
    phone: 3344556677,
    city: "Miami",
    address: "303 Beachside Ave",
    photo:
      "https://res.cloudinary.com/ddjnomwqw/image/upload/v1740470767/house3_ztu3fl.webp",
    desc: "Enjoy stunning ocean views from your room.",
  },
];

const seedAccommodations = async () => {
  try {
    await connectDB();

    //await Accommodation.deleteMany(); // Clear existing data (optional)
    await Accommodation.insertMany(accommodations);

    console.log("Accommodations seeded successfully");
  } catch (error) {
    console.error("Error seeding accommodations:", error);
  }
};

seedAccommodations();
