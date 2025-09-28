## Next.js এবং React Testing Library: একটি পূর্ণাঙ্গ গাইড 🚀

এই গাইডে আমরা একটি Next.js প্রজেক্টে Jest এবং React Testing Library (RTL) ব্যবহার করে কম্পোনেন্ট টেস্টিং এনভায়রনমেন্ট সেটআপ করার প্রক্রিয়াটি ধাপে ধাপে শিখব। Next.js-এর জন্য Jest হলো প্রস্তাবিত টেস্টিং ফ্রেমওয়ার্ক।

### কেন Jest এবং RTL?

- **Next.js Integration:** Next.js নিজে থেকেই Jest-এর জন্য একটি ডিফল্ট কনফিগারেশন প্রদান করে, যা সেটআপ প্রক্রিয়াকে অনেক সহজ করে দেয়।
- **Jest:** এটি একটি শক্তিশালী এবং জনপ্রিয় জাভাস্ক্রিপ্ট টেস্টিং ফ্রেমওয়ার্ক, যা ফিচার-সমৃদ্ধ এবং ফেসবুক দ্বারা সমর্থিত।
- **React Testing Library (RTL):** এটি আপনাকে ব্যবহারকারীর মতো করে আপনার অ্যাপ্লিকেশন পরীক্ষা করতে সাহায্য করে, যা টেস্টগুলোকে আরও নির্ভরযোগ্য ও বাস্তবসম্মত করে তোলে।

---

### ধাপ ১: নতুন Next.js প্রজেক্ট তৈরি করুন

প্রথমে, টার্মিনাল ব্যবহার করে একটি নতুন Next.js প্রজেক্ট তৈরি করুন। `create-next-app` আপনাকে TypeScript, ESLint ইত্যাদি সেটআপ করতে বলবে, যা আপনি আপনার পছন্দ অনুযায়ী নির্বাচন করতে পারেন।

Bash

```bash
npx create-next-app@latest my-next-app
```

এবার প্রজেক্ট ডিরেক্টরিতে প্রবেশ করুন।

Bash

```bash
cd my-next-app
```

---

### ধাপ ২: টেস্টিংয়ের জন্য প্রয়োজনীয় প্যাকেজ ইনস্টল করুন ⚙️

Next.js প্রজেক্টে টেস্টিং এনভায়রনমেন্ট তৈরির জন্য আমাদের কিছু ডেভেলপার ডিপেন্ডেন্সি (dev dependencies) ইনস্টল করতে হবে।

Bash

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

এখানে প্যাকেজগুলোর ভূমিকা:

- **`jest`**: মূল টেস্টিং ফ্রেমওয়ার্ক।
- **`jest-environment-jsdom`**: Jest-কে ব্রাউজারের মতো DOM এনভায়রনমেন্ট সরবরাহ করে।
- **`@testing-library/react`**: React কম্পোনেন্ট রেন্ডার এবং পরীক্ষা করার মূল লাইব্রেরি।
- **`@testing-library/jest-dom`**: `toBeInTheDocument()`এর মতো দরকারি DOM ম্যাচার যুক্ত করে।
- **`@testing-library/user-event`**: ব্যবহারকারীর অ্যাকশন (ক্লিক, টাইপিং) অনুকরণ করার জন্য।

---

### ধাপ ৩: Jest কনফিগারেশন ফাইল তৈরি করুন

Next.js-এর জন্য Jest কনফিগার করা খুবই সহজ। প্রজেক্টের রুট ফোল্ডারে `jest.config.js` নামে একটি ফাইল তৈরি করুন এবং নিচের কোডটি যোগ করুন।

JavaScript

```jsx
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
```

এই কনফিগারেশন ফাইলটি Next.js-এর বিল্ড সিস্টেমের (যেমন SWC) সাথে Jest-কে সঠিকভাবে কাজ করতে সাহায্য করে।

---

### ধাপ ৪: টেস্টিং সেটআপ ফাইল তৈরি করুন

`jest.config.js` ফাইলে আমরা `setupFilesAfterEnv`-এর জন্য একটি পাথের কথা উল্লেখ করেছি। এখন সেই ফাইলটি তৈরি করতে হবে।

প্রজেক্টের রুট ফোল্ডারে `jest.setup.js` নামে একটি ফাইল তৈরি করুন এবং এতে নিচের কোডটি যোগ করুন:

