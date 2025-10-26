# Arena 45 Backend API

Express.js + MongoDB backend for Arena 45 fitness training facility.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MongoDB

**Option A: Use Local MongoDB**

- Make sure MongoDB is installed and running
- Connection string: `mongodb://localhost:27017/arena45`

**Option B: Use MongoDB Atlas (Cloud)**

- Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string
- Update `.env` file with your connection string

### 3. Configure Environment

```bash
# Copy example file
copy .env.example .env

# Edit .env and add your MongoDB URI and email settings
```

```env
# Required
MONGODB_URI=mongodb://localhost:27017/arena45

# Optional (for email functionality)
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 4. Run the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

Server will start on `http://localhost:3001`

## 📡 API Endpoints

### Health Check

```
GET /health
```

### Bookings

```
POST   /api/bookings      - Create booking
GET    /api/bookings      - List bookings
GET    /api/bookings/:id  - Get booking by ID
PATCH  /api/bookings/:id  - Update booking status
DELETE /api/bookings/:id  - Delete booking
```

### Contacts

```
POST   /api/contacts      - Submit contact form
GET    /api/contacts      - List contacts
GET    /api/contacts/:id  - Get contact by ID
PATCH  /api/contacts/:id  - Update contact status
```

## 🧪 Testing with Postman

1. Import `POSTMAN_COLLECTION.json` into Postman
2. Start the server: `npm run dev`
3. Test endpoints using the collection

See `POSTMAN_TESTING_GUIDE.md` for detailed testing instructions.

## 📚 API Usage Examples

### Create Booking

```bash
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "service": "ems",
    "date": "2024-12-25",
    "time": "10:00",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }'
```

### Get All Bookings

```bash
curl http://localhost:3001/api/bookings
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── models/          # Mongoose models
│   ├── config/          # Configuration files
│   ├── routes/          # API routes
│   └── server.ts        # Express server
├── package.json
├── tsconfig.json
└── .env                 # Environment variables
```

## 🔒 Security Features

- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ Rate limiting (express-rate-limit)
- ✅ Input validation (Zod)
- ✅ Environment variable protection

## 📧 Email Features

- ✅ Automatic customer confirmation emails
- ✅ Admin notification emails for new bookings
- ✅ Contact form notifications

## 🛠 Tech Stack

- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript
- **Validation:** Zod
- **Email:** Nodemailer
- **Security:** Helmet, CORS, Rate Limiting

## 📝 License

ISC
