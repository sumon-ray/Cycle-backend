/* eslint-disable no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { cycleRouter } from './app/moduler/create-cycle/cycle-router';
import { userRoute } from './app/moduler/users/user.router';
import { ZodError } from 'zod';
import { auth } from './app/moduler/auth/usetAuthRouter';
import { paymentRouter } from './app/moduler/payment/payment-route';
import { orderPaymentRouter } from './app/moduler/paymentHist/paymentHist.router';
const app = express();

// JSON body parser and url-encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

// Router connection middleware
app.use('/api/products', cycleRouter.router);
app.use('/api/createUser', userRoute.router);
app.use('/api/login', auth.router);
app.use('/api/create-payment', paymentRouter.router);
app.use('/api/create-order', orderPaymentRouter.router);
// demo router for testing
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World',
    success: true,
    data: 'Welcome Our Site',
  });
});
// global generic error handel middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const isValidationError = err.name === 'ValidationError';
  const statusCode = isValidationError ? 400 : err.statusCode || 500;

  // Extract ZodError messages if the error is an instance of ZodError
  let zodErrors: string[] = [];
  if (err instanceof ZodError) {
    zodErrors = err.errors.map(
      (item) => `${item.message} at ${item.path.join('.')}`,
    );
  }

  
  const errorResponse = {
    message: isValidationError
      ? 'Validation failed'
      : zodErrors.length > 0
        ? zodErrors.join('; ')
        : err.message || 'An unexpected error occurred',
    success: false,
    error: isValidationError ? err : { name: err.name || 'Error' },
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  };

  res.status(statusCode).json(errorResponse);
});
export default app;
