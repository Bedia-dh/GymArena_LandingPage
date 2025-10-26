import express, { Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { Contact } from '../models/Contact';
import { Testimonial } from '../models/Testimonial';
import { User } from '../models/User';

const router = express.Router();

// Get overall statistics
router.get('/', async (req: Request, res: Response) => {
  try {
    // Count all documents
    const [
      totalBookings,
      totalContacts,
      totalTestimonials,
      totalUsers,
      pendingBookings,
      confirmedBookings,
      activeUsers,
    ] = await Promise.all([
      Booking.countDocuments(),
      Contact.countDocuments(),
      Testimonial.countDocuments(),
      User.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
      User.countDocuments({ status: 'active' }),
    ]);

    // Get bookings by service
    const bookingsByService = await Booking.aggregate([
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Get recent bookings (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentBookings = await Booking.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // Get average rating from testimonials
    const avgRating = await Testimonial.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    // Get bookings by status
    const bookingsByStatus = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalBookings,
          totalContacts,
          totalTestimonials,
          totalUsers,
          pendingBookings,
          confirmedBookings,
          activeUsers,
          recentBookings,
          averageRating: avgRating[0]?.avgRating || 0,
        },
        bookingsByService,
        bookingsByStatus,
      },
    });
  } catch (error: any) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message,
    });
  }
});

// Get detailed booking statistics
router.get('/bookings', async (req: Request, res: Response) => {
  try {
    const { period = 'month' } = req.query;

    let dateFilter: Date;

    switch (period) {
      case 'week':
        dateFilter = new Date();
        dateFilter.setDate(dateFilter.getDate() - 7);
        break;
      case 'month':
        dateFilter = new Date();
        dateFilter.setMonth(dateFilter.getMonth() - 1);
        break;
      case 'year':
        dateFilter = new Date();
        dateFilter.setFullYear(dateFilter.getFullYear() - 1);
        break;
      default:
        dateFilter = new Date();
        dateFilter.setMonth(dateFilter.getMonth() - 1);
    }

    const bookings = await Booking.find({
      createdAt: { $gte: dateFilter },
    });

    // Group by date
    const bookingsByDate = bookings.reduce((acc, booking) => {
      const date = booking.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Group by service
    const serviceStats = await Booking.aggregate([
      {
        $match: { createdAt: { $gte: dateFilter } },
      },
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json({
      success: true,
      data: {
        bookingsByDate,
        serviceStats,
        period,
      },
    });
  } catch (error: any) {
    console.error('Error fetching booking statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking statistics',
      error: error.message,
    });
  }
});

export default router;

