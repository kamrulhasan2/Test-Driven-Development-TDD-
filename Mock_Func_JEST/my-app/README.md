# **Mock Function in JEST**

একটি **মক ফাংশন (Mock Function)** হলো একটি "নকল" বা "ডামি" ফাংশন যা টেস্টিংয়ের সময় আসল ফাংশনের পরিবর্তে ব্যবহৃত হয়। এর মূল উদ্দেশ্য হলো কোডের একটি নির্দিষ্ট অংশকে (unit) তার নির্ভরতা (dependencies) থেকে বিচ্ছিন্ন করে পরীক্ষা করা।

ভাবুন, সিনেমার কোনো ঝুঁকিপূর্ণ দৃশ্যে আসল নায়কের পরিবর্তে যেমন একজন **স্টান্ট ডাবল (stunt double)** অভিনয় করে, টেস্টিংয়েও মক ফাংশন ঠিক সেই স্টান্ট ডাবলের কাজটিই করে।

---

## Jest-এ মক ফাংশনের ধারণা (Concept)

Jest-এ মক ফাংশনকে অনেক সময় "spies" বা গুপ্তচরও বলা হয়, কারণ এটি একটি ফাংশনের আচরণ পর্যবেক্ষণ করতে পারে। Jest-এর মক ফাংশন ব্যবহার করে আমরা মূলত তিনটি কাজ করি:

1. **ফাংশনের আউটপুট নিয়ন্ত্রণ করা (Controlling Output):** আমরা মক ফাংশনকে বলে দিতে পারি যে কল করা হলে সে কী মান (value) রিটার্ন করবে। যেমন, একটি API কল সফল হলে কী ডেটা আসবে বা ব্যর্থ হলে কী এরর আসবে, তা আমরা আগে থেকেই নির্ধারণ করে দিতে পারি।
2. **কল ট্র্যাক করা (Tracking Calls):** আমরা ট্র্যাক করতে পারি যে ফাংশনটি কতবার কল করা হয়েছে, কী কী প্যারামিটার দিয়ে কল করা হয়েছে ইত্যাদি। এটি নিশ্চিত করে যে আমাদের কোড প্রত্যাশিত উপায়ে ফাংশনটিকে ব্যবহার করছে।
3. **আসল ইমপ্লিমেন্টেশন পরিবর্তন করা (Changing Implementation):** আমরা একটি বিদ্যমান ফাংশনের মূল কোডকে সাময়িকভাবে পরিবর্তন করে আমাদের নিজেদের মতো একটি নকল ইমপ্লিমেন্টেশন সেট করতে পারি।

### কেন মক ফাংশন ব্যবহার করা হয়?

- **নির্ভরতা (Dependency) দূর করা:** যখন কোনো ফাংশন একটি এক্সটার্নাল সার্ভিস (যেমন: API, ডাটাবেস) বা অন্য কোনো জটিল মডিউলের উপর নির্ভরশীল থাকে, তখন টেস্টকে সেই নির্ভরতা থেকে মুক্ত রাখতে মক ফাংশন ব্যবহার হয়। এর ফলে টেস্ট দ্রুত, নির্ভরযোগ্য এবং অফলাইনেও চালানো যায়।
- **ইউনিট টেস্টিং (Unit Testing):** এটি কোডের একটি নির্দিষ্ট অংশকে আলাদাভাবে পরীক্ষা করতে সাহায্য করে। যেমন, আপনি শুধু ডেটা প্রসেসিং লজিক পরীক্ষা করতে চান, API থেকে ডেটা আনা অংশটি নয়।
- **এজ কেস (Edge Case) টেস্টিং:** মক ব্যবহার করে আপনি সহজেই বিভিন্ন পরিস্থিতি (যেমন: API error, empty data) তৈরি করে আপনার কোড পরীক্ষা করতে পারেন।

---

## Jest-এ মক ফাংশন তৈরির পদ্ধতি ও উদাহরণ 🕵️

Jest-এ মক ফাংশন তৈরি এবং ব্যবহারের বিভিন্ন উপায় রয়েছে।

