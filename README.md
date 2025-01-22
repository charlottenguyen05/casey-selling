# Casey-Selling: Personalized Case E-commerce Platform

This project is a dynamic e-commerce platform designed for a shop specializing in bespoke phone cases. Customers can unleash their creativity by designing personalized cases, styling images, and selecting from an extensive array of premium materials and unique styles. It also comms with a management table for shop's owner to keep track of the orders and sales.

🔗 **Try it out:** [Casey-Selling Website](https://casey-selling.vercel.app/)

---
![Hero](https://i.imgur.com/IepzMjv.png)

## 📚 Table of Contents

- [Installation](#-installation)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Acknowledgement](#-acknowledgement)
- [License](#-license)

---

## 🛠️ Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

```bash
git clone https://github.com/charlottenguyen05/casey-selling.git
cd casey-selling
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

4. **Set up your Prisma schema**:
   Ensure you have a `schema.prisma` file with your database schema.

5. **Generate Prisma client**:

```bash
npx prisma generate
```

6. **Run the development server**:

```bash
npm run dev
```

7. **Open the project in your browser**:
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

8. **Run tests** (optional):

```bash
npm test
```

You should now have the project running locally on your machine.

---

## 💻 Tech Stack

### **Client**
- 🌐 **React (with Next.js)**  
- 🎨 **Tailwind CSS**  
- 🧩 **Shadcn/UI**  
- 📤 **UploadThing**

### **Server**
- 🔧 **Next.js**
- 🔤 **TypeScript**
- 📋 **Prisma**
- ☁️ **Neon (cloud database)**
- 💳 **Stripe**

---

## ⭐ Features

### 🌗 Dark/Light Mode Feature

### **For Users**

#### 1. **Customize Your Case** 🎨
![Customize Your Case](https://i.imgur.com/XCKVS7C.png)
- Navigate to the case customization page.
- Upload your image and style it using the provided tools.
- Choose from a variety of materials and styles for your case.

#### 2. **Place an Order** 🛒
![Place an Order](https://i.imgur.com/bHu0ekS.png)
- Add the case to your cart.
- Proceed to checkout with Stripe.
- Complete the payment process and receive a recap.

### **For Shop Owners**

#### **Dashboard for Order Management** 📊
![Owner Dashboard](https://i.imgur.com/AXWNHDR.png)
- Manage and update all information and statuses of orders.
- Keep track of weekly and monthly goals.

---

## 📁 Project Structure

```
- .env.example        # Example of environment variables configuration
- .eslintrc.json      # ESLint configuration file
- .gitignore          # Git ignore file
- .next/              # Next.js build output directory
- .vscode/            # Visual Studio Code workspace settings
- app.ts              # Main application entry point
- components.json     # Configuration for components
- next-env.d.ts       # Next.js environment types
- next.config.mjs     # Next.js configuration file
- package.json        # Project dependencies and scripts
- postcss.config.mjs  # PostCSS configuration file
- prisma/             # Prisma configuration and schema
    - schema.prisma   # Prisma schema file
- public/             # Public assets directory
- README.md           # Project documentation
- src/                # Source code directory
    - app/            # Application-specific components and pages
        - layout.tsx  # Root layout component
    - components/     # Reusable UI components
    - lib/            # Utility functions and libraries
    - pages/          # Next.js pages
    - styles/         # Global styles
- tailwind.config.ts  # Tailwind CSS configuration file
- tsconfig.json       # TypeScript configuration file
```

---

## 🙏 Acknowledgement

- [Josh tried coding](https://www.youtube.com/watch?v=SG82Aqcaaa0)

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
