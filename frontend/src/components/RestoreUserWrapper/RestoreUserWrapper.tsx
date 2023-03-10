import { FC, memo, PropsWithChildren, useEffect } from 'react';

import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { useCurrentUserStore } from 'src/core/store/user/store';

/** This component is required to add a user to the redux store if the user's secret is present. */
const RestoreUserWrapperComponent: FC<PropsWithChildren> = ({ children }) => {
  const isUserLoading = useCurrentUserStore(store => store.isLoading);
  const getCurrentUser = useCurrentUserStore(store => store.getCurrentUser);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (isUserLoading) {
    return <AppLoadingSpinner />;
  }

  return <>{children}</>;
};

export const RestoreUserWrapper = memo(RestoreUserWrapperComponent);
