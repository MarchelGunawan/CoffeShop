import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';// Di file global seperti App.tsx atau index.tsx
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faReceipt, faMugHot, faCircleUser, faCreditCard, faCircleArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';

library.add([faCartShopping, faReceipt, faMugHot, faCircleUser, faCreditCard, faCircleArrowRight, faStar]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
