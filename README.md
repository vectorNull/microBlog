# microBlog


![](https://img.shields.io/badge/API-REST-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/architecture-eventDriven-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/architecture-microservice-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/containers-docker-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/orchestration-kubernetes-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)


I used this application to learn the fundamentals of microservices. I implemented 4 different services using an event-driven architecture and a small React frontend. Docker and Kubernetes was used for containerization and orchestration. For more details about design and implementation choices, see below.

---

Table of Contents:

[Overview of Application and Services](#overview)

[Problem](#problem) 

[Solution 1: Synchronous Communication](#solution1)

[Solution 2: Asynchronous Communication Using an Event Bus and Query Service](#solution2)

[Event Bus](#eventBus) 

[Why I used Docker?](#docker)

---

Tech used:

-   NodeJS
-   Express
-   React
-   Docker
-   Kubernetes

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
![queryService](https://user-images.githubusercontent.com/50179896/127032734-e0372fb1-cd46-4c71-9db9-22a32c8c469d.png)

## Moderation Service
The moderation service will consume events as they are submitted by the user. It wil first receive a ComentCreated event, use a terniary operator to determine if a particular word is found in the content property (in this case, the word 'guac'; I don't like guac ;) ). If so, it will update the status property to rejected. If not, the status property will be set to approved. Next, it will emit a CommentModerated event to the Event Broker which will then pass it on to the Query Service.

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

# Why I used Docker? <a name="docker"></a>

This is obviously a small application and in the real world this architecture choice would be overkill. But for the sake of learning, I also chose to use Docker for two primary reasons:
- Running this app make some pretty big assumptions about our environment. These include the assumption the Node is installed on the system
- Running this app requires precise knowledge of how to start it (npm start)

![dockerLayout](https://user-images.githubusercontent.com/50179896/127038956-1fde00c7-2266-4f7c-a103-414a2368ba9b.png)

In a real-world app of this type, complexity would be compounded. In order to use this app for learning purposes, I opted to containerize them with Docker, which will make it easier for anyone wanting to run the app on their own machines. Docker wraps every dependency needed to run the application in a nice little box.
