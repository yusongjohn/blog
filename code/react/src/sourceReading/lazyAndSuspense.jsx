import React, { Suspense } from 'react';

// const OtherComponent = React.lazy(() => {
//   return import('./OtherComponent');
// });

const OtherComponent = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = import('./OtherComponent');
      resolve(res);
    }, 2000);
  });
});

export default function MyComponent(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent/>
    </Suspense>
  );
}
