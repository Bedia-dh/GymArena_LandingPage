// API Client for Arena 45 Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'Request failed',
      }));
      
      // Show detailed error for validation errors
      if (response.status === 400 && errorData.errors) {
        const validationErrors = errorData.errors
          .map((err: any) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        throw new Error(`Validation error: ${validationErrors}`);
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// Booking Types
export interface BookingData {
  service: 'ems' | 'crossfit' | 'pilates' | 'consultation';
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface Booking extends BookingData {
  _id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// Contact Types
export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface Contact extends ContactData {
  _id: string;
  status: 'new' | 'read' | 'replied' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

// Program Types
export interface Program {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

// Testimonial Types
export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  image?: string;
  rating: number;
  text: string;
  program?: 'ems' | 'crossfit' | 'pilates' | 'general';
  approved: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Functions

// Bookings
export const bookingApi = {
  create: async (data: BookingData): Promise<ApiResponse<Booking>> => {
    return apiRequest('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    service?: string;
    date?: string;
  }): Promise<ApiResponse<Booking[]>> => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const query = queryParams.toString();
    return apiRequest(`/api/bookings${query ? `?${query}` : ''}`);
  },

  getById: async (id: string): Promise<ApiResponse<Booking>> => {
    return apiRequest(`/api/bookings/${id}`);
  },

  updateStatus: async (id: string, status: string): Promise<ApiResponse<Booking>> => {
    return apiRequest(`/api/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiRequest(`/api/bookings/${id}`, { method: 'DELETE' });
  },
};

// Contacts
export const contactApi = {
  submit: async (data: ContactData): Promise<ApiResponse<Contact>> => {
    return apiRequest('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<Contact[]>> => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const query = queryParams.toString();
    return apiRequest(`/api/contacts${query ? `?${query}` : ''}`);
  },

  getById: async (id: string): Promise<ApiResponse<Contact>> => {
    return apiRequest(`/api/contacts/${id}`);
  },

  updateStatus: async (id: string, status: string): Promise<ApiResponse<Contact>> => {
    return apiRequest(`/api/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

// Programs
export const programsApi = {
  getAll: async (params?: {
    available?: boolean;
    featured?: boolean;
  }): Promise<ApiResponse<Program[]>> => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const query = queryParams.toString();
    return apiRequest(`/api/programs${query ? `?${query}` : ''}`);
  },

  getBySlug: async (slug: string): Promise<ApiResponse<Program>> => {
    return apiRequest(`/api/programs/${slug}`);
  },

  create: async (data: Omit<Program, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Program>> => {
    return apiRequest('/api/programs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<Program>): Promise<ApiResponse<Program>> => {
    return apiRequest(`/api/programs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiRequest(`/api/programs/${id}`, { method: 'DELETE' });
  },
};

// Testimonials
export const testimonialsApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    approved?: boolean;
    featured?: boolean;
    program?: string;
  }): Promise<ApiResponse<Testimonial[]>> => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const query = queryParams.toString();
    return apiRequest(`/api/testimonials${query ? `?${query}` : ''}`);
  },

  getById: async (id: string): Promise<ApiResponse<Testimonial>> => {
    return apiRequest(`/api/testimonials/${id}`);
  },

  create: async (data: Omit<Testimonial, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Testimonial>> => {
    return apiRequest('/api/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: { approved?: boolean; featured?: boolean }): Promise<ApiResponse<Testimonial>> => {
    return apiRequest(`/api/testimonials/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiRequest(`/api/testimonials/${id}`, { method: 'DELETE' });
  },
};

// Statistics
export const statsApi = {
  getOverall: async () => {
    return apiRequest('/api/stats');
  },

  getBookingStats: async (period: 'week' | 'month' | 'year' = 'month') => {
    return apiRequest(`/api/stats/bookings?period=${period}`);
  },
};

// Health Check
export const healthApi = {
  check: async () => {
    return apiRequest('/health');
  },
};

