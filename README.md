# Openhouse.ai code challenge

This is a React application with Typescript that consumes data from two unauthenticated endpoints from Openhouse.ai

It displays communities from Calgary in alphabetical order; and displays a community photo (when available);
along with the community's average home pricing.

Some considerations:
- A local backend server was created to address a CORS issue
- There is no caching or memoization of average house pricing - this could be optimized to reduce the load on clients, and to reduce the number of API calls made to our backend
- Redux could have been used for state management, but it wasn't needed at that scale
- I added some simple API validations in api.ts, but didn't work on a proper error page with details on what went wrong
- I ran into issues getting styling into its own files (tried using @emotion and CSS modules), so there is a lot of inlined CSS that could be extracted out
- I focused on the React components and behaviour more so than in the UI itself


# Running locally

The setup below assumes you have nodeJS installed locally.
If not, please install it:
- Installer: https://nodejs.org/en/download
- Via package manager: https://nodejs.org/en/download/package-manager

Before running the application, install all of the dependencies using NPM:
```shell
npm install
```

#### Start the backend server that interfaces with the API:
```shell 
npm run start-server
```
The backend server runs on http://localhost:4000/, but there's no need to interact with it.
The frontend will use it.

#### Start the React app:
```shell
npm start
```
The frontend runs on http://localhost:3000/




Since there is no navigation, http://localhost:3000/ should be the page for review