import { Suspense, FC } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { Spin } from 'antd';

import { RootRouter } from './routes/RootRouter';

export const App: FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Spin/>}>
      <RootRouter/>
    </Suspense>
  </BrowserRouter>
);
