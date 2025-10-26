import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { IBooking } from '../models/Booking';

dotenv.config();

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendBookingConfirmation = async (booking: IBooking) => {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || 'info@arena45.com';

  // Format date for display
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const serviceNames = {
    ems: 'EMS Training',
    crossfit: 'CrossFit Training',
    pilates: 'Pilates',
    consultation: 'Free Consultation',
  };

  // Email to customer
  const customerMailOptions = {
    from: `Arena 45 <${process.env.SMTP_USER}>`,
    to: booking.email,
    subject: `Booking Confirmation - ${serviceNames[booking.service as keyof typeof serviceNames]}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #fbbf24;">✅ Booking Confirmed</h2>
        
        <p>Hello ${booking.name},</p>
        
        <p>Thank you for booking with <strong>Arena 45</strong>! Your session has been confirmed.</p>
        
        <div style="background-color: #1f2937; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #fbbf24; margin-top: 0;">Booking Details</h3>
          <p style="color: #f3f4f6;"><strong>Service:</strong> ${serviceNames[booking.service as keyof typeof serviceNames]}</p>
          <p style="color: #f3f4f6;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="color: #f3f4f6;"><strong>Time:</strong> ${booking.time}</p>
        </div>
        
        <p style="color: #9ca3af;">We're located at:<br>
        123 Fitness Street<br>
        Downtown District</p>
        
        <p style="color: #9ca3af;">If you have any questions or need to reschedule, please contact us at:<br>
        📞 (555) 123-ARENA<br>
        📧 info@arena45.com</p>
        
        <p style="color: #fbbf24; font-weight: bold;">Dare to Be Great!</p>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Best regards,<br>
          The Arena 45 Team
        </p>
      </div>
    `,
  };

  // Email to admin
  const adminMailOptions = {
    from: `Arena 45 <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Booking: ${serviceNames[booking.service as keyof typeof serviceNames]} - ${booking.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #fbbf24;">🔔 New Booking Received</h2>
        
        <div style="background-color: #1f2937; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #fbbf24; margin-top: 0;">Customer Information</h3>
          <p style="color: #f3f4f6;"><strong>Name:</strong> ${booking.name}</p>
          <p style="color: #f3f4f6;"><strong>Email:</strong> ${booking.email}</p>
          <p style="color: #f3f4f6;"><strong>Phone:</strong> ${booking.phone}</p>
          
          <h3 style="color: #fbbf24; margin-top: 20px;">Booking Details</h3>
          <p style="color: #f3f4f6;"><strong>Service:</strong> ${serviceNames[booking.service as keyof typeof serviceNames]}</p>
          <p style="color: #f3f4f6;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="color: #f3f4f6;"><strong>Time:</strong> ${booking.time}</p>
          
          ${booking.notes ? `<p style="color: #f3f4f6;"><strong>Notes:</strong><br>${booking.notes}</p>` : ''}
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          Status: <strong>${booking.status}</strong><br>
          Booking ID: ${booking._id}<br>
          Created: ${new Date(booking.createdAt).toLocaleString()}
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(customerMailOptions);
    console.log(`✅ Confirmation email sent to ${booking.email}`);
    
    await transporter.sendMail(adminMailOptions);
    console.log(`✅ Notification email sent to admin`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

export const sendContactNotification = async (contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}) => {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || 'info@arena45.com';

  const adminMailOptions = {
    from: `Arena 45 <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Contact Form: ${contactData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #fbbf24;">📧 New Contact Form Submission</h2>
        
        <div style="background-color: #1f2937; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #f3f4f6;"><strong>From:</strong> ${contactData.name}</p>
          <p style="color: #f3f4f6;"><strong>Email:</strong> ${contactData.email}</p>
          ${contactData.phone ? `<p style="color: #f3f4f6;"><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
          <p style="color: #f3f4f6;"><strong>Subject:</strong> ${contactData.subject}</p>
          
          <h3 style="color: #fbbf24; margin-top: 20px;">Message:</h3>
          <p style="color: #f3f4f6; white-space: pre-wrap;">${contactData.message}</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    console.log(`✅ Contact notification sent to admin`);
  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    throw error;
  }
};

