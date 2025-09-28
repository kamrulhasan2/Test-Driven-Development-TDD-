// jest.config.js
const nextJest = require('next/jest');

// `next/jest` কে Next.js-এর কনফিগারেশন লোড করার জন্য পাথ দেওয়া হচ্ছে
const createJestConfig = nextJest({
  dir: './',
});

// Jest-এর জন্য কাস্টম কনফিগারেশন
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // CSS মডিউল হ্যান্ডেল করার জন্য
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
};

// `createJestConfig` দিয়ে `next/jest`-এর কনফিগারেশন এবং কাস্টম কনফিগারেশন একসাথে করা হচ্ছে
module.exports = createJestConfig(customJestConfig);