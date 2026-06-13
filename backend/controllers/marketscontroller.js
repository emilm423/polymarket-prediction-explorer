const marketsModel = require("../models/marketsModel");

async function home(req, res) {
    res.json({
        project: "Polymarket Prediction Explorer",
        backend: "Node.js + Express",
        database: "MySQL",
        api_format: "JSON",
        routes: [
            "/api/markets",
            "/api/markets/search?q=bitcoin&status=open",
            "/api/markets/stats",
            "/api/markets/open-top-volume",
            "/api/markets/competitive",
            "/api/markets/strong-favorites",
            "/api/markets/newest-open",
            "/api/markets/resolved",
            "/api/markets/random-open"
        ]
    });
}

async function getStats(req, res) {
    try {
        const stats = await marketsModel.getStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllMarkets(req, res) {
    try {
        const markets = await marketsModel.getAllMarkets();
        res.json(markets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function searchMarkets(req, res) {
    try {
        const q = req.query.q || "";
        const status = req.query.status || "all";

        const markets = await marketsModel.searchMarkets(q, status);
        res.json(markets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getOpenTopVolume(req, res) {
    try {
        const markets = await marketsModel.getOpenTopVolume();
        res.json(markets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getResolvedMarkets(req, res) {
    try {
        const markets = await marketsModel.getResolvedMarkets();
        res.json(markets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getNewestOpen(req, res) {
    try {
        const markets = await marketsModel.getNewestOpen();
        res.json(markets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getCompetitiveMarkets(req, res) {
    try {
        const markets = await marketsModel.getCompetitiveMarkets();
        res.json(markets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getStrongFavorites(req, res) {
    try {
        const markets = await marketsModel.getStrongFavorites();
        res.json(markets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getRandomOpen(req, res) {
    try {
        const markets = await marketsModel.getRandomOpen();
        res.json(markets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    home,
    getStats,
    getAllMarkets,
    searchMarkets,
    getOpenTopVolume,
    getResolvedMarkets,
    getNewestOpen,
    getCompetitiveMarkets,
    getStrongFavorites,
    getRandomOpen
};