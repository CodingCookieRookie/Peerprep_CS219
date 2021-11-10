# CS3219 Project - PeerPrep (By Team G23)

Website hosted at [link](https://web-6i7ougacoq-de.a.run.app/)
## Introduction
We will be embarking on the project Peerprep, a peer support system where users are engaged with collaborative whiteboard-style programming to practice for technical interviews. The app is expected to handle collaborative whiteboard-style programming. With IPP, everyone can code together on the same file at the same time. You can share with anyone, view edited code in real time, chat and comment for
discussions. The app also supports some basic features as well e.g., user authentication and save and retrieve relevant data. Questions will be taken from leetcode (free questions), we will keep the sample size of our questions small as we are in the minimal viable product stage. The questions will be categorized based on difficulty (e.g easy, medium, hard).

## Motivation

Aspiring Software Engineering students often have trouble with technical interviews. Some may find it stressful to be assessed live coding, while others find it tough to articulate their thoughts properly while coding at the same time, including us too! In that perspective, we want to create an interview Preparation Platform where students can find peers to practice whiteboard style interview questions together, as well as fostering a local community for tackling technical challenges together.


We felt that the idea of PeerPrep was really an interesting one and that it can be purposeful for ourselves. We feel that the challenges faced aforementioned can be overcome through rigorous practicing, and we want to implement such a platform for students to engage in. 

## Instructions for Set up
### Requirements:
1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) for MongoDB.
2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop).
3. Install [Node.js](https://nodejs.org/en/download/) and [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### For Deployment
1. Clone the repository.
2. Place the required `.env` configuration files in the following directories of:
  - `backend/users/.env`
  - `backend/match/.env`
  - `backend/message/.env`
  - `backend/editor/.env`
  - `backend/questions/.env`
3. In each of the `.env` file, include your own MongoDB Connection String URI as `CLOUD_DATABASE_URL`, and optionally you can input your custom `PORT` number. Do check out [documentation](https://docs.mongodb.com/manual/reference/connection-string/) on getting the Connection String URI.
4. Deploy the backend as microservices in your preferred cloud provider. Our team used Google Cloud Platform (GCP). Do check out the [documentation](https://cloud.google.com/sdk/gcloud/reference) for gcloud guide. You can install Cloud SDK [here]((https://cloud.google.com/sdk/docs/install)) if you are using GCP.
5. In the `/frontend/src/api.js`, do allocate your deployed endpoints. #TODO
6. Now you can deploy frontend as well.
7. After that, you can access your frontend deployed endpoint and you should see the landing page.

### Instructions for running locally
1. Clone the repository.
2. Place the required `.env` configuration files in the following directories of:
  - `backend/users/.env`
  - `backend/match/.env`
  - `backend/message/.env`
  - `backend/editor/.env`
  - `backend/questions/.env`
3. In each of the `.env` file, include your own custom `PORT` number if you wish. If you wish to use your MongoDB Cloud Database, you may also inpurt your MongoDB Connectiong String URI as `CLOUD_DATABASE_URL`. Do check out [documentation](https://docs.mongodb.com/manual/reference/connection-string/) on getting the Connection String URI.
4. Install all required dependencies for backend microservices and frontend. In root directory,
  ```bash
  # change modify access of install-all.sh
  $ chmod +x ./install-all.sh

  # install all dependencies
  $ ./install-all.sh
  ```
5. In the `/frontend/src/api.js`, set all instances of production URLs to `null`. This is because we will be using the development URLs (localhost). Do also change the port number of your own microservices for the dev URLs.
6. Use Docker-Compose to build all the microservices and frontend as container images.
  ```bash
  $ docker-compose build
  ```
7. Use Docker-Compose to spin up the containers.
  ```bash
  $ docker-compose up -d
  ```
8. You can access your [http://localhost:3000](http://localhost:3000) and you will see the landing page.

