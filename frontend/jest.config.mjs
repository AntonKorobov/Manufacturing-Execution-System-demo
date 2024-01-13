import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageReporters: ['html'],
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(config);
