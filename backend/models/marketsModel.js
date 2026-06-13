const db = require("../config/db");

const marketFields = `
    id,
    question,
    slug,
    answer1,
    answer2,
    active,
    closed,
    archived,
    volume,
    outcome_prices,
    event_title,
    created_at,
    end_date,
    updated_at
`;

function parsePrices(rawPrices) {
    if (!rawPrices) return [];

    try {
        const fixed = String(rawPrices).replaceAll("'", "\"");
        return JSON.parse(fixed).map(Number);
    } catch (error) {
        return [];
    }
}

function addPredictionFields(market) {
    const prices = parsePrices(market.outcome_prices);

    if (prices.length > 0) {
        const highest = Math.max(...prices) * 100;
        const lowest = Math.min(...prices) * 100;

        market.highest_probability = Number(highest.toFixed(2));
        market.lowest_probability = Number(lowest.toFixed(2));

        if (highest >= 80) {
            market.prediction_label = "Strong Favorite";
        } else if (highest >= 40 && highest <= 60) {
            market.prediction_label = "Competitive";
        } else {
            market.prediction_label = "Moderate";
        }
    } else {
        market.highest_probability = null;
        market.lowest_probability = null;
        market.prediction_label = "Unknown";
    }

    market.status_label = Number(market.closed) === 1 ? "Resolved" : "Open";

    return market;
}

async function runQuery(sql, params = []) {
    const [rows] = await db.query(sql, params);
    return rows.map(addPredictionFields);
}

async function getStats() {
    const [rows] = await db.query(`
        SELECT
            COUNT(*) AS total_markets,
            SUM(CASE WHEN closed = 0 THEN 1 ELSE 0 END) AS open_markets,
            SUM(CASE WHEN closed = 1 THEN 1 ELSE 0 END) AS resolved_markets,
            ROUND(SUM(volume), 2) AS total_volume,
            ROUND(AVG(volume), 2) AS average_volume,
            MAX(volume) AS highest_volume
        FROM markets
    `);

    return rows[0];
}

async function getAllMarkets() {
    return runQuery(`
        SELECT ${marketFields}
        FROM markets
        ORDER BY volume DESC
        LIMIT 75
    `);
}

async function searchMarkets(q, status) {
    let sql = `
        SELECT ${marketFields}
        FROM markets
        WHERE question LIKE ?
    `;

    const params = [`%${q}%`];

    if (status === "open") {
        sql += " AND closed = 0";
    } else if (status === "resolved") {
        sql += " AND closed = 1";
    }

    sql += `
        ORDER BY volume DESC
        LIMIT 100
    `;

    return runQuery(sql, params);
}

async function getOpenTopVolume() {
    return runQuery(`
        SELECT ${marketFields}
        FROM markets
        WHERE closed = 0 AND volume > 0
        ORDER BY volume DESC
        LIMIT 75
    `);
}

async function getResolvedMarkets() {
    return runQuery(`
        SELECT ${marketFields}
        FROM markets
        WHERE closed = 1
        ORDER BY volume DESC
        LIMIT 75
    `);
}

async function getNewestOpen() {
    return runQuery(`
        SELECT ${marketFields}
        FROM markets
        WHERE closed = 0
        ORDER BY created_at DESC
        LIMIT 75
    `);
}

async function getCompetitiveMarkets() {
    const data = await runQuery(`
        SELECT ${marketFields}
        FROM markets
        WHERE closed = 0 AND volume > 0
        ORDER BY volume DESC
        LIMIT 3000
    `);

    return data
        .filter(market =>
            market.highest_probability !== null &&
            market.highest_probability >= 40 &&
            market.highest_probability <= 60
        )
        .slice(0, 75);
}

async function getStrongFavorites() {
    const data = await runQuery(`
        SELECT ${marketFields}
        FROM markets
        WHERE closed = 0 AND volume > 0
        ORDER BY volume DESC
        LIMIT 3000
    `);

    return data
        .filter(market =>
            market.highest_probability !== null &&
            market.highest_probability >= 80
        )
        .slice(0, 75);
}

async function getRandomOpen() {
    return runQuery(`
        SELECT ${marketFields}
        FROM markets
        WHERE closed = 0
        ORDER BY RAND()
        LIMIT 1
    `);
}

module.exports = {
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