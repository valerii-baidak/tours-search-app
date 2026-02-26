import { type RefObject, useEffect } from 'react';

const useSubmitOnEnter = (formRef: RefObject<HTMLFormElement | null>) => {
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;

      e.preventDefault();
      formRef.current?.requestSubmit();
    };

    document.addEventListener('keydown', handleEnter);

    return () => {
      document.removeEventListener('keydown', handleEnter);
    };
  }, []);
};

export default useSubmitOnEnter;