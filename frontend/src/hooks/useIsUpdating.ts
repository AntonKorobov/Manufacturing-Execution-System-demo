import { useEffect, useState } from 'react';

interface useIsUpdatingProps {
  isMutating: boolean;
  isValidating: boolean;
  forceRevalidation: VoidFunction;
}

export function useIsUpdating({
  isMutating,
  isValidating,
  forceRevalidation,
}: useIsUpdatingProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isMutating) {
      setIsUpdating(true);
      forceRevalidation();
    }
    if (!isMutating && !isValidating) {
      setIsUpdating(false);
    }
  }, [isMutating, isValidating]);

  return [isUpdating] as const;
}
