# 🌍 Wanderlust Adventures - Your Gateway to Exciting Journeys

[Live Demo 🚀](https://wanderlust-adventures-n9wo.onrender.com/)

## 📋 Overview
Wanderlust Adventures is a comprehensive **Node.js + Express** travel booking web application that allows users to discover destinations, book trips, and manage their travel experiences through an intuitive interface powered by EJS templates.

---

## ✨ Key Features

### 👥 User Features
- **User Authentication** - Secure registration and login with bcrypt password hashing
- **Browse Trips** - Explore curated travel packages with detailed information
- **Real-time Weather** - View current weather conditions for destinations via OpenWeather API
- **Currency Exchange** - Check live exchange rates for trip planning
- **Trip Booking** - Easy booking process with date selection
- **Booking Management** - View and cancel bookings with custom confirmation popups
- **Email Notifications** - Receive styled HTML emails for booking confirmations and cancellations
- **User Profile** - Manage personal information and view booking history

### 🛠️ Admin Features
- **Three-Tier Role System** - User → Moderator → Admin access levels
- **Admin Dashboard** - Overview of trips and users with statistics
- **Trip Management** - Add, edit, and delete trips with file upload support
- **User Management** - View all users, search functionality, and role promotion/demotion
- **Search & Filter** - Find trips by name/region and users by name/email/username
- **Image Upload** - Upload trip images with Multer (5MB limit)

### 🎨 UI/UX Features
- **Professional Design** - Consistent cyan/teal theme throughout
- **Card-Based Layouts** - Modern grid displays for trips
- **Custom Popups** - Beautiful confirmation dialogs with animations
- **Responsive Design** - Mobile-friendly interface

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Templating** | EJS (Embedded JavaScript) |
| **Database** | MongoDB Atlas (via Mongoose) |
| **Authentication** | bcryptjs for password hashing<br>express-session for session management |
| **File Upload** | Multer (5MB limit, images only) |
| **Email Service** | Nodemailer with Gmail SMTP |
| **External APIs** | OpenWeather API<br>ExchangeRate API |
| **Config** | dotenv for environment variables |

---

## ⚙️ Setup Instructions

### 1. Clone the repository:
```bash
git clone [repository-url]
cd wanderlust-adventures
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Configure environment variables:

Create a `.env` file in the root directory:
```env
mongodb="your_mongodb_connection_string"
PORT=3000
SECRET_KEY=your_secret_key
OPENWEATHER_API_KEY=your_openweather_api_key
EXCHANGE_API_KEY=your_exchange_rate_api_key
GMAIL_EMAIL=your_email@gmail.com
GMAIL_PASSWORD=your_gmail_app_password
GMAIL_NAME=Wanderlust Adventures
```

### 4. Run the application:
```bash
npm start
```

Visit the app at: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Live Deployment

The application is hosted on Render:  
🔗 [https://wanderlust-adventures-n9wo.onrender.com](https://wanderlust-adventures-n9wo.onrender.com)

---

## 🔮 Future Enhancements

- 💳 Payment gateway integration (Razorpay/Stripe)
- 🌐 Third-party API integration (flights, hotels)
- 📊 Advanced analytics dashboard
- 🌍 Multi-language support
- 💱 Multi-currency pricing
- 🤖 AI-powered trip recommendations
- 📱 Mobile app development
- ⭐ Reviews and ratings system

---

## 👨‍💻 Developer
**Ojasvita Rana**
- GitHub: [@Ojasvita33](https://github.com/Ojasvita33)

---

**Made with ❤️ for travel enthusiasts**

---
