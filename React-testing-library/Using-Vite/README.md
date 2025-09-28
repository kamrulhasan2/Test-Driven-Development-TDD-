## Vite এবং React Testing Library: একটি পূর্ণাঙ্গ গাইড 🚀

এই গাইডে আমরা একটি Vite-ভিত্তিক React প্রজেক্টে কিভাবে React Testing Library (RTL), Vitest, এবং `jsdom` ব্যবহার করে কম্পোনেন্ট টেস্টিং সেটআপ করতে হয়, তা ধাপে ধাপে দেখব।

### কেন এই কম্বিনেশন?

- **Vite:** অত্যন্ত দ্রুত এবং আধুনিক একটি বিল্ড টুল, যা ডেভেলপমেন্ট অভিজ্ঞতাকে মসৃণ করে।
- **Vitest:** Vite-এর জন্য বিশেষভাবে তৈরি একটি টেস্টিং ফ্রেমওয়ার্ক। এটি Vite-এর কনফিগারেশন ব্যবহার করেই কাজ করে, তাই সেটআপ অনেক সহজ এবং এটি অবিশ্বাস্যভাবে দ্রুত।
- **React Testing Library (RTL):** ব্যবহারকারীর দৃষ্টিকোণ থেকে কম্পোনেন্ট পরীক্ষা করার জন্য একটি সেরা লাইব্রেরি, যা আপনার টেস্টগুলোকে আরও নির্ভরযোগ্য করে তোলে।

---

### ধাপ ১: নতুন Vite + React প্রজেক্ট তৈরি করুন

প্রথমে, টার্মিনাল ব্যবহার করে একটি নতুন React প্রজেক্ট তৈরি করুন।

Bash

```bash
npm create vite@latest my-testing-app -- --template react
```

এবার প্রজেক্ট ডিরেক্টরিতে প্রবেশ করুন এবং `npm install` চালিয়ে দিন।

Bash

```bash
cd my-testing-app
npm install
```

---

### ধাপ ২: টেস্টিংয়ের জন্য প্রয়োজনীয় প্যাকেজ ইনস্টল করুন ⚙️

আমাদের টেস্টিং এনভায়রনমেন্ট সেটআপ করার জন্য কিছু ডেভেলপার ডিপেন্ডেন্সি (dev dependencies) ইনস্টল করতে হবে।

Bash

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

আসুন জেনে নিই কোন প্যাকেজ কী কাজ করে:

- **`vitest`**: আমাদের টেস্ট রানার এবং টেস্টিং ফ্রেমওয়ার্ক।
- **`jsdom`**: Node.js এনভায়রনমেন্টে ব্রাউজারের মতো DOM (Document Object Model) পরিবেশ তৈরি করে, যা ছাড়া RTL কাজ করতে পারে না।
- **`@testing-library/react`**: React কম্পোনেন্ট রেন্ডার এবং পরীক্ষা করার মূল লাইব্রেরি।
- **`@testing-library/jest-dom`**: DOM-এর অবস্থা যাচাই করার জন্য অনেক সুন্দর এবং দরকারি ম্যাচার (matcher) যোগ করে, যেমন `toBeInTheDocument()`।
- **`@testing-library/user-event`**: ব্যবহারকারীর বিভিন্ন অ্যাকশন (যেমন ক্লিক, টাইপিং) অনুকরণ করার জন্য এটি `fireEvent`এর একটি উন্নত সংস্করণ।

---

### ধাপ ৩: Vitest কনফিগারেশন সেটআপ করুন

প্রজেক্টের রুট ফোল্ডারে থাকা `vite.config.js` (অথবা `.js`/.ts) ফাইলটি খুলুন এবং Vitest-এর জন্য কনফিগারেশন যোগ করুন।

JavaScript

```jsx
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js', // অথবা setup.ts
  },
});
```

এখানে কনফিগারেশনের প্রতিটি অংশের ব্যাখ্যা দেওয়া হলো:

- **`globals: true`**: এর মাধ্যমে আপনাকে প্রতিটি টেস্ট ফাইলে `test`, `describe`, `expect` ইত্যাদি ইম্পোর্ট করতে হবে না। Vitest এগুলো গ্লোবালি উপলব্ধ করে দেবে।
- **`environment: 'jsdom'`**: এটি Vitest-কে বলে দেয় যে টেস্ট চালানোর জন্য `jsdom` পরিবেশ ব্যবহার করতে হবে।
- **`setupFiles`**: টেস্ট শুরু হওয়ার আগে কোনো ফাইল রান করার প্রয়োজন হলে তা এখানে উল্লেখ করতে হয়। আমরা এই ফাইলটি `@testing-library/jest-dom`এর ম্যাচারগুলো গ্লোবালি সেট করার জন্য ব্যবহার করব।