### ১. `jest.fn()` - বেসিক মক ফাংশন

এটি একটি খালি মক ফাংশন তৈরি করে।

JavaScript

```jsx
test('demonstrates a basic mock function', () => {
  const mockCallback = jest.fn();

  // কিছু কোড যা mockCallback-কে কল করে
  [1, 2].forEach(mockCallback);

  // Assertions (যাচাই করা)
  expect(mockCallback.mock.calls.length).toBe(2); // ফাংশনটি ২ বার কল হয়েছে কিনা
  expect(mockCallback).toHaveBeenCalledTimes(2); // উপরের লাইনের একটি সহজ বিকল্প

  expect(mockCallback).toHaveBeenCalledWith(1); // প্রথমবার '1' দিয়ে কল হয়েছে কিনা
  expect(mockCallback).toHaveBeenCalledWith(2); // দ্বিতীয়বার '2' দিয়ে কল হয়েছে কিনা
});
```

### ২. মক ফাংশনের রিটার্ন ভ্যালু সেট করা

আপনি মকের রিটার্ন ভ্যালু আগে থেকেই ঠিক করে দিতে পারেন।

- **`.mockReturnValue(value)`**: একটি নির্দিষ্ট মান রিটার্ন করার জন্য।
- **`.mockResolvedValue(value)`**: একটি Promise-এর সফল ফলাফল (resolved value) রিটার্ন করার জন্য (async ফাংশনের ক্ষেত্রে)।

JavaScript

```jsx
test('mocking a return value', async () => {
  // সিঙ্ক্রোনাস ফাংশনের জন্য
  const mockFn = jest.fn();
  mockFn.mockReturnValue('Hello Mock!');
  expect(mockFn()).toBe('Hello Mock!');

  // অ্যাসিঙ্ক্রোনাস ফাংশনের জন্য
  const mockAsyncFn = jest.fn();
  mockAsyncFn.mockResolvedValue('Async Hello!');
  const result = await mockAsyncFn();
  expect(result).toBe('Async Hello!');
});
```

### ৩. `jest.spyOn()` - বিদ্যমান ফাংশন মক করা

অনেক সময় আমাদের সম্পূর্ণ মডিউল মক না করে শুধু একটি নির্দিষ্ট ফাংশনের উপর নজর রাখতে বা তার আচরণ পরিবর্তন করতে হয়। তখন `jest.spyOn()` খুব কার্যকর।

JavaScript

```jsx
// math.js
export const add = (a, b) => a + b;

// math.test.js
import * as math from './math';

test('spies on the add method', () => {
  const addSpy = jest.spyOn(math, 'add');

  // কোড যা math.add ফাংশন ব্যবহার করে
  const result = math.add(3, 4);

  // যাচাই করা
  expect(addSpy).toHaveBeenCalledWith(3, 4); // ফাংশনটি সঠিক প্যারামিটার দিয়ে কল হয়েছে কিনা
  expect(result).toBe(7); // আসল ফাংশনটি এখনও কাজ করছে

  addSpy.mockRestore(); // স্পাই রিমুভ করে আসল ফাংশনটি পুনরুদ্ধার করা
});
```

---

## বিস্তারিত উদাহরণ: API কল মক করা ⚙️

এটি মক ফাংশনের সবচেয়ে সাধারণ ব্যবহার। ধরুন, আমাদের একটি ফাংশন আছে যা একটি API থেকে ইউজারের ডেটা নিয়ে আসে।

**যে কোডটি আমরা টেস্ট করব (`userService.js`):**

JavaScript

```jsx
// userService.js
import axios from 'axios';

export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`https://api.example.com/users/${userId}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
```

**টেস্ট ফাইল (`userService.test.js`):**

এই টেস্টে আমরা `axios` মডিউলটিকে মক করব যাতে কোনো আসল নেটওয়ার্ক রিকোয়েস্ট না যায়।

JavaScript

```jsx
// userService.test.js
import axios from 'axios';
import { fetchUser } from './userService';

