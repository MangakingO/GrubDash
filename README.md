# GrubDash API README

Welcome to the GrubDash API documentation! In this document, you'll find all the information you need to understand, set up, and use the GrubDash API for your backend development tasks. This API is designed to support the GrubDash project, where you'll be building a backend system to manage dishes and orders for a food delivery service.

## Project Overview

You've been hired as a backend developer for the GrubDash startup. Your task is to set up an API and build out specific routes to support frontend design and development. The goal is to create an API that allows frontend developers to demo initial design ideas and functionality to stakeholders.

## Project Requirements

To successfully complete this project, you'll need to demonstrate the following skills:

- Running tests from the command line
- Using common middleware packages
- Receiving requests through routes
- Accessing relevant information through route parameters
- Building an API following RESTful design principles
- Writing custom middleware functions

## Getting Started

Follow these steps to set up the GrubDash project on your local machine:

1. Download the project files from the Qualified assessment.
2. Run `npm install` to install the project dependencies.
3. Run `git init` to initialize a Git repository.

## Running Tests

To run the tests for the project, use the following command: 
`npm test`

## Project Tasks

Your primary goal is to create an API to manage dishes and orders. Here are the main tasks you need to complete:

### Dishes

1. Implement handlers and middleware functions for creating, reading, updating, and listing dishes.
2. Create two routes: `/dishes` and `/dishes/:dishId`, and attach the appropriate handlers for each route.

### Orders

1. Implement handlers and middleware functions for creating, reading, updating, deleting, and listing orders.
2. Create two routes: `/orders` and `/orders/:orderId`, and attach the appropriate handlers for each route.

### Validation

Ensure proper validation for both dishes and orders, considering the provided validation rules.

## API Routes

Here are the API routes you'll be working with:

### Dishes

- **GET /dishes**: Retrieve a list of all existing dish data.
- **POST /dishes**: Create a new dish.
- **GET /dishes/:dishId**: Retrieve a specific dish by ID.
- **PUT /dishes/:dishId**: Update a dish by ID.

### Orders

- **GET /orders**: Retrieve a list of all existing order data.
- **POST /orders**: Create a new order.
- **GET /orders/:orderId**: Retrieve a specific order by ID.
- **PUT /orders/:orderId**: Update an order by ID.
- **DELETE /orders/:orderId**: Delete an order by ID.

## Example Requests and Responses

For each route, there are example requests and responses provided in the instructions. Make sure to follow these examples to ensure your API behaves correctly.

## Conclusion

Congratulations! You now have all the information you need to set up the GrubDash API and complete the backend development tasks for this project. Follow the instructions, create the necessary routes and handlers, and make sure your API passes the provided tests.

Feel free to refer to the project files and documentation as you work through the tasks. Good luck, and happy coding!
