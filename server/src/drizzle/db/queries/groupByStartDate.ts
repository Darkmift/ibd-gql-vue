export const groupByStartDate=/*sql*/`
SELECT strftime('%Y-%m-%d', startTime) AS day, COUNT(*) AS count
FROM builds
GROUP BY strftime('%Y-%m-%d', startTime)
ORDER BY day;`