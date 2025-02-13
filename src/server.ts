/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import app from './app';
import { config } from './app/config/config';

// database and server connection here
const connectiServerAndb = async () => {
  try {
    // db connection
    await mongoose.connect(config.db_url as string);

    // server connection
    app.listen(config.port, () => {
      console.log('this server start at port ' + config.port);
    });
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
  }
};

connectiServerAndb();
