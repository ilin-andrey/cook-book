# Overview

### General idea

Cooking is hard, planning is hard, planning of cooking is a nightmare. To create a meal plan for family for a week is too hard. What if I say you that it is absolutely not a problem if you have a assistent which generates meal plan, based on your choice and prepare list of dishes to order from grocery.

### Details

- client server web application with relational database
- list of existing dishes (mostly pre-defined)
  - managed by super admins
  - extendible by users by request or separated by scopes
- recipes adding/updating/removal
  - based on existing dishes
  - with calories and nutrients calculation
- generating meal plans for the future
  - based on required calories or taste
  - detailed list of dishes required
- connection to known groceries to get data from them

### Technologies

#### Client

- TypeScript, NextJS

#### Server

- TypeScript, nestJS

### Links

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
