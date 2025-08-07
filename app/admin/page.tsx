'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user?.is_superuser) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user?.is_superuser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, Admin!</p>
    </div>
  );
}
