# 🔗 Frontend-Backend Integration Plan

## 📋 How It Will Work

### **Architecture**
```
┌─────────────────────┐         ┌─────────────────────┐
│   Frontend (Next.js)│ ───────▶│  Backend (Express)  │
│   localhost:3000    │  HTTP   │  localhost:3001     │
│                     │◀────────│                     │
└─────────────────────┘         └─────────────────────┘
                                        │
                                        ▼
                                ┌─────────────────────┐
                                │   MongoDB Database   │
                                │   localhost:27017    │
                                └─────────────────────┘
```

---

## 🔄 Integration Steps

### **1. API Client Layer** (`lib/api.ts`)
Create a centralized API client to handle all backend requests.

**Features:**
- ✅ Type-safe API calls
- ✅ Automatic error handling
- ✅ Response typing
- ✅ Base URL configuration

### **2. Update Components**
Modify existing components to use the API client:

- ✅ **arena-booking.tsx** - Submit bookings to backend
- ✅ **arena-contact.tsx** - Submit contact forms to backend
- ✅ **arena-programs.tsx** - Fetch programs from backend
- ✅ **arena-testimonials.tsx** - Fetch testimonials from backend

### **3. Environment Configuration**
- ✅ Add backend URL to environment variables
- ✅ Configure API endpoints

### **4. State Management**
- ✅ Handle loading states
- ✅ Handle error states
- ✅ Success notifications (toast messages)

### **5. Form Handling**
- ✅ Replace console.log with API calls
- ✅ Add form validation
- ✅ Show loading indicators during submission
- ✅ Display success/error messages

---

## 📡 API Client Implementation

```typescript
// lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

// Booking API
export const bookingApi = {
  create: async (data) => 
    apiRequest('/api/bookings', { method: 'POST', body: JSON.stringify(data) }),
  getAll: async () => 
    apiRequest('/api/bookings'),
};

// Contact API
export const contactApi = {
  submit: async (data) => 
    apiRequest('/api/contacts', { method: 'POST', body: JSON.stringify(data) }),
};

// Programs API
export const programsApi = {
  getAll: async () => 
    apiRequest('/api/programs'),
  getFeatured: async () => 
    apiRequest('/api/programs?featured=true'),
};

// Testimonials API
export const testimonialsApi = {
  getAll: async () => 
    apiRequest('/api/testimonials?approved=true&featured=true'),
  getByProgram: async (program) => 
    apiRequest(`/api/testimonials?program=${program}&approved=true`),
};

// Stats API
export const statsApi = {
  getOverall: async () => 
    apiRequest('/api/stats'),
  getBookingStats: async (period) => 
    apiRequest(`/api/stats/bookings?period=${period}`),
};
```

---

## 🎯 Component Updates

### **arena-booking.tsx Changes**
```typescript
// Before (current):
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Booking submitted:", formData);
}

// After (with API integration):
import { bookingApi } from "@/lib/api";
import { useState } from "react";

const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);
  
  try {
    await bookingApi.create(formData);
    setSuccess(true);
    // Reset form
    setFormData({ service: "", date: "", time: "", name: "", email: "", phone: "", notes: "" });
  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

### **arena-contact.tsx Changes**
```typescript
// Similar pattern for contact form
import { contactApi } from "@/lib/api";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await contactApi.submit(formData);
    // Show success message
  } catch (err) {
    // Show error message
  }
};
```

---

## 🔧 Implementation Plan

### **Step 1: Create API Client** ✅
- Create `lib/api.ts` with API helper functions

### **Step 2: Update Booking Component** ✅
- Replace console.log with API call
- Add loading/error states
- Add toast notifications

### **Step 3: Update Contact Component** ✅
- Connect to backend API
- Add form validation
- Handle responses

### **Step 4: Update Programs Component** ✅
- Fetch programs from backend
- Make content dynamic

### **Step 5: Update Testimonials Component** ✅
- Fetch testimonials from backend
- Display real data

### **Step 6: Add Toast Notifications** ✅
- Install sonner (already in dependencies)
- Add success/error toasts

---

## 🚀 Running the Complete System

### **Terminal 1: Backend**
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:3001
```

### **Terminal 2: Frontend**
```bash
npm run dev
# App runs on http://localhost:3000
```

### **Terminal 3: MongoDB** (if using local)
```bash
mongod
# Database runs on localhost:27017
```

---

## 📝 Environment Variables

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend `.env`:**
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/arena45
FRONTEND_URL=http://localhost:3000
```

---

## ✅ Expected Behavior

1. **User fills booking form** → Frontend component
2. **Form submits** → API client sends request
3. **Backend receives** → Validates and saves to MongoDB
4. **Email sent** → Customer receives confirmation
5. **Success response** → Frontend shows success message
6. **User sees confirmation** → Toast notification appears

---

## 🎯 Benefits

✅ **Separation of Concerns** - Backend handles business logic  
✅ **Type Safety** - TypeScript ensures correct data types  
✅ **Error Handling** - Centralized error management  
✅ **Reusability** - API functions used across components  
✅ **Scalability** - Easy to add new endpoints  
✅ **Testability** - API layer can be mocked for testing  

---

## 🐛 Troubleshooting

**CORS Errors:**
- Backend already configured to allow `http://localhost:3000`

**Network Errors:**
- Make sure backend is running on port 3001
- Check environment variables

**Form Not Submitting:**
- Check browser console for errors
- Verify API endpoint URLs
- Check backend logs

---

Ready to implement! Let's start with the API client. 🚀

