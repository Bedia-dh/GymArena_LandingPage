import mongoose, { Schema, Document } from 'mongoose';

export interface IProgram extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  features: string[];
  price?: number;
  duration: string;
  sessionsPerWeek?: number;
  image?: string;
  icon: string;
  isFeatured: boolean;
  available: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
    },
    duration: {
      type: String,
      required: true,
    },
    sessionsPerWeek: {
      type: Number,
    },
    image: {
      type: String,
    },
    icon: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: 'programs',
  }
);

// Indexes
ProgramSchema.index({ slug: 1 });
ProgramSchema.index({ available: 1 });
ProgramSchema.index({ isFeatured: 1 });
ProgramSchema.index({ order: 1 });

export const Program = mongoose.model<IProgram>('Program', ProgramSchema);

