// module.exports = {
//   testEnvironment: "jest-environment-jsdom", // Updated to reference the installed package
//   transform: {
//     "^.+\\.jsx?$": "babel-jest", // Transform .js and .jsx files using babel-jest
//   },
//   moduleNameMapper: {
//     // "^.+\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//     "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
//   },
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Setup for jest-dom
//   moduleNameMapper: {
//     "\\.(jpg|jpeg|png|gif|webp)$": "<rootDir>/src/__mocks__/fileMock.cjs",
//   },
// };

// module.exports = {
//   testEnvironment: "jsdom",
//   transform: {
//     "^.+\\.[tj]sx?$": "babel-jest", // Use babel-jest to transform JS/TS files
//   },
//   moduleNameMapper: {
//     "\\.(css|scss|sass)$": "identity-obj-proxy", // Mock CSS files
//     "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js", // Mock image files
//   },
//   transformIgnorePatterns: [
//     "/node_modules/(?!react-icons)/", // Ignore node_modules except specific packages like react-icons
//   ],
// };

module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // To transform JS/TS files using Babel
  },
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy", // Mock CSS files
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.cjs", // Mock image/static files using CJS
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-icons)/", // Ignore node_modules except react-icons
  ],
};