// Jest-কে বলা হচ্ছে যে 'axios' মডিউলটিকে মক করতে হবে
jest.mock('axios');

describe('fetchUser', () => {
  it('should fetch a user and return their data', async () => {
    // 1. Arrange (প্রস্তুতি)
    const mockUser = { id: 1, name: 'Leanne Graham' };
    const userId = 1;

    // axios.get ফাংশনটিকে মক করা হচ্ছে এবং বলা হচ্ছে এটি একটি সফল Promise রিটার্ন করবে
    axios.get.mockResolvedValue({ data: mockUser });

    // 2. Act (কাজ সম্পাদন)
    const user = await fetchUser(userId);

    // 3. Assert (যাচাই)
    // যাচাই করা হচ্ছে যে axios.get সঠিক URL দিয়ে কল হয়েছে
    expect(axios.get).toHaveBeenCalledWith(`https://api.example.com/users/${userId}`);

    // যাচাই করা হচ্ছে যে fetchUser ফাংশনটি সঠিক ডেটা রিটার্ন করেছে
    expect(user).toEqual(mockUser);
  });

  it('should return null if the API call fails', async () => {
    // Arrange
    const userId = 2;
    // এবার API কল ফেইল হওয়ার পরিস্থিতি তৈরি করা হচ্ছে
    axios.get.mockRejectedValue(new Error('API Error'));

    // Act
    const user = await fetchUser(userId);

    // Assert
    expect(user).toBeNull();
  });
});
```

এই উদাহরণে:

- `jest.mock('axios')` দিয়ে আমরা `axios`এর সব ফাংশনকে স্বয়ংক্রিয়ভাবে মক ফাংশনে পরিণত করেছি।
- `axios.get.mockResolvedValue()` ব্যবহার করে আমরা একটি নকল সফল রেসপন্স তৈরি করেছি।
- `axios.get.mockRejectedValue()` ব্যবহার করে আমরা একটি নকল ব্যর্থ রেসপন্স তৈরি করেছি।
- সবশেষে, `expect` ব্যবহার করে আমরা যাচাই করেছি যে `axios.get` সঠিক URL দিয়ে কল হয়েছে এবং আমাদের `fetchUser` ফাংশনটি প্রত্যাশিত ফলাফল দিয়েছে। ✅

---

---

Next.js প্রজেক্টে মক ফাংশন ব্যবহার করা হয় মূলত ডেটা ফেচিং এবং Next.js-এর নিজস্ব ফিচার (যেমন: রাউটার) যুক্ত কম্পোনেন্টগুলোকে আলাদাভাবে পরীক্ষা করার জন্য। Jest এবং React Testing Library ব্যবহার করে এই কাজটি খুব কার্যকরভাবে করা যায়।

নিচে কিছু বিস্তারিত উদাহরণসহ Next.js প্রজেক্টে মক ফাংশন ব্যবহারের পদ্ধতি দেখানো হলো।

---

### উদাহরণ ১: API কলযুক্ত কম্পোনেন্ট পরীক্ষা করা (Data Fetching) 👤

ধরুন, আপনার একটি কম্পোনেন্ট আছে যা পেইজ লোড হওয়ার সাথে সাথে `useEffect` ব্যবহার করে একটি API থেকে ইউজারের তথ্য নিয়ে আসে এবং প্রদর্শন করে।

**কম্পোনেন্ট (`UserProfile.jsx`):**

JavaScript

```jsx
// components/UserProfile.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.example.com/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user');
      }
    };

    fetchUserData();
  }, [userId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

**টেস্ট ফাইল (`UserProfile.test.jsx`):**

এখানে আমরা `axios`-কে মক করে নেটওয়ার্ক রিকোয়েস্ট ছাড়াই কম্পোনেন্টের বিভিন্ন অবস্থা (লোডিং, সফল, ব্যর্থ) পরীক্ষা করব।

JavaScript

```jsx
// __tests__/UserProfile.test.jsx
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import UserProfile from '../components/UserProfile';

// axios মডিউলটিকে মক করা হচ্ছে
jest.mock('axios');

describe('UserProfile Component', () => {
  const mockUser = {
    name: 'Clementina DuBuque',
    email: 'Rey.Padberg@karina.biz',
  };

  it('should show loading state initially', () => {
    render(<UserProfile userId={10} />);
    // প্রাথমিকভাবে "Loading..." লেখাটি দেখাচ্ছে কিনা
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should display user data after successful API call', async () => {
    // সফল API কলের জন্য মক রেসপন্স তৈরি
    axios.get.mockResolvedValue({ data: mockUser });
    render(<UserProfile userId={10} />);

    // findBy* কোয়েরি অ্যাসিঙ্ক্রোনাস অপারেশনের জন্য অপেক্ষা করে
    const userName = await screen.findByText(mockUser.name);
    const userEmail = await screen.findByText(mockUser.email);
    
    expect(userName).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();

    // ডেটা লোড হওয়ার পর "Loading..." লেখাটি আর নেই
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  });

  it('should display an error message on API failure', async () => {
    // ব্যর্থ API কলের জন্য মক রেসপন্স তৈরি
    axios.get.mockRejectedValue(new Error('API Error'));
    render(<UserProfile userId={10} />);

    // এরর মেসেজটি স্ক্রিনে এসেছে কিনা তা যাচাই
    const errorMessage = await screen.findByText(/failed to fetch user/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
```

---

### উদাহরণ ২: Next.js রাউটার মক করা (App Router) 🔄

Next.js-এর একটি বড় ফিচার হলো এর রাউটিং সিস্টেম। যখন কোনো কম্পোনেন্ট `useRouter` হুক (hook) ব্যবহার করে, তখন তাকে টেস্ট করার জন্য আমাদের রাউটারটিকে মক করতে হয়।

**কম্পোনেন্ট (`LoginButton.jsx`):**

এই কম্পোনেন্টে একটি বাটন আছে, যেটিতে ক্লিক করলে ব্যবহারকারীকে ড্যাশবোর্ড পেইজে নিয়ে যাওয়া হবে।

JavaScript

```jsx
// components/LoginButton.jsx
'use client';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

**টেস্ট ফাইল (`LoginButton.test.jsx`):**

এখানে আমরা `next/navigation` মডিউলটিকে মক করব এবং `router.push` ফাংশনটি সঠিকভাবে কল হয়েছে কিনা তা পরীক্ষা করব।

JavaScript

```jsx
// __tests__/LoginButton.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginButton from '../components/LoginButton';

// useRouter হুকের জন্য একটি মক ফাংশন তৈরি করা হচ্ছে
const mockPush = jest.fn();

// 'next/navigation' মডিউলটিকে মক করা হচ্ছে
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LoginButton', () => {
  // প্রতিটি টেস্টের আগে মক ফাংশনটি পরিষ্কার করা হচ্ছে
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should redirect to /dashboard when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<LoginButton />);

    const button = screen.getByRole('button', { name: /login/i });
    
    // বাটনে ক্লিক করা হচ্ছে
    await user.click(button);

    // যাচাই করা হচ্ছে যে `push` ফাংশনটি সঠিক পাথ দিয়ে কল হয়েছে
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});
```

এই উদাহরণে:

1. `jest.mock('next/navigation', ...)` ব্যবহার করে আমরা `useRouter`এর একটি নকল সংস্করণ তৈরি করেছি।
2. এই নকল `useRouter` একটি অবজেক্ট রিটার্ন করে যার মধ্যে আমাদের তৈরি করা `mockPush` ফাংশনটি রয়েছে।
3. বাটনে ক্লিকের পর আমরা যাচাই করেছি যে `mockPush` ফাংশনটি প্রত্যাশিত আর্গুমেন্ট (`'/dashboard'`) সহ কল হয়েছে কিনা।

এই পদ্ধতিগুলো ব্যবহার করে আপনি Next.js অ্যাপ্লিকেশনের জটিল কম্পোনেন্টগুলোকেও নির্ভরযোগ্যভাবে পরীক্ষা করতে পারবেন।