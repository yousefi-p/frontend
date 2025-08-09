'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import CoachAvailabilityForm from '@/components/CoachAvailabilityForm';

export default function CoachPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user?.is_staff) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user?.is_staff) {
    return <div className="text-center mt-5">در حال بارگذاری...</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4 text-center">پنل مربی</h1>
      {user && <CoachAvailabilityForm coachId={user.id} />}
    </div>
  );
}
