# HouseRent – Web-Based House Rental Management System

HouseRent adalah aplikasi penyewaan rumah berbasis web yang dibuat untuk membantu proses pencarian, pengelolaan, dan booking properti secara lebih terstruktur. Sistem ini memiliki tiga role utama, yaitu Admin, Owner, dan Renter.

## Features

### Renter
- Register dan login sebagai renter
- Melihat daftar properti yang tersedia
- Melakukan booking properti
- Melihat riwayat booking

### Owner
- Register dan login sebagai owner
- Menambahkan data properti
- Upload gambar properti
- Melihat daftar properti milik owner
- Mengedit dan menghapus properti
- Melihat booking masuk dari renter
- Mengubah status booking

### Admin
- Login sebagai admin
- Melihat semua user
- Grant dan ungrant akun owner
- Melihat semua properti
- Melihat semua booking

## Technology Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- Ant Design

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- cors
- multer

### Database
- MongoDB Atlas

## Project Structure

```txt
house-rent-app/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── index.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── images/
│   │   ├── modules/
│   │   │   ├── admin/
│   │   │   ├── common/
│   │   │   └── user/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
