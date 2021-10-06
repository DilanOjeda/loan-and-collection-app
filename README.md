# Loan and Collection App

Web app to lend and collect money from customer.

## Description

This loan and collection web app has the following modules :

* Users
    * Create new users
    * Update users info
    * Delete users
    * Show users info
    * Enable or disable users
* Customers
    * Create new customers
    * Update customers info
    * Delete customers
    * Show customers info
* Loans
    * Create new loan
    * Show customers loan payments 
    * Show loan status: paid and unpaid loans
* Collections
    * Collect customer loan fees
    * Show fees info
    * Show the last paid fees
* Reports
    * ...

This project has not been finalized yet.

## Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/DilanOjeda/loan-and-collection-app.git
   cd loan-and-collection-app
   ```

2. Install the npm packages

   ```bash
   npm install
   ```

   Also install `nodemon` globally, if you don't have it yet.

   ```bash
   npm install -g nodemon
   ```

3. Congfigure environment settings

   Create a file with the following name and location `.env` and copy the contents from `.env.example` into it. Replace the values with your specific configuration. Don't worry, this file is in the `.gitignore` so it won't get pushed to github.

   ```
    # Express Session
    SESSION_SECRET=your-session-secret

    # Database MySQL
    DATABASE_USER=your-db-user
    DATABASE_PASS=your-db-password
    DATABASE_NAME=your-db-name
    DATABASE_HOST=your-db-host
    DATABASE_PORT=your-db-port
   ```

4. Running the app locally

   Run this command, which is located in npm script in `package.json` file.

   ```bash
   npm run dev