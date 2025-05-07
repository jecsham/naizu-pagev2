"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WikiPage() {

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/wiki') {
      router.push('/wiki/overview', {scroll: true});
    }
  }, []);

  return null;

}
