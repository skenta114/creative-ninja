'use client'

import { useState } from 'react';
import './style_signup.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import NextLink from "next/link";
import './style_signup.css';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


// フォームの入力項目
interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();
  const [error, setError] = useState<string | null>(null);

  // Signupボタンの設定
  const signup: SubmitHandler<SignupFormInputs> = async (formData) => {
    try {
      const response = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (response.error) {
        setError(response.error.message);
      } else {
        console.log('Sign up successful!', response.data.user);
        // リダイレクトまたは他の処理を追加する
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <main className="flex flex-col justify-center items-center w-full  m-auto h-full">
      <h1 className="signup_title">
        Signup
      </h1>

      <form onSubmit={handleSubmit(signup)} className="grid grid-cols-1 gap-10 w-2/3 max-w-lg">
        {/* 名前の入力 */}
        <div className="flex flex-col">
          <input
            id="name"
            type="text"
            className="border border-solid border-[#ddd] rounded-3xl w-full h-12 py-2 px-3 focus:outline-none focus:border-sky-300 text-black"
            placeholder='name'
            {...register('name', { required: '名前を入力してください。' })}
          />
          <span className="text-red-600">{errors.email && errors.email.message}</span>
        </div>

        {/* メールアドレスの入力 */}
        <div className="flex flex-col">
          <input
            id="email"
            type="email"
            className="border border-solid border-[#ddd] rounded-3xl w-full h-12 py-2 px-3 focus:outline-none focus:border-sky-300 text-black"
            placeholder='email'
            {...register('email', { required: 'メールアドレスを入力してください。' })}
          />
          <span className="text-red-600">{errors.email && errors.email.message}</span>
        </div>

        {/* パスワードの入力 */}
        <div className="flex flex-col">
          <input
            id="password"
            type="password"
            className="border border-solid border-[#ddd] rounded-3xl w-full h-12 py-2 px-3 focus:outline-none focus:border-sky-300 text-black"
            placeholder='password'
            {...register('password', { required: 'パスワードを入力してください。' })}
          />
          <span className="text-red-600">{errors.password && errors.password.message}</span>
        </div>
        {error && <span className="text-red-600">{error}</span>}
        <button type="submit" className="bg-blue-500 rounded-xl text-white h-10 hover:bg-sky-300">
          Signup
        </button>
      </form>
      <div className="mt-4 ">
        <Link href={"./Login"} className='Relogin' >
          Login
        </Link>
      </div>
    </main>
  )
}