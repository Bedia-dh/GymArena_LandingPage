import express, { Request, Response } from 'express';
import { Testimonial } from '../models/Testimonial';
import { z } from 'zod';

const router = express.Router();

// Validation schema
const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  image: z.string().optional(),
  rating: z.number().min(1).max(5),
  text: z.string().min(10, 'Testimonial text must be at least 10 characters'),
  program: z.enum(['ems', 'crossfit', 'pilates', 'general']).optional(),
  approved: z.boolean().optional(),
  featured: z.boolean().optional(),
});

// Create a testimonial
router.post('/', async (req: Request, res: Response) => {
  try {
    const validationResult = testimonialSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationResult.error.errors,
      });
    }

    const validatedData = validationResult.data;

    const testimonial = new Testimonial({
      ...validatedData,
      approved: validatedData.approved || false,
      featured: validatedData.featured || false,
    });

    const savedTestimonial = await testimonial.save();

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: savedTestimonial,
    });
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create testimonial',
      error: error.message,
    });
  }
});

// Get all testimonials
router.get('/', async (req: Request, res: Response) => {
  try {
    const { approved, featured, program, page = 1, limit = 10 } = req.query;

    const query: any = {};

    if (approved !== undefined) {
      query.approved = approved === 'true';
    }

    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    if (program) {
      query.program = program;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Testimonial.countDocuments(query);

    res.json({
      success: true,
      data: testimonials,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonials',
      error: error.message,
    });
  }
});

// Get testimonial by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      data: testimonial,
    });
  } catch (error: any) {
    console.error('Error fetching testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonial',
      error: error.message,
    });
  }
});

// Update testimonial
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { approved, featured } = req.body;

    const updateData: any = {};
    if (approved !== undefined) updateData.approved = approved;
    if (featured !== undefined) updateData.featured = featured;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial,
    });
  } catch (error: any) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update testimonial',
      error: error.message,
    });
  }
});

// Delete testimonial
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete testimonial',
      error: error.message,
    });
  }
});

export default router;

