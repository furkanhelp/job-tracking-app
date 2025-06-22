<h1 align="center">Job Tracking App</h1>

<div align="center">
  <h3>
    <a href="https://jobtrackingappp.netlify.app/" color="white">
      Live Demo
    </a> 
  </h3>
</div>

<br>
<br>
<br>

## 📸 Preview
<p>Light</p>

![Screenshot 2025-06-22 174207](https://github.com/user-attachments/assets/9cd5ab1e-1b5e-44f3-9158-9c991b0b1dc2)
![Screenshot 2025-06-22 174144](https://github.com/user-attachments/assets/29f45500-26ba-46a9-8e9d-d8fb2a2606da)
![Screenshot 2025-06-22 174103](https://github.com/user-attachments/assets/5f2de57a-cf06-44ad-919d-37a1c2ec2aa0)

<p>Dark</p> 

![Screenshot 2025-06-22 174751](https://github.com/user-attachments/assets/ea2e62e9-bfdf-4afe-b9aa-d92bc03ea646)
![Screenshot 2025-06-22 174728](https://github.com/user-attachments/assets/f066ad50-6815-42c8-a7d8-0dca242e29a3)
![Screenshot 2025-06-22 174426](https://github.com/user-attachments/assets/d8776304-a45b-42b0-9510-09136e1cdc32)
![Screenshot 2025-06-22 174356](https://github.com/user-attachments/assets/fdd7aa1a-dc21-4fd4-9c67-b4d276f6d737)

 
## 💼 Job Tracking App 
A full-stack, modern Job Tracking Application designed to help users manage their job search efficiently. Built using the latest web technologies like Next.js, Prisma, Clerk Authentication, Recharts, and Tailwind CSS, this app focuses on clean UI, seamless UX, and robust functionality.


## ✨ Features
🧑‍💼 User Authentication with Clerk

📄 Add/Edit/Delete Jobs (position, company, status, etc.)

📊 Beautiful Charts powered by Recharts

📅 Track Job Status (Interview, Declined, Pending, etc.)

🔎 Search & Filter by job status, type, and more

📈 Stats Dashboard with visual insights

🧪 Mock Data Integration with Mockaroo for realistic development data

🌙 Dark Mode 

## 🛠️ Tech Stack
Tech	Description
Next.js	React-based full-stack framework
TypeScript	Typed JavaScript for more reliable code
Prisma	ORM for interacting with PostgreSQL
Clerk	Modern authentication for Next.js
Recharts	Lightweight chart library for data visualization
Tailwind CSS	Utility-first CSS framework
PostgreSQL	Relational database used with Prisma
Vercel (optional)	Deployment platform for frontend

## 🧰 How to Run Locally

bash

git clone https://github.com/furkanhelp/job-tracking-app.git
cd job-tracking-app
npm install

--Set up your environment variables--
env

DATABASE_URL=your_postgresql_database_url
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

--Then run the development server--
bash

npx prisma generate
npx prisma db push
npm run dev

## 🧪 Sample Data
During development, I used Mockaroo to generate realistic sample job data, which helped in stress-testing and UI optimization for real-world use cases.

## 📊 Recharts Integration
The dashboard utilizes Recharts to display:

Number of applications per status

Trends over time

Category-wise job breakdowns

This allows users to quickly gain insight into their job hunt progress.

## 🔐 Authentication with Clerk
The app uses Clerk to handle:

Secure user sessions

Login/Sign up flows

Protecting private routes

## 🎯 Why I Built This
As a passionate developer, I wanted to solve a real problem many job seekers face: managing job applications. This app was built from scratch with modern tooling and clean code structure. It reflects both my frontend and backend capabilities, along with my attention to UI/UX.

## 📌 Future Improvements
Email reminders for interviews or follow-ups

Job board integrations (LinkedIn, Indeed API)

Advanced analytics and exportable reports

Admin panel (for testing or company HR tools)


## 📬 Contact
If you like this project or want to collaborate:

[GitHub](https://github.com/furkanhelp)

[LinkedIn](https://www.linkedin.com/in/furkanyardm/)

Email: frknyrdm0@gmail.com

Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).