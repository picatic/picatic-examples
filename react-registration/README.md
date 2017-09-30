# Picatic API Checkout - Built with React

This project performs the checkout process of selling a ticket with the Picatic Ticketing API.

Built with [create-react-app](https://github.com/facebookincubator/create-react-app), a global command-line utility used to create React projects.

Check out the demo: https://eduhacks.now.sh/

# Getting Started

**1. Download Dependencies:**

`npm install`

**2. Run app in development mode:**

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Available Scripts

`npm test`

Launches the test runner in the interactive watch mode.<br>

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template.

* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won't see them.

Only files inside `public` can be used from `public/index.html`.<br>

You can, however, create more top-level directories.<br>
They will be included in the production build so you can use them for things like documentation.

# Checkout flow

The ticket registration flow is created through Picatic's Ticketing API.

## Step 1: Get Event and List of Tickets

By updating the `eventSlug` initial state, the `getEvent()` method will execute on load to `GET` the event and list of tickets available for your event.

`https://api.picatic.com/v2/event/eduhacks-workshop?fields[event]=title,summary,cover_image_uri&include=ticket_prices&fields[ticket_price]=name`

## Step 2: Create Checkout

When a ticket is selected, the `createCheckout()` method will `POST` the `event_id` and `ticket_price_id` to reserve that ticket for 20 minutes.

During the reservation time, the user will have to input their personal and credit card details.

[Create Checkout reference](http://developer.picatic.com/v2/api/#methods-checkout-create)

## Step 3: Update Checkout

The User is now required to submit there email, first and last name to the checkout object. After the user has filled in the form, the `updateCheckout()` with `PATCH` the updates to the checkout object.

[Update Checkout reference](http://developer.picatic.com/v2/api/#methods-checkout-update)

## Step 4: Confirm Checkout

The user now confirms their checkout. The `confirmCheckout()` will `POST` the completion of the registration process and validate their purchase.

[Confirm Checkout reference](http://developer.picatic.com/v2/api/#methods-checkout-confirm)<br>

To learn more about Picatic's Ticketing API go [here.](http://developer.picatic.com/v2/api/)
