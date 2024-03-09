'use client'

import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from "next/image"
import { useCallback, useState } from "react"
import { register } from "module"
import "./style.css"
//投稿
const Post = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [postPhoto, setPost] = useState<File | null>(null)
    const [message, setMessage] = useState('')
    const [fileMessage, setFileMessage] = useState('')
    const [postUrl, setPostUrl] = useState('/default.png')

    //画像の取得
    // useEffect(() => {
    // if (user && user.avatar_url) {
    //   setAvatarUrl(user.avatar_url)
    // }
    //  }, [user])


    //画像のアップロード
    const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        setFileMessage('')

        //ファイルが選択されていない場合
        if (!files || files?.length == 0) {
            setFileMessage('画像をアップロードしてください。')
            return
        }

        const fileSize = files[0]?.size / 1024 / 1024 //size in MB
        const fileType = files[0]?.type // MIME type of file


        //画像サイズが2MBを超えるとき
        if (fileSize > 2) {
            setFileMessage('画像サイズが2MB以下にする必要があります。')
            return
        }

        //ファイル形式がjpgまたはpngではない場合
        if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
            setFileMessage('画像はjpgまたはpng形式である必要があります。')
            return
        }

        //画像をセット
        setPost(files[0])
    }, [])

    //送信
    //const onSubmit: SubmitHandler<Schema> = async (data) => {
    // setLoading(true)
    // setMessage('')

    // try {
    //    let avatar_url = user.avatar_url

    //   if (avatar) {
    //       const { data: storageData, error: storageError } = await supabase.storage
    //           .from('profile')
    //           .upload(`${user.id}/${uuidv4()}`, avatar)

    //エラーチェック
    //   if (storageError) {
    //       setMessage('エラーが発生しました。' + storageError.message)
    //       return
    //   }

    //  if (avatar_url) {
    //      const fileName = avatar_url.split('/').slice(-1)[0]

    //古い画像の削除
    //     await supabase.storage.from('profile').remove([`${user.id}/${fileName}`])
    //    }

    //    const { data: urlData } = await supabase.storage
    //        .from('profile')
    //        .getPublicUrl(storageData.path)

    //    avatar_url = urlData.publicUrl
    // }
    //プロフィールアップデート
    //  const { error: updateError } = await supabase
    //    .from('profiles')
    //    .update({
    //        name: data.name,
    //       introduction: data.introduction,
    //       avatar_url,
    //    })
    //    .eq('id', user.id)

    //エラーチェック
    //  if (updateError) {
    //    setMessage('エラーが発生しました。' + updateError.message)
    //     return
    //  }
    //  setMessage('プロフィールを更新しました。')
    //   } catch (error) {
    //       setMessage('エラーが発生しました。' + error)
    //      return
    //  } finally {
    //      setLoading(false)
    //      router.refresh()
    //  }
    //  }


    return (
        <div>
            <form> {/*onSubmit={handleSubmit(onSubmit)}を削除しました*/}

                {/* 投稿画像 */}
                <div className="mb-5">
                    <div className="flex flex-col text-sm items-center justify-center mb-5">
                        { /*  <div className="relative w-24 h-24 mb-10"> */}
                        {/*      <Image src={postUrl} className="rounded-full object-cover" alt="post" fill/> */}
                        {/* </div> */}
                        <label className="fileUpLoad">
                            ＋
                            <input className="fileUpLoad-input" type="file" id="post" onChange={onUploadImage} />
                        </label>
                        {fileMessage && <div className="texe-center text-red-500 my-5">{fileMessage}</div>}
                    </div>
                </div>
                {/* 投稿内容 */}
                <div className="mb-7 text-center ">
                    <textarea
                        className="border rounded-md  w-80 py-2 px-3 focus:outline-none focus:border-sky-500 resize-none "
                        placeholder="テキストを追加"
                        id="post"
                        rows={8}
                    />
                </div>
                <div className="text-center mb-5">

                    {/*   {loading ? (
                       <Loading />
                    ) : (                      
                        を削除しました */}

                    <button
                        type="submit"
                        className="btn-square-shadow"
                    >post
                    </button>
                    {/*
                        )} 
                      */}
                </div>
            </form>
            {/* メッセージ*/}
            {message && <div className="my-5 text-center text-red-500 mb">{message}</div>}
        </div>
    )
}

export default Post

