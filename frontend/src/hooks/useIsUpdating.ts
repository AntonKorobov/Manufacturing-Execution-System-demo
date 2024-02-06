import { useEffect, useState } from 'react';

interface useIsUpdatingProps {
  isMutating: boolean[];
  isValidating: boolean;
}

export function useIsUpdating({ isMutating, isValidating }: useIsUpdatingProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isMutating.includes(true)) {
      setIsUpdating(true);
    }
    if (!isMutating.includes(true) && !isValidating) {
      setIsUpdating(false);
    }
  }, [isMutating, isValidating]);

  return [isUpdating] as const;
}
