# Blog Application

# Overview:
  -  A full-featured blog application built with React.js, Firebase, and Redux Toolkit. Users can create, edit,     delete, and browse blogs with authentication and pagination.

# Features:
 - Authentication: Firebase Authentication for user login/signup.

 - Blog Management: Users can create, edit, and delete their own blogs.

 - State Management: Redux Toolkit is used for managing blog and authentication state.

 - Firestore Integration: Firebase Firestore is used to store blog data.

 - Pagination: Blogs are paginated for better navigation.

 - Responsive Design: Optimized for both desktop and mobile devices.

# Installation
 - Clone the repository:
   - git clone https://github.com/tashish419/first-shopper
   - cd blog-app
 
 - Install dependencies:
   - npm install
 - Set Up firebase Project at Firebase Console
 - Enable Authentication and firestore
 - Create a .env file in the root directory and add:
    - VITE_FIREBASE_API_KEY=your_api_key
    - VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    - VITE_FIREBASE_PROJECT_ID=your_project_id 

 - Start the development server:
   - npm run dev

# Usage 
 - Signup/Login: Users must sign in to manage blogs.

 - Create Blog: Add a title, description (rich text editor), and cover image.

 - Edit/Delete Blog: Only the author can edit or delete a blog.

 - Pagination: Navigate through multiple pages of blogs.

# Technology Used
 - React.js
 - Redux Toolkit
 - Firebase Authentication & Firestore
 - Vite