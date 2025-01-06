module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub', // Handle image files
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js' // Handle CSS and SCSS files
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ["<rootDir>/node_modules/"]
};
