![House 18](https://res.cloudinary.com/dzcqnchjm/image/upload/v1746566707/logo-white-trans_m6bctz.png)

# House 18 - Fullstack E-commerce Project
**House 18** is a fullstack web application built as part of a university project during the course *Full Stack Development - DA219B* at [Kristianstad University](https://www.hkr.se/en/). The app simulates a modern clothing store with user authentication, a responsive shopping exprerience and admin product management. 

> **✅ Deployed and live at:** [https://house-18.vercel.app/](https://house-18.vercel.app/)

> **🔧 Backend API:** [https://house18-backend.onrender.com](https://house18-backend.onrender.com)

---
## 🔍 Features
- **User Authentication:** Users can register, log in and view their profile. Token based authentication (JWT).
- **Store:** Users can browse products, filter by category, choose size, add items to their cart, and proceed to a simulated checkout process. Orders are saved per user in the database.
- **Favorite (Like) System:** Logged in users can like products to save and view them later at their profile.
- **Cart Modal & Checkout:** Users can add products to their cart, view the cart in a modal, and proceed to a simulated checkout process.
- **Admin Panel:** Admin users can manage products, including adding, editing, and deleting products. The admin panel also shows quick statistics about current number of users, total sales, and top selling product.
- **Contact Form:** Users can contact the store via a contact form. Currently, the form only stores the message in the database and does not send an email.
- **Light/Dark Mode:** Users can toggle between light and dark mode for a better user experience.
- **Responsive Design:** The app is fully responsive and works on all devices, including mobile phones and tablets.
- **User Roles:** Regular users can browse and purchase products, while admin users have access to the admin dashboard for product management.


---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- FontAwesome
- Custom CSS

**Backend**
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Tokens) Authentication
- REST API

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Cloudinary (for product images)
- Version Control: Git & GitHub

**Other**
- Postman (for API testing)
- Figma (for design mockups)
- Dotenv (for environment variables)
- Nodemon (for development)
- bcrypt (for password hashing)

---

## 📁 Project Structure
```bash
house18/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── express.js
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── features/
│   │   └── main.jsx
└── README.md
```

---

## 👥 Team and Responsibilities
| Member     | GitHub             | Contributions Summary |
|------------|--------------------|------------------------|
| **Nicholas** | [@nickem00](https://github.com/nickem00) | Led project structure setup for both frontend and backend. Built homepage, header, footer, profile page, cart modal, checkout and order confirmation. Also handled deployment and designed the UI in Figma. |
| **Hugo**     | [@HugNil](https://github.com/HugNil)     | Developed the backend logic including models, controllers, and routes based on frontend needs. Later implemented Login/Register UI and Admin Dashboard in Frontend. Also created product images with Sora. |
| **Jacob**    | [@Jagge1](https://github.com/Jagge1)     | Focused on the `/store` and product details pages. Contributed frontend logic and styling. Also created product images with Sora. |
| **Pontus**   | [@Ponhagen](https://github.com/Ponhagen)  | Contributed to the backend by implementing various models and routes, and assisted with parts of the backend logic. Also created product images with Sora. |

---

## 🧪 How to Run Locally

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)
- MongoDB account (for database connection)
- Internet connection (for external resources like Cloudinary images)

#### 1. Clone the repository
```bash
git clone https://github.com/nickem00/house-18.git
```

#### 2. Navigate to the project directory
```bash
cd house-18
```
#### 3. Run installation
```bash
npm run install-all
```

#### 4. Set up environment variables
You need to create two `.env` files based on the provided examples:

**For the backend (.env file in the backend folder)**
```bash
# Create a .env file in the backend directory
PORT=5000
MONGODB_CONNECTION_STRING=mongodb+srv://<username>:<password>@your-mongodb-cluster.mongodb.net/<database-name>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
```
Replace `<username>`, `<password>`, `<database-name>`, and the connection string with your actual MongoDB Atlas credentials. See [MongoDB Atlas documentation](https://www.mongodb.com/docs/atlas/getting-started/) to create a free cluster and get your connection string.

The `JWT_SECRET` can be any secure random string - this is used to encrypt authentication tokens.

**For the frontend (.env file in the frontend folder)**
```bash
# Create a .env file in the frontend directory
VITE_API_BASE_URL=http://localhost:5000
```

#### 5. Start both frontend and backend using concurrently
```bash
npm start
```

The backend runs on `http://localhost:5000`, and the frontend on `http://localhost:5173` by default.

> **Note:** Make sure to set up your environment variables correctly as described in step 4, otherwise the application won't function properly. Du behöver skapa en egen MongoDB-databas för att kunna köra applikationen lokalt.

#### 6. Test Admin Features

To test the admin dashboard and functionality:

1. Register a new user account through the website's registration page
2. Use MongoDB Compass or Atlas to directly modify the user in your database:
   - Connect to your MongoDB database
   - Find the user in the 'Users' collection
   - Update the `isAdmin` field from `false` to `true`
3. Log in with your admin user to access the admin dashboard at `/admin`

#### 7. Cloudinary Setup (for product images)

If you want to add or modify product images, you'll need to:

1. Create a free [Cloudinary](https://cloudinary.com/) account 
2. Upload your product images to Cloudinary
3. Use the generated URLs when creating or editing products through the admin panel

--- 
<!-- 
## 🎨 Design (Figma)

Design mockups were created in Figma. 

If we want to implement screenshots from figma and so on

---
-->

## 📸 Screenshots

![Screenshot Phone](https://res.cloudinary.com/dzcqnchjm/image/upload/v1747223958/MobileHome_jk4n6u.png)
![Screenshot Phone](https://res.cloudinary.com/dzcqnchjm/image/upload/v1747223958/MobileCartCheckout_f4d3ez.png)
![Screenshot Laptop](https://res.cloudinary.com/dzcqnchjm/image/upload/v1747223958/92shots_so_ybe0go.png)
![Screenshot Laptop](https://res.cloudinary.com/dzcqnchjm/image/upload/v1747223958/laptopLightModeAdmin_mgsagm.png)

---

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.