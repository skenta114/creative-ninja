'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './supabaseClient';


export const useAuth = () => {
  const router = useRouter();
    useEffect(() => {
        const f = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            console.log(user)
            if (!user) {
                router.replace('/Login'); // ログインページにリダイレクト
            }
        }
        f()
  }, []);

  return;
};
