import express from "express";
import TrendsController from "../controllers/trends.controller.js";

const router = express.Router();

router.route("/").get(TrendsController.initialCall);

// will go through all the country codes.
router
    .route("/trend-term/:trendTerm")
    .get(TrendsController.getTrendsOfCountries);

// will go through all the country codes then state codes.
router
    .route("/trend-term/countries-then-states/:trendTerm")
    .get(TrendsController.getContryTrendsThenStateTrends);

// will go through country and state codes.
router
    .route("/trend-term/countries-and-states/:trendTerm")
    .get(TrendsController.getCountryTrendsAndStateTrends);

export default router;
