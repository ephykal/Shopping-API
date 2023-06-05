const dotenv = require('dotenv');

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://ephraimolu6:${MONGO_PASSWORD}@clustereshop.ozwhu75.mongodb.net/?retryWrites=true&w=majority`


// export const config = {
// 	mongo: {
// 		url: MONGO_URL,
// 	}
// }