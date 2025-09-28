### React Testing Library কি?

React Testing Library (RTL) হলো React কম্পোনেন্ট টেস্টিংয়ের জন্য একটি জনপ্রিয় জাভাস্ক্রিপ্ট লাইব্রেরি। এটি DOM টেস্টিং লাইব্রেরির উপর ভিত্তি করে তৈরি এবং React কম্পোনেন্টের সাথে কাজ করার জন্য অতিরিক্ত API যুক্ত করে। এর মূল দর্শন হলো, **"The more your tests resemble the way your software is used, the more confidence they can give you."** 🧐

এর মানে হলো, আপনার টেস্টগুলো যত বেশি ব্যবহারকারীর মতো করে সফটওয়্যারটি ব্যবহার করবে, তত বেশি নির্ভরযোগ্য হবে। RTL আপনাকে কম্পোনেন্টের অভ্যন্তরীণ বাস্তবায়ন (implementation details) পরীক্ষা করার পরিবর্তে, ব্যবহারকারীরা যা দেখতে এবং করতে পারে, তা পরীক্ষা করতে উৎসাহিত করে।

---

### React Testing Library এর সুবিধা

- **ব্যবহারকারী-কেন্দ্রিক টেস্টিং:** এটি আপনাকে ব্যবহারকারীর দৃষ্টিকোণ থেকে টেস্ট লিখতে সাহায্য করে। যেমন—একজন ব্যবহারকারী একটি Button দেখতে পাচ্ছে কিনা, সেটিতে ক্লিক করতে পারছে কিনা, বা একটি ফর্ম পূরণ করতে পারছে কিনা।
- **সহজ রক্ষণাবেক্ষণ:** যেহেতু আপনি কম্পোনেন্টের অভ্যন্তরীণ স্টেট বা ফাংশন পরীক্ষা করছেন না, তাই কোড রিফ্যাক্টর (refactor) করলেও আপনার টেস্টগুলো সহজে ভাঙে না, যতক্ষণ পর্যন্ত কম্পোনেন্টের বাহ্যিক আচরণ ঠিক থাকে।
- **অ্যাক্সেসিবিলিটি (Accessibility):** RTL এমন কোয়েরি (query) ব্যবহার করতে উৎসাহিত করে যা সহায়ক প্রযুক্তি (assistive technologies) ব্যবহারকারীদের অভিজ্ঞতাকে প্রতিফলিত করে। যেমন—`getByRole`, `getByLabelText` ইত্যাদি। এটি আপনাকে আরও অ্যাক্সেসিবল অ্যাপ্লিকেশন তৈরি করতে সাহায্য করে।

---

### কিভাবে React Testing Library ব্যবহার করা যায়?

RTL ব্যবহার করার প্রক্রিয়াটি কয়েকটি ধাপে বিভক্ত:

**১. রেন্ডার (Render):**
প্রথমে, `render` ফাংশন ব্যবহার করে আপনার কম্পোনেন্টটিকে একটি ভার্চুয়াল DOM-এ রেন্ডার করতে হবে।

```jsx
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders a welcome message', () => {
  render(<MyComponent />);
  // ...বাকি টেস্ট এখানে লেখা হবে
});
```

**২. এলিমেন্ট খুঁজে বের করা (Querying):**
কম্পোনেন্ট রেন্ডার করার পর, আপনাকে বিভিন্ন **কোয়েরি** ব্যবহার করে DOM থেকে নির্দিষ্ট এলিমেন্ট খুঁজে বের করতে হবে। RTL বিভিন্ন ধরনের কোয়েরি প্রদান করে, তবে অগ্রাধিকারের ভিত্তিতে কিছু জনপ্রিয় কোয়েরি হলো:

- **`getByRole`:** এটি সবচেয়ে পছন্দের কোয়েরি, কারণ এটি অ্যাক্সেসিবিলিটির উপর ভিত্তি করে এলিমেন্ট খুঁজে বের করে। যেমন—`role="button"`, `role="checkbox"`।
- **`getByLabelText`:** ফর্ম ইনপুট খুঁজে বের করার জন্য এটি খুবই কার্যকর।
- **`getByText`:** যেকোনো টেক্সট কন্টেন্টের উপর ভিত্তি করে এলিমেন্ট খুঁজে বের করে।
- **`getByTestId`:** যখন অন্য কোনো উপায়ে এলিমেন্ট খুঁজে বের করা কঠিন হয়, তখন এই অ্যাট্রিবিউটটি ব্যবহার করা যেতে পারে।

```jsx
// একটি Button খুঁজে বের করা
const buttonElement = screen.getByRole('button', { name: /click me/i });
```

**৩. ব্যবহারকারীর আচরণ অনুকরণ করা (User Interaction):**
এলিমেন্ট খুঁজে বের করার পর, `@testing-library/user-event` প্যাকেজটি ব্যবহার করে আপনি ব্যবহারকারীর বিভিন্ন আচরণ (interaction), যেমন—ক্লিক করা, টাইপ করা ইত্যাদি অনুকরণ করতে পারেন।

```jsx
import userEvent from '@testing-library/user-event';

// Button ক্লিক করা
await userEvent.click(buttonElement);
```

**৪. যাচাই করা (Assertion):**
সবশেষে, `expect` ফাংশন (যা Jest টেস্টিং ফ্রেমওয়ার্ক থেকে আসে) ব্যবহার করে আপনি যাচাই করবেন যে, ব্যবহারকারীর আচরণের পর আপনার কম্পোনেন্টটি প্রত্যাশিত অবস্থায় আছে কিনা।

```jsx
// যাচাই করা হচ্ছে যে একটি বার্তা প্রদর্শিত হচ্ছে
const messageElement = screen.getByText(/button was clicked/i);
expect(messageElement).toBeInTheDocument();
```

---

### একটি পূর্ণাঙ্গ উদাহরণ

আসুন, একটি বোতামের রঙ পরিবর্তনের একটি টেস্ট কেস দেখি:

**কম্পোনেন্ট (`ColorButton.jsx`):**

```jsx
import { useState } from 'react';

export default function ColorButton() {
  const [color, setColor] = useState('red');
  const newColor = color === 'red' ? 'blue' : 'red';

  return (
    <button
      style={{ backgroundColor: color }}
      onClick={() => setColor(newColor)}
    >
      Change to {newColor}
    </button>
  );
}
```

**টেস্ট (`ColorButton.test.js`):**

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorButton from './ColorButton';

test('button has correct initial color and updates when clicked', async () => {
  // 1. কম্পোনেন্ট রেন্ডার করা
  render(<ColorButton />);

  // 2. বোতামটি খুঁজে বের করা এবং প্রাথমিক অবস্থা যাচাই করা
  const colorButton = screen.getByRole('button', { name: /change to blue/i });
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  // 3. বোতামে ক্লিক করা
  await userEvent.click(colorButton);

  // 4. ক্লিকের পর অবস্থা যাচাই করা
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
  expect(colorButton).toHaveTextContent('Change to red');
});
```

এই উদাহরণটি দেখায় কিভাবে React Testing Library ব্যবহার করে একটি কম্পোনেন্টের সম্পূর্ণ কার্যকারিতা একজন ব্যবহারকারীর দৃষ্টিকোণ থেকে পরীক্ষা করা যায়। 🚀