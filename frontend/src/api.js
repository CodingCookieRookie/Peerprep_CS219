/* ========== API ========== */
// DEV
const DEV_API_URL = "http://localhost:5001/api";
const DEV_MATCH_API_URL = "http://localhost:5004/api";
const DEV_QUESTIONS_API_URL = "http://localhost:5005/api";
// PROD
const PROD_API_URL = "https://users-6i7ougacoq-de.a.run.app/api";
const PROD_MATCH_API_URL = "https://match-6i7ougacoq-de.a.run.app/api";
const PROD_QUESTIONS_API_URL = "https://question-6i7ougacoq-de.a.run.app/api"


/* ========== SOCKETS =========== */
// DEV
const DEV_MSG_API_URL = "http://localhost:5002";
const DEV_EDITOR_API_URL = "http://localhost:5003";
const DEV_MATCH_URL = "http://localhost:5004";
// PROD
const PROD_MSG_API_URL = "https://message-6i7ougacoq-de.a.run.app";
const PROD_EDITOR_API_URL = "https://editor-6i7ougacoq-de.a.run.app";
const PROD_MATCH_URL = "https://match-6i7ougacoq-de.a.run.app";



//* ========= EXPORTS =========== */
// API
export const USER_API_URL = PROD_API_URL || DEV_API_URL;
export const MATCH_API_URL = PROD_MATCH_API_URL || DEV_MATCH_API_URL;
export const QNS_API_URL = PROD_QUESTIONS_API_URL || DEV_QUESTIONS_API_URL;


// Sockets
export const MATCH_URL = PROD_MATCH_URL || DEV_MATCH_URL;
export const MSG_URL = PROD_MSG_API_URL || DEV_MSG_API_URL;
export const EDITOR_URL = PROD_EDITOR_API_URL || DEV_EDITOR_API_URL;


// // API
// export const USER_API_URL = DEV_API_URL;
// export const MATCH_API_URL = DEV_MATCH_API_URL;
// export const QNS_API_URL = DEV_QUESTIONS_API_URL;


// // Sockets
// export const MATCH_URL = DEV_MATCH_URL;
// export const MSG_URL = DEV_MSG_API_URL;
// export const EDITOR_URL = DEV_EDITOR_API_URL;


export var API_HEADERS = {
  Accept: "application/json",
  "Content-type": "application/json; charset=utf-8",
};
