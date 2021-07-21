# microBlog

This app is pretty straightforward. Just creating two services (post and comments) with a basic react frontend. It's my foray into microservices. I've left comments throughout the code to explain my process. I won't be using a database so the data will not persist.

Tech used:
- NodeJS
- Express
- React

Architecture:
- Microservice

![blogProjectdiagram](https://user-images.githubusercontent.com/50179896/126414532-05640ece-fe51-494f-a29c-987cd195aa83.png#center)

## Post Service

**Goal**: Create new post\
**Path**: /posts\
**Method**: POST\
**Body**: { title: string }
