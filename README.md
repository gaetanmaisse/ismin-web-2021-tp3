Part of Web Development - ISMIN 2021

Course followed by students of Mines St Etienne, ISMIN - M2 Computer Science.

[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Mines St Etienne](./logo.png)](https://www.mines-stetienne.fr/)

# TP3: Introduction to asynchronous operations management

## 📝 Goal

The goal of this TP is to discover 2 features of JS/TS language to deal with asynchronous operations:
 - Promises
 - async/await 

### Step 1: ♻️ Prepare the sources

Copy/paste `src` and `package.json` of TP2 in this project. Run `npm install` to fetch the dependencies.


### Step 2: 📚 Create a static dataset

Create a `dataset.json` file in `src` folder and fill it with a valid JSON array containing books data.

### Step 3: 👓 Parse and use the static dataset

- Find a way to execute code when `BookService` is bootstrapped.
- Use the `readFile` function available in Node.js to read the dataset.
- Parse the content of the file to a TypeScript object and use it to populate the map/array used to store books in the `BookService`

### Step 4: ↔️ Use async/await instead of Promises

Replace Promise syntax with async/await.

## 🛰 Extra

Instead of using the content of a local file, initialize the data with https://api.npoint.io/40518b0773c787f94072.

⚠️ This endpoint contains 7000+ books, so be careful when dealing with it.

To do so you will need `HttpModule`: https://docs.nestjs.com/techniques/http-module

Then try to fetch and handle both local file and remote data at the same time, tips: take a look at `Promise.all`

## 🔑 Solution

An implementation of the TP is available on `solution` branch. To switch to the solution just do:

```
# Commit or revert your local changes
# git add . && git commit -m "YOUR_MSG" 

# Update your repository
git pull

# Switch to `solution` branch
git checkout solution
```
