const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUovZmc2SWYwaHFsaUlRaUs4NC9QMUpLdnFiQzhXbGsrUnBYYVNUZW0zUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQzEySkNTZThnQ0NjbUtPcEZsa25NcHNaT0VERjdMcTM3c2liNGhhL2J3cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvTnFGRmlKT3JTZUdqVmpGQ08vNlRhVkNJZFBrdzBnOWdvRnN3cEt6T0VnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJobnNoSFQ0QWtBZDFRTjdzOFNxUWtmLzMvTFJJa1gzZ3ZoZDN5SEJCVEZnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9CSmVNNUJCUVFXdWUzUml1MVZSeTAydmVpZUw5Z2hmeWxxbnFVR09xVVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ink1K3RtNHFWbUlBYk1RaUJ5czRLckhzQUJqL0l5Zzdnd1o3UFhuc2paR3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU5tby93SVA4UkRyZGl4T2NUbDNUME5kZkMwTTduQzhNZkptVWRYSVhWMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWgyQTVjZks1TkFSSll1dEQ4Mzl3MDJjVGFXY0VBNXVtSVpSbURHYjZIST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlllclBHcWJKRVFIZFdHc05kUGNVK09YOERteXpBZGlVSThoaGtZV1hwMkdxQWJRRktlNmJoNHpFSkpYZFlIeENIQjcwcGJ2R3BKajhzbmpjcXlhSkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI5LCJhZHZTZWNyZXRLZXkiOiJXR1l6WjcrSTgrVW1RWUg3S0ZLN09HdUxOM2dhVE9vSEh2V0ZmS2tsdDlVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI4bmR5VzBkSFM1aVFDaFFzclRiU3FBIiwicGhvbmVJZCI6IjA3YTIxOTk3LWUyOGUtNDRlYS1hZDhmLWVmMjE2NDdkOWVmNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMQU12b1A1ZmRJN2p6Tk9DSktCMlhJNFVIWTQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZkluQkt0QjhBRjd4ZHhCMFJXbkZocVBDRGJnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJGUjI2S0xNIiwibWUiOnsiaWQiOiIyNzc4MTY3MzAyMjoxMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLDikFCIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPVEJ2SjRERUtqaitMMEdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJIYjZkeHMxdkhkMmNEZ3BKRDZaVXhRZDErY2ZFTmpHdFVyNjVJTXlGcVhJPSIsImFjY291bnRTaWduYXR1cmUiOiJhVlBpVGZhTExKRXhIMm9mOFZiUlpIdXMvTDRObEhSWU8rempmTjh6TkVQVEt1NWNMYmhTUFhSVWNhVkFXcjBYVWdEVlR4ZlRjN3JqRTJhYm01b0dDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSktNUFBRNlJaR3F2Mm5zU3FhanRiZUNzM3BKSXpoK0lUdkJtdHdGcXByTVhRSDlyTkpWd0d0THdRRGtaOUc4QUtSYXpVbzhHY3RCdWhWUWRWSGIxQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzc4MTY3MzAyMjoxMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSMituY2JOYngzZG5BNEtTUSttVk1VSGRmbkh4RFl4clZLK3VTRE1oYWx5In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwNTE3ODEzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUwwWSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "drchanda",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27781673022",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'drchanda',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    TIMNASA_TMD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
