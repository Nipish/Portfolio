// This is a Server Component by default (no 'use client').
// Desktop itself is 'use client' because it needs state & event handlers.
import Desktop from '@/components/desktop/Desktop';

export default function Page() {
  return <Desktop />;
}
