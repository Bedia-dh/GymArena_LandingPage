# 🚀 Testing Arena 45 Backend with Postman

## 📋 Prerequisites

1. **MongoDB must be running** (Local or Atlas)
2. **Backend dependencies installed**
3. **Environment variables configured**
4. **Postman installed**

---

## 🛠 Setup Instructions

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Set Up MongoDB

#### Option A: Local MongoDB

```bash
# Make sure MongoDB is installed and running
mongod
```

#### Option B: MongoDB Atlas (Cloud)

- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cd backend
copy .env.example .env
```

Edit `.env` file:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Configuration
# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/arena45

# For MongoDB Atlas (replace with your connection string):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/arena45?retryWrites=true&w=majority

# Email Configuration (Optional for testing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=info@arena45.com

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Security
JWT_SECRET=test-secret-key
```

### Step 4: Start the Backend Server

```bash
npm run dev
```

You should see:

```
✅ MongoDB Connected: ...
🚀 Arena 45 Backend Server Started!
📡 Server running on http://localhost:3001
```

---

## 📮 Import Postman Collection

1. Open Postman
2. Click "Import" button
3. Select the file: `backend/POSTMAN_COLLECTION.json`
4. Collection will be imported with all requests

---

## 🧪 Test Endpoints

### 1. Health Check (Test Server Connection)

**Request:**

```
GET http://localhost:3001/health
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Arena 45 Backend API is running",
  "timestamp": "2024-12-..."
}
```

---

### 2. Create a Booking

**Request:**

```
POST http://localhost:3001/api/bookings
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "service": "ems",
  "date": "2024-12-25",
  "time": "10:00",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "notes": "First time trying EMS training"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "...",
    "service": "ems",
    "date": "2024-12-25T00:00:00.000Z",
    "time": "10:00",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "notes": "First time trying EMS training",
    "status": "pending",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Test Different Services:**

- `"service": "ems"` - EMS Training
- `"service": "crossfit"` - CrossFit Training
- `"service": "pilates"` - Pilates
- `"service": "consultation"` - Free Consultation

---

### 3. Get All Bookings

**Request:**

```
GET http://localhost:3001/api/bookings
```

**With Filters:**

```
GET http://localhost:3001/api/bookings?page=1&limit=5&status=pending&service=ems
```

**Expected Response:**

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 1,
    "itemsPerPage": 5
  }
}
```

---

### 4. Update Booking Status

**Request:**

```
PATCH http://localhost:3001/api/bookings/{booking_id}
Content-Type: application/json
```

**Body:**

```json
{
  "status": "confirmed"
}
```

**Valid Status Values:**

- `pending` - Initial status
- `confirmed` - Booking confirmed
- `cancelled` - Booking cancelled
- `completed` - Session completed

---

### 5. Delete a Booking

**Request:**

```
DELETE http://localhost:3001/api/bookings/{booking_id}
```

---

### 6. Submit Contact Form

**Request:**

```
POST http://localhost:3001/api/contacts
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry about membership",
  "message": "I would like to know more about your membership plans."
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Contact submission received successfully",
  "data": {
    "_id": "...",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "+1234567890",
    "subject": "Inquiry about membership",
    "message": "...",
    "status": "new",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### 7. Get All Contacts

**Request:**

```
GET http://localhost:3001/api/contacts
```

**With Filters:**

```
GET http://localhost:3001/api/contacts?page=1&limit=10&status=new
```

---

## ⚠️ Validation Error Examples

### Invalid Email

```json
{
  "email": "invalid-email",
  ...
}
```

**Response:**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "code": "invalid_string",
      "message": "Invalid email address",
      "path": ["email"]
    }
  ]
}
```

### Missing Required Field

```json
{
  "service": "ems",
  "date": "2024-12-25"
  // Missing: time, name, email, phone
}
```

### Invalid Service Type

```json
{
  "service": "invalid-service",
  ...
}
```

---

## 🧪 Testing Scenarios

### Scenario 1: Complete Booking Flow

1. Create a booking
2. Get booking by ID
3. Update status to "confirmed"
4. Delete the booking

### Scenario 2: Contact Inquiry

1. Submit contact form
2. List all contacts
3. Update contact status to "read"

### Scenario 3: Filtering and Pagination

1. Create multiple bookings with different services
2. Filter by service: `?service=ems`
3. Filter by status: `?status=pending`
4. Test pagination: `?page=1&limit=2`

### Scenario 4: Rate Limiting

1. Try to submit more than 5 bookings in 15 minutes
2. Should get rate limit error

### Scenario 5: Invalid Data

1. Try to create booking with invalid email
2. Try to create booking with past date
3. Try to create booking with invalid service type

---

## ✅ Success Indicators

✅ Server starts without errors  
✅ Health check returns success  
✅ Booking created and saved to MongoDB  
✅ Contact form submitted successfully  
✅ Data retrievable via GET requests  
✅ Status updates working  
✅ Validation errors displayed properly  
✅ Rate limiting working

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error

**Solution:**

- Make sure MongoDB is running: `mongod`
- Check connection string in `.env`
- For Atlas, check network access settings

### Issue: Port Already in Use

**Solution:**

- Change PORT in `.env` to another port (e.g., 3002)
- Or kill the process using port 3001

### Issue: Cannot Send Emails

**Solution:**

- Email configuration is optional for testing
- Backend will still work without email
- Check SMTP credentials in `.env`

### Issue: CORS Error (if testing from browser)

**Solution:**

- CORS is configured for `http://localhost:3000`
- Adjust `FRONTEND_URL` in `.env` if needed

---

## 📊 Sample Test Data

### Sample Bookings:

```json
{
  "service": "crossfit",
  "date": "2024-12-26",
  "time": "18:00",
  "name": "Mike Johnson",
  "email": "mike.j@example.com",
  "phone": "+1987654321",
  "notes": "Looking forward to trying CrossFit"
}
```

```json
{
  "service": "pilates",
  "date": "2024-12-27",
  "time": "19:00",
  "name": "Emily Davis",
  "email": "emily.d@example.com",
  "phone": "+1555666777",
  "notes": "Prefers morning sessions"
}
```

---

## 🎯 Next Steps

After successful testing:

1. ✅ Backend API is working
2. ➡️ Integrate frontend with backend
3. ➡️ Test complete user flow
4. ➡️ Deploy to production

---

**Ready to test! Import the Postman collection and start testing! 🚀**
