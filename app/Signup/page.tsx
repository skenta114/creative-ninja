'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import NextLink from "next/link";
import './style_signup.css';


// フォームの入力項目
interface SignupFormInputs {
    email: string;
    password: string;
};


export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();

    // Signupボタンの設定
    const signup: SubmitHandler<SignupFormInputs> = (formData) => {
        console.log(formData);
    };


    return (
        <main className="flex flex-col justify-center items-center w-full h-screen m-auto">
            <h1 className="title">
                Signup
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


                <div className="flex flex-col">
                    <label htmlFor="password" className="small_title">Again Password</label>
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
                    Signup
                </button>
            </form>
        </main>
    )
}