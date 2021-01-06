module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["__tests__/pageObjects/"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};
