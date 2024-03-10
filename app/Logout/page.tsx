'use client'

import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import './style_logout.css';
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
    <main className="flex flex-col justify-center items-center w-full h-full m-auto">
      <h1 className="logout_title">
        Logout
      </h1>
      <form onSubmit={handleLogout}
        className="grid grid-cols-1 gap-10 w-2/3 max-w-lg"
      >
        <button className="button" onClick={handleLogout}>
          ログアウト
        </button>
      </form>
    </main>
  );
};

export default LogoutButton;