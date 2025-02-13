"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
// export all env variable config
exports.config = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    node_env: process.env.NODE_ENV,
    saltRound: process.env.SALT_ROUNDE,
    token_secrate: process.env.TOKEN_SECRATE,
    payment_secrate_key: process.env.STRIPE_SECRATE_KEY,
};
