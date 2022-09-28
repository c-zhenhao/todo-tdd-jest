https://nlbsg.udemy.com/course/nodejs-unit-testing-and-integration-testing-with-express-and-jest/learn/lecture/15982128#overview

![image](https://user-images.githubusercontent.com/16322250/192492630-c898de0d-4a71-48ed-babe-91234cb5b21d.png)

jest documentation with mongoose:
https://mongoosejs.com/docs/jest

## Issues faced

- trying to do an integration test which exceeded the default timeout value of 5s (5000ms)
  ![image](https://user-images.githubusercontent.com/16322250/192750626-015817e9-03a2-410b-800b-3e7e7c6ffe1e.png)
- attempted fix: increase timeout value in jest.config.js
  - turns out the issue was because mongodb wasn't connected in app.js, which is called through supertest.
  - ![500](https://user-images.githubusercontent.com/16322250/192814543-84faefec-fb70-4161-b36d-28a2de4c3b90.png)
  - it works in postman because in package.json, `yarn start` or `yarn dev` specifies `server.js`
  - fixed by moving the connectDB function to app.js
