import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { connectDB } from "./lib/db.js";
import authRoute from "./routes/auth.route.js";
import accomodationRoute from "./routes/accomodation.route.js";
import userRoute from "./routes/user.route.js";
import bookingRoute from "./routes/booking.route.js";
import reviewRoute from "./routes/review.route.js";

dotenv.config();
const app = express();

const PORT = process.env.Port || 5090;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/accomodations", accomodationRoute);
app.use("/api/users", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/booking", bookingRoute);

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
  connectDB();
});