---

### ধাপ ৪: টেস্টিং সেটআপ ফাইল তৈরি করুন

`vite.config.js`-এ আমরা `setupFiles`-এর জন্য একটি পাথের কথা উল্লেখ করেছি। এখন সেই ফাইলটি তৈরি করতে হবে।

`src` ফোল্ডারের ভেতর `test` নামে একটি নতুন ফোল্ডার তৈরি করুন এবং তার ভেতরে `setup.js` নামে একটি ফাইল তৈরি করুন।

**ফাইলের অবস্থান:** `src/test/setup.js`

এই ফাইলে নিচের কোডটি লিখুন:

JavaScript

```jsx
// src/test/setup.js
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// jest-dom-এর ম্যাচারগুলোকে Vitest-এর `expect`-এর সাথে যুক্ত করা হচ্ছে।
expect.extend(matchers);

// প্রতিটি টেস্ট শেষ হওয়ার পর DOM পরিষ্কার করার জন্য।
afterEach(() => {
  cleanup();
});
```

এই ফাইলটি নিশ্চিত করে যে:

1. `toBeInTheDocument()`এর মতো সব দরকারি ম্যাচার `expect` ফাংশনে পাওয়া যাবে।
2. প্রতিটি টেস্ট কেস চালানোর পরে `cleanup` ফাংশন কল করে DOM পরিষ্কার করা হবে, যাতে একটি টেস্টের প্রভাব অন্যটির উপর না পড়ে।

---

### ধাপ ৫: একটি কম্পোনেন্ট এবং তার টেস্ট লিখুন 🧪

এখন আমরা একটি সাধারণ কাউন্টার কম্পোনেন্ট এবং সেটির জন্য একটি টেস্ট লিখব।

**১. কম্পোনেন্ট তৈরি করুন:**`src` ফোল্ডারের ভেতর `components` নামে একটি ফোল্ডার তৈরি করুন এবং সেখানে `Counter.jsx` নামে ফাইল তৈরি করুন।

JavaScript

```jsx
// src/components/Counter.jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter</h1>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

**২. টেস্ট ফাইল তৈরি করুন:**`Counter.jsx`-এর পাশেই `Counter.test.jsx` নামে একটি টেস্ট ফাইল তৈরি করুন।

JavaScript

```jsx
// src/components/Counter.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter Component', () => {
  // টেস্ট ১: কম্পোনেন্টটি সঠিকভাবে রেন্ডার হচ্ছে কিনা
  it('should render the initial counter', () => {
    // Arrange: কম্পোনেন্ট রেন্ডার করা
    render(<Counter />);

    // Act & Assert: এলিমেন্টগুলো স্ক্রিনে আছে কিনা তা যাচাই করা
    expect(screen.getByRole('heading', { name: /counter/i })).toBeInTheDocument();
    expect(screen.getByText('Current count: 0')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument();
  });

  // টেস্ট ২: বোতামে ক্লিক করলে কাউন্ট বাড়ছে কিনা
  it('should increment the count when the button is clicked', async () => {
    const user = userEvent.setup();

    // Arrange
    render(<Counter />);

    // Act: বোতামটি খুঁজে বের করে ক্লিক করা
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await user.click(incrementButton);

    // Assert: কাউন্ট বেড়ে `1` হয়েছে কিনা তা যাচাই করা
    expect(screen.getByText('Current count: 1')).toBeInTheDocument();
  });
});
```

---

### ধাপ ৬: টেস্ট চালান ✅

সবশেষে, আপনার `package.json` ফাইলটি খুলুন এবং `scripts` সেকশনে একটি টেস্ট কমান্ড যোগ করুন।

JSON

```jsx
// package.json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "test": "vitest"
},
```

এবার টার্মিনালে নিচের কমান্ডটি চালালেই আপনার টেস্টগুলো রান করবে।

Bash

```bash
npm test
```

আপনি যদি চান যে ফাইল পরিবর্তনের সাথে সাথে টেস্টগুলো আবার চলুক, তাহলে watch mode ব্যবহার করতে পারেন:

Bash

```bash
npm test -- --watch
```

অভিনন্দন! আপনি সফলভাবে Vite + React প্রজেক্টে React Testing Library দিয়ে টেস্টিং পরিবেশ সেটআপ করেছেন।