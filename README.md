# microBlog


![](https://img.shields.io/badge/API-REST-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/architecture-eventDriven-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/architecture-microservice-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)

This app is pretty straightforward. Just creating two services (post and comments) with a basic react frontend. It's my foray into microservices. I won't be using a database so the data will not persist.

---

Table of Contents:

[Overview](#overview)

[Problem](#problem) 

[Solution 1: Synchronous Communication](#solution1)

[Solution 2: Asynchronous Communication Using an Event Bus and Query Service](#solution2)

---

Tech used:

-   NodeJS
-   Express
-   React

Architecture:

-  Microservice

# Overview of Application and Services <a name="overview"></a> 

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
**Body**: none

## Comment Service

**Goal**: Create a comment associated with the given post ID\
**Path**: /posts/:id/comments\
**Method**: POST\
**Body**: { content: string }\
\
**Goal**: Retrieve all comments associated with the given post ID\
**Path**: /posts/:id/comments\
**Method**: GET\
**Body**: none

![arrayOfComments](https://user-images.githubusercontent.com/50179896/126585550-992e07e7-a6e9-4c23-bbbe-cc328e89c47a.png)

## React Frontend

![reactComponentsMicroBlog](https://user-images.githubusercontent.com/50179896/126728957-e692f82e-d803-4665-afa1-bdc9da390d16.png)

# Problem <a name="problem"></a> 

Here is the gist of the problem we are dealing with. It's really a matter of inefficiency. Below you picture of the blog in its current state with posts and comments add:

![blogScreenShot](https://user-images.githubusercontent.com/50179896/126859009-139e362c-c67e-4c2b-8762-125701ad7d89.png)

If we look at the list of request made to the comments service we see that **seven GET requests** were made to retrieve the post comments:

![commentServiceRequests](https://user-images.githubusercontent.com/50179896/126859012-b628a0a7-49e8-4d57-a96b-83835260644a.png)

This is our current dilemma: we are making mulitple requests to one service when we could just make one. And this is where an event-driven microservice architecture would come in handy:

![multipleRequestsDiagram](https://user-images.githubusercontent.com/50179896/126859014-4bfd86ed-88ac-480c-86d0-4c98740faf07.png)

# Solution 1: Synchronous Communication <a name="solution1"></a>

![synchronousApproach](https://user-images.githubusercontent.com/50179896/126860244-f95974cc-30e5-4729-b550-26f7f49902b3.png)

# Solution 2: Asynchronous Communication Using an Event Bus and Query Service <a name="solution2"></a>
