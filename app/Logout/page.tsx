'use client'

import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/Login'); // ログアウト後にリダイレクト
    } catch (error: any) {
      console.error('ログアウト中にエラーが発生しました:', error.message);
    }
  };

  return (
    <button className="text-black" onClick={handleLogout}>
      ログアウト
    </button>
  );
};

export default LogoutButton;