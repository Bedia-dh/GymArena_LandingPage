import express, { Request, Response } from 'express';
import { Program } from '../models/Program';
import { z } from 'zod';

const router = express.Router();

// Validation schema
const programSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  shortDescription: z.string().min(10, 'Short description required'),
  features: z.array(z.string()).optional(),
  price: z.number().optional(),
  duration: z.string().min(1, 'Duration is required'),
  sessionsPerWeek: z.number().optional(),
  image: z.string().optional(),
  icon: z.string().min(1, 'Icon is required'),
  isFeatured: z.boolean().optional(),
  available: z.boolean().optional(),
  order: z.number().optional(),
});

// Create a program
router.post('/', async (req: Request, res: Response) => {
  try {
    const validationResult = programSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationResult.error.errors,
      });
    }

    const validatedData = validationResult.data;

    const program = new Program({
      ...validatedData,
      features: validatedData.features || [],
      isFeatured: validatedData.isFeatured || false,
      available: validatedData.available !== undefined ? validatedData.available : true,
      order: validatedData.order || 0,
    });

    const savedProgram = await program.save();

    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: savedProgram,
    });
  } catch (error: any) {
    console.error('Error creating program:', error);
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Program with this slug already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create program',
      error: error.message,
    });
  }
});

// Get all programs
router.get('/', async (req: Request, res: Response) => {
  try {
    const { available, featured } = req.query;

    const query: any = {};

    if (available !== undefined) {
      query.available = available === 'true';
    }

    if (featured !== undefined) {
      query.isFeatured = featured === 'true';
    }

    const programs = await Program.find(query)
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: programs,
      count: programs.length,
    });
  } catch (error: any) {
    console.error('Error fetching programs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch programs',
      error: error.message,
    });
  }
});

// Get program by slug or ID
router.get('/:identifier', async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;

    const program = await Program.findOne({
      $or: [
        { slug: identifier },
        { _id: identifier },
      ],
    });

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
      });
    }

    res.json({
      success: true,
      data: program,
    });
  } catch (error: any) {
    console.error('Error fetching program:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch program',
      error: error.message,
    });
  }
});

// Update program
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
      });
    }

    res.json({
      success: true,
      message: 'Program updated successfully',
      data: program,
    });
  } catch (error: any) {
    console.error('Error updating program:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update program',
      error: error.message,
    });
  }
});

// Delete program
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
      });
    }

    res.json({
      success: true,
      message: 'Program deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting program:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete program',
      error: error.message,
    });
  }
});

export default router;

