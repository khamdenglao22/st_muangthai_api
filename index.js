const express = require("express");
const body = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const fileUpload = require("express-fileupload");
const AuthController = require("./controllers/auth-controller");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());
app.use(body.urlencoded({ extended: true }));

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// ບອກ path ໃຫ້ສາມາດເຂົ້້າເບິ່ງຮູບໄດ້
// app.use('/uploads', express.static(path.resolve(__dirname, './uploads')));
// require('dotenv').config({
//     path: path.join(__dirname, "env")
// })

app.use("/static", express.static(path.join(__dirname, "uploads")));
// ບອກ path ໃຫ້ສາມາດເຂົ້້າເບິ່ງຮູບໄດ້

// testing api

app.get("/", (req, res) => {
  res.json({ message: "Hello from api" });
});

// Backoffice router
const userRoute = require("./routers/user-router");
const roleRoute = require("./routers/role-router");
const authRoute = require("./routers/auth-router");
const bannerRoute = require("./routers/banner-router");
const serviceTypeRoute = require("./routers/services-type-router");
const serviceCountryRoute = require("./routers/service-country-router");
const serviceSectionRoute = require("./routers/section-router");
const serviceLocationRoute = require("./routers/service-location-router");
const workRoute = require("./routers/work-router");
const newsRoute = require("./routers/news-activity-router");
const provinceRoute = require("./routers/province-router");
const districtRoute = require("./routers/district-router");
const villageRoute = require("./routers/village-router");
const socialRoute = require("./routers/social-router");
const newsGalleryRoute = require("./routers/news-activity-gallery");
const locationMapRoute = require("./routers/service-location-map-router");
const applyWorkRoute = require("./routers/apply-work-router");
const sendMailRoute = require("./routers/send-mail-router");
const productCategoryRoute = require("./routers/product-category-router");
const productCategorySubRoute = require("./routers/product-category-sub-router");
const productRoute = require("./routers/product-router");
const bannerAdvertisingRoute = require("./routers/banner-advertising-router");
const productOrderRoute = require("./routers/product-order-router");
const aboutStructureRoute = require("./routers/about-structure-router");

// Backoffice router
app.use("/backoffice/api/user", userRoute);
app.use("/backoffice/api/role", roleRoute);
app.use("/backoffice/api/auth", authRoute);
app.use("/backoffice/api/banner", bannerRoute);
app.use("/backoffice/api/service-type", serviceTypeRoute);
app.use("/backoffice/api/service-country", serviceCountryRoute);
app.use("/backoffice/api/service-section", serviceSectionRoute);
app.use("/backoffice/api/service-location", serviceLocationRoute);
app.use("/backoffice/api/work", workRoute);
app.use("/backoffice/api/news", newsRoute);
app.use("/backoffice/api/province", provinceRoute);
app.use("/backoffice/api/district", districtRoute);
app.use("/backoffice/api/village", villageRoute);
app.use("/backoffice/api/social", socialRoute);
app.use("/backoffice/api/news-gallery", newsGalleryRoute);
app.use("/backoffice/api/location-map", locationMapRoute);
app.use("/backoffice/api/apply-work", applyWorkRoute);
app.use("/backoffice/api/send-mail", sendMailRoute);
app.use("/backoffice/api/product-category", productCategoryRoute);
app.use("/backoffice/api/product-category-sub", productCategorySubRoute);
app.use("/backoffice/api/product", productRoute);
app.use("/backoffice/api/banner-advertising", bannerAdvertisingRoute);
app.use("/backoffice/api/product-order", productOrderRoute);
app.use("/backoffice/api/about-structure", aboutStructureRoute);

// port

const PORT = process.env.PORT || 8888;

// server
app.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
});
