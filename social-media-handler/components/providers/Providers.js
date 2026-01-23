'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { ContentProvider } from '@/contexts/ContentContext';
import { Toaster } from 'sonner';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <ContentProvider>
        {children}
        <Toaster position="top-right" richColors />
      </ContentProvider>
    </AuthProvider>
  );
}