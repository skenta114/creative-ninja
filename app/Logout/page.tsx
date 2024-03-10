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
    <main className="flex flex-col justify-center items-center w-full h-screen m-auto">
      <h1 className="text-2xl mb-8 border-b-2 w-2/3 max-w-lg pb-8 text-center text-black">
        Logout
      </h1>
      <form onSubmit={handleLogout}
        className="grid grid-cols-1 gap-10 w-2/3 max-w-lg"
      >
        <button className="bg-red-500 rounded-xl text-white h-10 hover:bg-gray-400" onClick={handleLogout}>
          ログアウト
        </button>
      </form>
    </main>
  );
};

export default LogoutButton;