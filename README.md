# microBlog

This app is pretty straightforward. Just creating two services (post and comments) with a basic react frontend. It's my foray into microservices. I've left comments throughout the code to explain my process. I won't be using a database so the data will not persist.

Tech used:

-   NodeJS
-   Express
-   React

Architecture:

-  Basic Microservice


![microBlogOverviewDiagram](https://user-images.githubusercontent.com/50179896/126586144-415f1776-62e6-41c2-966a-534d464d48ec.png)

## Post Service

**Goal**: Create new post\
**Path**: /posts\
**Method**: POST\
**Body**: { title: string }\
\
**Goal**: Get all posts\
**Path**: /posts\
**Method**: GET\
**Body**: \

## Comment Service

**Goal**: Create a comment associated with the given post ID\
**Path**: /posts/:id/comments\
**Method**: POST\
**Body**: { content: string }\
\
**Goal**: Retrieve all comments associated with the given post ID\
**Path**: /posts/:id/comments\
**Method**: GET\
**Body**: \

![arrayOfComments](https://user-images.githubusercontent.com/50179896/126585550-992e07e7-a6e9-4c23-bbbe-cc328e89c47a.png)

## React Frontend

![reactComponentsMicroBlog](https://user-images.githubusercontent.com/50179896/126728957-e692f82e-d803-4665-afa1-bdc9da390d16.png)
