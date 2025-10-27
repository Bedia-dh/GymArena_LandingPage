# 🏋️ Arena 45 - Fitness Training Facility

**Dare to Be Great**

Arena 45 is a modern fitness training facility offering EMS Training, CrossFit, and Pilates. This is a complete full-stack application built with Next.js 15 and Express.js.

![Arena 45](./public/ARENA.png)

## Features

### Frontend

- ✅ **Modern UI** - Built with Next.js 15, TypeScript, and Tailwind CSS
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dynamic Content** - Programs and testimonials from backend
- ✅ **Booking System** - Book training sessions online
- ✅ **Contact Form** - Send inquiries to facility
- ✅ **Toast Notifications** - User feedback with Sonner
- ✅ **shadcn/ui** - Beautiful UI components

### Backend

- ✅ **RESTful API** - Express.js with TypeScript
- ✅ **Database** - MongoDB with Mongoose
- ✅ **User Management** - Register, login, and authentication
- ✅ **Booking System** - Full CRUD operations
- ✅ **Email Notifications** - Nodemailer for confirmations
- ✅ **Security** - Rate limiting, CORS, Helmet
- ✅ **Validation** - Zod schema validation

## 📚 Tech Stack

### Frontend

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.9
- **Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Form Handling:** React Hook Form + Zod
- **Notifications:** Sonner

### Backend

- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript
- **Security:** Helmet, CORS, Rate Limiting
- **Validation:** Zod
- **Email:** Nodemailer
- **Password:** bcryptjs

## 🏗️ Project Structure

```
Arena 45/
├── app/                    # Next.js app directory
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── arena-*.tsx       # Feature components
│   └── ui/               # UI components
├── lib/
│   └── api.ts            # API client
├── backend/              # Express.js backend
│   ├── src/
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── config/       # Configuration
│   │   └── server.ts     # Express server
│   ├── package.json
│   └── tsconfig.json
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or pnpm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Bedia-dh/Gym_Arena_Landing.git
cd Gym_Arena_Landing
```

2. **Install frontend dependencies**

```bash
npm install
```

3. **Install backend dependencies**

```bash
cd backend
npm install
```

4. **Set up environment variables**

**Frontend `.env.local`:**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend `.env`:**

```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/arena45
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=info@arena45.com
FRONTEND_URL=http://localhost:3000
```

5. **Start MongoDB**

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

6. **Start the backend**

```bash
cd backend
npm run dev
```

7. **Start the frontend**

```bash
# In root directory
npm run dev
```

8. **Open browser**

```
http://localhost:3000
```

## 📡 API Endpoints

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List all
- `GET /api/bookings/:id` - Get by ID
- `PATCH /api/bookings/:id` - Update status
- `DELETE /api/bookings/:id` - Delete

### Contacts

- `POST /api/contacts` - Submit contact
- `GET /api/contacts` - List all
- `GET /api/contacts/:id` - Get by ID
- `PATCH /api/contacts/:id` - Update status

### Users

- `POST /api/users/register` - Register
- `POST /api/users/login` - Login
- `GET /api/users` - List all
- `GET /api/users/:id` - Get by ID
- `PATCH /api/users/:id` - Update
- `DELETE /api/users/:id` - Delete

### Programs

- `GET /api/programs` - List all
- `GET /api/programs/:slug` - Get by slug
- `POST /api/programs` - Create
- `PATCH /api/programs/:id` - Update
- `DELETE /api/programs/:id` - Delete

### Testimonials

- `GET /api/testimonials` - List all
- `POST /api/testimonials` - Create
- `PATCH /api/testimonials/:id` - Update
- `DELETE /api/testimonials/:id` - Delete

### Statistics

- `GET /api/stats` - Overall stats
- `GET /api/stats/bookings` - Booking analytics

## 🧪 Testing with Postman

Import the Postman collection:

```bash
backend/POSTMAN_COLLECTION.json
```

## 📊 Database Collections

- **bookings** - Training session bookings
- **contacts** - Contact form submissions
- **users** - User accounts (admin/member/trainer)
- **programs** - Training programs
- **testimonials** - Customer reviews

## 🔒 Security Features

- ✅ Helmet.js - Security headers
- ✅ CORS - Cross-origin protection
- ✅ Rate Limiting - Prevent abuse
- ✅ Input Validation - Zod schemas
- ✅ Password Hashing - bcrypt
- ✅ Environment Variables - Secure config

## 🎨 UI Components

Built with shadcn/ui:

- Cards, Buttons, Inputs
- Forms, Dialogs, Alerts
- Calendar, Select, Textarea
- And 50+ more components

## 📧 Email Features

- Customer booking confirmations
- Admin notifications for new bookings
- Contact inquiry notifications
- HTML formatted emails

## 🚀 Deployment

### Frontend (Vercel)

```bash
vercel deploy
```

### Backend (Vercel/Heroku/Railway)

Configure environment variables and deploy.

### Database

Use MongoDB Atlas for cloud hosting.

## 📝 License

MIT License

## 👨‍💻 Author

**Bedia**

- GitHub: [@Bedia-dh](https://github.com/Bedia-dh)

## 🙏 Acknowledgments

- Next.js team
- shadcn for UI components
- All open-source contributors

---
