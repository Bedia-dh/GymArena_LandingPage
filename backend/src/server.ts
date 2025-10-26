import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import bookingRoutes from './routes/bookings';
import contactRoutes from './routes/contacts';
import userRoutes from './routes/users';
import programRoutes from './routes/programs';
import testimonialRoutes from './routes/testimonials';
import statsRoutes from './routes/stats';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Arena 45 Backend API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/stats', statsRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to Arena 45 Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      bookings: '/api/bookings',
      contacts: '/api/contacts',
      users: '/api/users',
      programs: '/api/programs',
      testimonials: '/api/testimonials',
      stats: '/api/stats',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start listening
    app.listen(PORT, () => {
      console.log('\n🚀 Arena 45 Backend Server Started!');
      console.log(`📡 Server running on http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`\n📋 Available Endpoints:`);
      console.log(`   GET  /health`);
      console.log(`   POST /api/bookings - Create a booking`);
      console.log(`   GET  /api/bookings - List all bookings`);
      console.log(`   POST /api/contacts - Submit contact form`);
      console.log(`   GET  /api/contacts - List all contacts`);
      console.log(`   POST /api/users/register - Register new user`);
      console.log(`   POST /api/users/login - User login`);
      console.log(`   GET  /api/programs - List all programs`);
      console.log(`   GET  /api/testimonials - List testimonials`);
      console.log(`   GET  /api/stats - Get statistics`);
      console.log('\n✨ Backend ready to accept requests!\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

startServer();

export default app;

