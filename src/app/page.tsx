import { redirect } from 'next/navigation';

// This page only renders when the user visits `/`
// which is redirected to `/es` by the middleware
export default function RootPage() {
  redirect('/es');
}
