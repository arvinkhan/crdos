const express = require('express');
const router = express.Router();
const resultService = require('../services/resultService');
const cache = require('../cache/cacheStore');
const logger = require('../utils/logger');

router.get('/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    const key = `/api/result/${studentId}`;
    
    const cached = cache.get(key);

    if (cached) {
        logger.logHit('RESULT', `User requested Result [${studentId}] (Served from Cache ⚡)`);
        return res.json(cached);
    }

    logger.logMiss('RESULT', `User requested Result [${studentId}] (Calculated by Main Server 🐢)`);

    try {
        const data = await resultService.fetchResult(studentId);
        cache.set(key, data, 60000); 
        res.json(data);
    } catch(err) {
        res.status(500).send("Backend request failed");
    }
});

module.exports = router;
