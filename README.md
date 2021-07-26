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

[Event Bus](#eventBus) 

---

Tech used:

-   NodeJS
-   Express
-   React

Architecture:

-  Microservice

# Overview of Application and Services <a name="overview"></a> 

![microBlogOverviewDiagram](https://user-images.githubusercontent.com/50179896/126586144-415f1776-62e6-41c2-966a-534d464d48ec.png)

# List of Services

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

## Query Service

## Moderation Service

## Event Broker



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

![synchronousApproach](https://user-images.githubusercontent.com/50179896/126860737-c3746487-ace7-4cc0-a4d0-b5d2b0999051.png)

# Solution 2: Asynchronous Communication Using an Event Bus and Query Service <a name="solution2"></a>

![flameShotAsyncApprach](https://user-images.githubusercontent.com/50179896/126861569-96516526-45ba-4799-9dbb-ade0e15435cb.png)

## Pros
- Query service has zero dependencies on other services
- Query service wil be extremely fast

## Cons
- More difficult to understand
- Data duplication

# Event Bus <a name="eventBus"></a>

There are several implementations, including:
- RabbitMQ
- Kafka
- NATS...

In this app, I'll build a very basic Event Bus from scratch using Express. This is not going to be a production-grade bus.

Whenever a POST request is made to the Post Service, Comments Service, or Query Service, the particular service will then forward that request to the Event Bus. In turn, the Event Bus will then forward the request with all of its data to all 3 services while at the same time storing the event. That's it. As I said, this is a very basic implementation. A more thorough, production-grade implementation will come in a future project.

Obviously, this does not deal with the data duplication problem. But that is not the intention here. There are tools available to address this issue.

# Final Layout

![finalMicroBlogLayout](https://user-images.githubusercontent.com/50179896/126918427-fed3c5e4-6052-41c0-95a3-b03b77fd0842.png)
