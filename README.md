
# Checkout-Form

A simple checkout form implemented using **Next.js**, **Stripe**, and **React**. This form allows users to make payments via Stripe using a payment method of their choice.

## Features

- **Stripe Integration**: Secure payment processing with Stripe.
- **Form Validation**: Uses Formik and Yup for managing form state and validation.
- **Responsive Design**: Built with Bootstrap for a clean and responsive UI.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/Checkout-Form.git
   cd Checkout-Form
   ```

2. Install the dependencies using **npm** (or **pnpm** if preferred):

   ```bash
   npm install
   ```

   Or with **pnpm**:

   ```bash
   pnpm install
   ```

3. Set up your environment variables:
   - Create a `.env.local` file in the root directory of the project.
   - Add both **Stripe secret** and **public keys**:

     ```bash
     STRIPE_SECRET_KEY=your-stripe-secret-key
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-test-public-key
     ```


## Development

To start the development server:

```bash
npm run dev
```

Or with **pnpm**:

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`.

## Building and Exporting the Site

To build and export the static version of the app:

1. **Build the project**:

   ```bash
   npm run build
   ```

   Or with **pnpm**:

   ```bash
   pnpm run build
   ```

## Project Structure

```
├── components/           # Reusable components
├── pages/                # Next.js pages (including the checkout form page)
├── public/               # Static assets like images
├── styles/               # Global styles
├── types/                # Global types
├── .env.local            # Environment variables (Stripe keys)
├── next.config.ts        # Next.js configuration (base path for GitHub Pages)
├── package.json          # Project dependencies and scripts
├── pnpm-lock.yaml        # Lockfile for pnpm
└── README.md             # This file
```

## Technologies Used

- **Next.js**: Framework for building server-rendered React applications.
- **Stripe**: Payment gateway for secure payments.
- **React**: JavaScript library for building user interfaces.
- **Formik**: Library for handling forms in React.
- **Yup**: Schema validation library for Formik.
- **Bootstrap**: Front-end framework for responsive design.
- **npm/pnpm**: Package manager for managing dependencies.

## License

This project is licensed under the MIT License.
