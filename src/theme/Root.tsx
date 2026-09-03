import type { ReactNode } from 'react';
import ChatBot from '@site/src/components/ChatBot';

export default function Root({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      {children}
      <ChatBot />
    </>
  );
}
