import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// jest-dom-এর ম্যাচারগুলোকে Vitest-এর `expect`-এর সাথে যুক্ত করা হচ্ছে।
expect.extend(matchers);

// প্রতিটি টেস্ট শেষ হওয়ার পর DOM পরিষ্কার করার জন্য।
afterEach(() => {
  cleanup();
});