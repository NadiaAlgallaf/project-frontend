# CareerConnect

## Overview

Career Connect is a full-stack job platform designed to connect Job Seekers with Employers. The application allows Employers to create and manage job postings, while Job Seekers can browse, search, filter, and apply for available opportunities.

The platform includes JWT authentication and role-based access, providing different functionality for Employers and Job Seekers. Employers can manage their job listings, review applications, and schedule interviews using a selected date and time. Job Seekers can apply for jobs, withdraw applications, and view scheduled interview details directly from their applications.

Career Connect also provides job search and filtering based on job categories such as IT, Finance, Healthcare, and more, as well as employment type, making it easier for users to find relevant opportunities.

## Screenshots

## Technologies Used
### Frontend
- React
- React Router
- CSS
- Axios
- Context API
- JWT Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv

## Getting Started

## Installation

## User Stories
### Employer (frontend)
- As an Employer, I can register for a new account and log in securely using my email and password.

- As an Employer, I can remain authenticated using JWT for the whole session.

- As an Employer, I can view my dashboard after logging in and I can see all the jobs I have posted.

- as an Employer, I can create/update/view/edit and delete jobs.

- as an Employer, I can quickly access job and application management.

- as an Employer, I can view detailed information about selected job.

- as an Employer, I can delete job posting that are no longer available.

- as an Employer, I can view all applications submitted for my job.

- as an Employer, I can update an application's status ( Pending, Reviewed, Accepted, Rejected)

- as an Employer, I can view the total number of applications received.

---
### Job seeker (frontend)
-	As a job seeker, I want to create an account and sign in to it.

-	As a job seeker, I want to browse and view all the job offers.

- As a job seeker, I want to view the details of the job including job title, company name, job description, job type, location and salary.

-	As a job seeker, I want to apply for the jobs.

-	As a job seeker, I want to view all my submitted  applications.

-	As a job seeker, I want to track the status of my applications.

-	As a job seeker, I want to edit my profile.

-	As a job seeker, I want to sign out of my account.

## Database Design



## Routes

| Method | Route        | Description                          |
| ------ | ------------ | ------------------------------------ |
| GET    | /            | Home page                            |
| GET    | /sign-up     | Sign up page                         |
| GET    | /sign-in     | Sign in page                         |
| GET    | /jobs        | View all jobs and search/filter jobs |
| GET    | /jobs/:id    | View job details                     |
| GET    | /jobs/create | Create job form                      |
| GET    | /my-jobs     | View employer's jobs                 |

### Job Filters : 

| Query       | Example                                        | Description                            |
| ----------- | ---------------------------------------------- | -------------------------------------- |
| jobCategory | /jobs?jobCategory=Technology                   | Filter jobs by category                |
| jobType     | /jobs?jobType=Full-time                        | Filter jobs by employment type         |
| Both        | /jobs?jobCategory=Technology&jobType=Full-time | Filter by category and employment type |



## Features

- User Authentication : Uses can create an account and sign in in securely using JWT authentication. 

- Role Based Access : Seperate functionality for Employers and Job Seekers. 

- Employer Profiles : Employers can create, update and delete job listings. 

- Job Search & Filtering : Job Seekers can browse available jobs and filter them by : 
- Job Category 
- Employment Type 

- Job Categories : Jobs can be categorized into fields such as { IT, Finance, Healthcare, Markting, Engineering and more }. 

- Application Withdrawal — Job Seekers can withdraw their application from a job.

- Application Management — Employers can view and manage applications submitted for their job postings.

- Interview Scheduling — Employers can schedule interviews by selecting a date and time using a calendar.

- Interview Details — Scheduled interview information, including the date and time, appears in the Job Seeker's job/application details.

- Employer Job Management — Employers can view their posted jobs and see the number of applicants for each position.

- Responsive Job Listings — Job listings display relevant information such as company, location, employment type, salary, and job category. 


## Future Enhancements

- Email Notifications — Send automatic notifications for new applications, interview scheduling, interview updates, and application status changes.
- Advanced Job Search — Add additional filters such as salary range, location, experience level, and remote/hybrid opportunities.
- Job Recommendations — Recommend relevant job opportunities to Job Seekers based on their profile, skills, and preferred job categories.

## Credits
