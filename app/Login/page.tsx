'use client'

import Link from "next/link";
import './style_login.css';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Head from "next/head";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '@/utils/supabaseClient';


// フォームの入力項目
interface LoginFormInputs {
    email: string;
    password: string;
};

export default function Login() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [error, setError] = useState < string | null > (null);

    // やりたいこと
    //ログイン
    //うまくいったらエラーではなくuserdataが帰ってくる
    //データを他のページでも使えるように更新する
    //ログイン済みユーザがいたらページの表示、いなかったらログインページに
    const login: SubmitHandler<LoginFormInputs> = async (formData) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (error) {
                setError(error.message);
            } else {
                console.log('Login succsessfull!');
                router.push('/')
            }

        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <main className="flex flex-col justify-center items-center w-full h-screen m-auto">

            <h1 className="title">
                Login
            </h1>

            <form onSubmit={handleSubmit(signup)}
                className="grid grid-cols-1 gap-10 w-2/3 max-w-lg"
            >
                <div className="flex flex-col">
                    <label htmlFor="email" className="small_title">Mail Adress</label>
                    <input id="email" type="email" className="bg-gray-100 rounded h-10"
                        {...register('email',
                            {
                                required: "メールアドレスを入力して下さい。",
                                maxLength: { value: 319, message: "319文字以下で入力して下さい。" }
                            })
                        }
                    />
                    <span className="text-red-600">
                        {errors.email && errors.email.message}
                    </span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="small_title">Password</label>
                    <input id="password" type="password" className="bg-gray-100 rounded h-10"
                        {...register('password',
                            {
                                required: "パスワードを入力して下さい。",
                                minLength: { value: 6, message: "6文字以上で入力して下さい。" },
                                maxLength: { value: 128, message: "128文字以下で入力して下さい。" }
                            })
                        }
                    />
                    <span className="text-red-600">
                        {errors.password && errors.password.message}
                    </span>
                </div>

                <button type="submit" className="button">
                    Login
                </button>

                <p className="signup">新規登録の方は<Link href={"./Signup"} className="link">こちら</Link></p>

=======
            <h1 className="text-2xl mb-8 border-b-2 w-2/3 max-w-lg pb-8 text-center text-black">
                Login
            </h1>
            <form onSubmit={handleSubmit(login)}
                className="grid grid-cols-1 gap-10 w-2/3 max-w-lg"
            >
                {/* メールアドレス */}
            <div className="flex flex-col">
                <input
                    id="email"
                    type="email"
                    className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-300 text-black"
                    placeholder='email'
                    {...register('email', { required: 'メールアドレスを入力してください。' })}
                />
                <span className="text-red-600">{errors.email && errors.email.message}</span>
            </div> 
                
            {/* パスワード */}
            <div className="flex flex-col">
                <input
                    id="password"
                    type="password"
                    className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-300 text-black"
                    placeholder='password'
                    {...register('password', { required: 'パスワードを入力してください。' })}
                />
                <span className="text-red-600">{errors.password && errors.password.message}</span>
            </div>
                
            <button type="submit" className="bg-blue-500 rounded-xl text-white h-10 hover:bg-sky-300 ">
                Login
            </button>
            </form>
        </main>
    )
}