JavaScript

```jsx
// jest.setup.js
// ঐচ্ছিক: প্রতিটি টেস্টের আগে রান করার জন্য গ্লোবাল সেটআপ

// `@testing-library/jest-dom`-এর ম্যাচারগুলো ইম্পোর্ট করা হচ্ছে
import '@testing-library/jest-dom';
```

এই ফাইলটি নিশ্চিত করে যে, আপনার সব টেস্ট ফাইলে `toBeInTheDocument()`-এর মতো ম্যাচারগুলো কোনো অতিরিক্ত ইম্পোর্ট ছাড়াই কাজ করবে।

---

### ধাপ ৫: প্রথম টেস্ট লিখুন 🧪

Jest সাধারণত `__tests__` ফোল্ডারের ভেতর অথবা `.test.js` / `.spec.js` এক্সটেনশনযুক্ত ফাইলগুলোকে টেস্ট হিসেবে ধরে নেয়। আমরা `__tests__` ফোল্ডার পদ্ধতি অনুসরণ করব।

**উদাহরণ ১: একটি সাধারণ পেইজ টেস্ট করা**

`app` ডিরেক্টরিতে `__tests__` নামে একটি ফোল্ডার তৈরি করুন। এর ভেতরে `Home.test.jsx` নামে একটি ফাইল তৈরি করে ডিফল্ট হোম পেইজটি টেস্ট করি।

JavaScript

```jsx
// app/__tests__/Home.test.jsx
import { render, screen } from '@testing-library/react';
import Home from '../page'; // আপনার হোম পেইজ কম্পোনেন্ট

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(<Home />);

    // `screen.getByRole` ব্যবহার করে হেডিং খুঁজে বের করা
    const heading = screen.getByRole('heading', {
      name: /Get started by editing/i,
    });

    // হেডিংটি ডকুমেন্টে আছে কিনা তা যাচাই করা
    expect(heading).toBeInTheDocument();
  });
});
```

**উদাহরণ ২: নেভিগেশন লিংকসহ একটি কম্পোনেন্ট টেস্ট করা**

অনেক সময় আমাদের এমন কম্পোনেন্ট টেস্ট করতে হয় যেখানে Next.js-এর `<Link>` কম্পোনেন্ট ব্যবহার করা হয়েছে।

প্রথমে, `components` ফোল্ডারে `Navbar.jsx` নামে একটি কম্পোনেন্ট তৈরি করুন।

JavaScript

```jsx
// components/Navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About Us</Link>
    </nav>
  );
}
```

এখন এই `Navbar` কম্পোনেন্টের জন্য একটি টেস্ট লিখি। `components` ফোল্ডারের ভেতর `__tests__` নামে একটি ফোল্ডার এবং এতে `Navbar.test.jsx` ফাইল তৈরি করুন।

JavaScript

```jsx
// components/__tests__/Navbar.test.jsx
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('should render navigation links correctly', () => {
    render(<Navbar />);

    // "Home" লিংকটি খুঁজে বের করা
    const homeLink = screen.getByRole('link', { name: /home/i });
    // "About Us" লিংকটি খুঁজে বের করা
    const aboutLink = screen.getByRole('link', { name: /about us/i });

    // লিংকগুলো ডকুমেন্টে আছে কিনা যাচাই করা
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();

    // লিংকগুলোর `href` অ্যাট্রিবিউট সঠিক কিনা তা যাচাই করা
    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
```

---

### ধাপ ৬: টেস্ট চালান ✅

সবশেষে, আপনার `package.json` ফাইলটি খুলুন এবং `scripts` সেকশনে টেস্ট কমান্ড যোগ করুন।

JSON

```jsx
// package.json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest",
  "test:watch": "jest --watch"
},
```

এবার টার্মিনালে নিচের কমান্ডটি চালালেই আপনার লেখা সব টেস্ট রান করবে।

Bash

```jsx
npm test
```

ফাইল পরিবর্তনের সাথে সাথে টেস্টগুলো স্বয়ংক্রিয়ভাবে চালাতে চাইলে watch mode ব্যবহার করুন:

Bash

```jsx
npm run test:watch
```

অভিনন্দন! আপনি সফলভাবে আপনার Next.js প্রজেক্টে Jest এবং React Testing Library দিয়ে টেস্টিং পরিবেশ সেটআপ করে ফেলেছেন।