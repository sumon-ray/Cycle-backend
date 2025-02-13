import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

// export all env variable config
export const config = {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  node_env: process.env.NODE_ENV,
  saltRound: process.env.SALT_ROUNDE,
  token_secrate: process.env.TOKEN_SECRATE,
  payment_secrate_key: process.env.STRIPE_SECRATE_KEY,
};
