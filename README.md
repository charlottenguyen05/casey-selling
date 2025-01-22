# Casey-Selling: Customized Case E-commerce Project

This project is a website for a shop that sell customized cases. Users can choose design their own case by styling their image, and choosing from a wide variety of differents materiaux et styles. 

Link for a try: [My website](https://casey-selling.vercel.app/)

## Table of content
Installation
Tech stack
Features
Project Structure
Acknowledgement
License

## Installation

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
    Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

4. **Set up your Prisma schema:**:
    Set up your Prisma schema: Ensure you have a schema.prisma file with your database schema.

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

Now you should have the project up and running on your local machine.

## Tech stack

**Client**:
- React (with Next.js)
- Tailwind CSS
- Shadcn/UI
- UploadThing

**Server**:
- Next.js
- TypeScript
- Prisma
- Neon (cloud database)
- Stripe

## Features
**For users**
1. **Customize your case**:
![Alt text](image-url)
    - Navigate to the case customization page.
    - Upload your image and style it using the provided tools.
    - Choose from a variety of materials and styles for your case.

2. **Place an order**:
![Alt text](image-url)
    - Add the case to your cart.
    - Proceed to checkout with Stripe
    - Complete the payment process and end with a recap page

**For shop's owner**
![Alt text](image-url)
**Dashboard for management of all orders**:
    - Manage and update all the information and status of each order
    - Keep track of the weekly and monthly goals

### Key Directories and Files

- **.env.example**: Example of environment variables configuration.
- **.eslintrc.json**: ESLint configuration file.
- **.gitignore**: Git ignore file.
- **.next/**: Next.js build output directory.
- **.vscode/**: Visual Studio Code workspace settings.
- **app.ts**: Main application entry point.
- **components.json**: Configuration for components.
- **next-env.d.ts**: Next.js environment types.
- **next.config.mjs**: Next.js configuration file.
- **package.json**: Project dependencies and scripts.
- **postcss.config.mjs**: PostCSS configuration file.
- **prisma/**: Prisma configuration and schema.
    - **schema.prisma**: Prisma schema file.
- **public/**: Public assets directory.
- **README.md**: Project documentation.
- **src/**: Source code directory.
    - **app/**: Application-specific components and pages.
        - **layout.tsx**: Root layout component.
    - **components/**: Reusable UI components.
    - **lib/**: Utility functions and libraries.
    - **pages/**: Next.js pages.
    - **styles/**: Global styles.
- **tailwind.config.ts**: Tailwind CSS configuration file.
- **tsconfig.json**: TypeScript configuration file.

## Acknowledgement
    * [Josh tried coding](https://www.youtube.com/watch?v=SG82Aqcaaa0)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.