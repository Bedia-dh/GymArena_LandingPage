import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  image?: string;
  rating: number;
  text: string;
  program?: string;
  approved: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    text: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      enum: ['ems', 'crossfit', 'pilates', 'general'],
    },
    approved: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'testimonials',
  }
);

// Indexes
TestimonialSchema.index({ approved: 1 });
TestimonialSchema.index({ featured: 1 });
TestimonialSchema.index({ createdAt: -1 });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

