https://nlbsg.udemy.com/course/nodejs-unit-testing-and-integration-testing-with-express-and-jest/learn/lecture/15982128#overview

![image](https://user-images.githubusercontent.com/16322250/192855754-3b88ac26-f09a-4b65-a4cb-a4fe775331a9.png)

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

## done lol

![image](https://udemy-certificate.s3.amazonaws.com/image/UC-11c9060a-22ff-444c-a3d8-d0db4543f75b.jpg)
