const stats = { hits: 0, misses: 0, totalRequests: 0 };
const logs = [];

module.exports = {
    getStats: () => stats,
    getLogs: () => logs,
    logHit: (service, message) => {
        stats.hits++;
        stats.totalRequests++;
        logs.push({ time: new Date().toLocaleTimeString(), type: "CACHE HIT", service, message });
    },
    logMiss: (service, message) => {
        stats.misses++;
        stats.totalRequests++;
        logs.push({ time: new Date().toLocaleTimeString(), type: "CACHE MISS", service, message });
    }
};
