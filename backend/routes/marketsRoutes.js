const express = require("express");
const router = express.Router();

const marketsController = require("../controllers/marketsController");

router.get("/", marketsController.home);

router.get("/markets", marketsController.getAllMarkets);
router.get("/markets/search", marketsController.searchMarkets);
router.get("/markets/stats", marketsController.getStats);

router.get("/markets/open-top-volume", marketsController.getOpenTopVolume);
router.get("/markets/resolved", marketsController.getResolvedMarkets);
router.get("/markets/newest-open", marketsController.getNewestOpen);
router.get("/markets/competitive", marketsController.getCompetitiveMarkets);
router.get("/markets/strong-favorites", marketsController.getStrongFavorites);
router.get("/markets/random-open", marketsController.getRandomOpen);

module.exports = router;