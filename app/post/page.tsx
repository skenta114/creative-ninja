'use client'
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { v4 as uuidv4 } from 'uuid';
// import EXIF from 'exif-js';
// import exif  from 'exif-reader'

export default function ImageApp() {
  const public_url = "https://ypiitqzrcwvannvqfhew.supabase.co/storage/v1/object/public/picturs/img/";
  const [urlList, setUrlList] = useState<string[]>([]);
  const [loadingState, setLoadingState] = useState("hidden");
  const [file, setFile] = useState<File | undefined>(undefined);
  
  console.log(urlList)
  const listAllImage = async () => {
    setLoadingState("flex justify-center");
    try {
      const { data, error } = await supabase
        .storage
        .from('picturs')
        .list("img", {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) {
        console.error("Error fetching images:", error.message);
        return;
      }

      const tempUrlList: string[] = data
        .filter(item => item.name !== ".emptyFolderPlaceholder")
        .map(item => item.name);

      setUrlList(tempUrlList);
    } finally {
      setLoadingState("hidden");
    }
  };

  useEffect(() => {
    listAllImage();
  }, []);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
    };
    const onCancel = () => {
        setFile(undefined);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (file && file.type.match("image.*")) {

      const fileExtension = file.name.split(".").pop();

      // 画像の保存
      const { error } = await supabase.storage
        .from('picturs')
        .upload(`img/${uuidv4()}.${fileExtension}`, file);

      if (error) {
        alert("エラーが発生しました：" + error.message);
      } else {
        setFile(undefined);
        listAllImage();
      }
    } else {
      alert("画像ファイル以外はアップロードできません。");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen m-auto">
      <form className="mb-4 text-center" onSubmit={onSubmit}>
        <input
          className="relative mb-4 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
          type="file"
          id="formFile"
          accept="image/*"
          onChange={handleChangeFile}
        />
        <button type="submit" disabled={!file} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-25">
          送信
        </button>
            <button type="button" onClick={onCancel} className="z-index: 5 text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-25">
            キャンセル
        </button>
      </form>
      {file && (
        <div className="flex flex-col justify-center items-center w-full h-screen m-auto">
          <h2>アップロード予定の画像</h2>
          <img
            className="h-10em w-10em padding-top-20px"
            src={URL.createObjectURL(file)}
            alt="プレビュー"
          />
        </div>
      )}
      <div className="w-full max-w-3xl">
        <div className={loadingState} aria-label="読み込み中">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
        <ul className="flex flex-wrap w-full">
          {urlList.map((item, index) => (
            <li className="w-1/4 h-auto p-1" key={item}>
              <a className="hover:opacity-50" href={public_url + item} target="_blank" rel="noopener noreferrer">
                <img className="object-cover max-h-32 w-full" src={public_url + item} alt={`Image ${index}`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
