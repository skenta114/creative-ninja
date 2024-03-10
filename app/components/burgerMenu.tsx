'use client'
import Link from 'next/link';
import { useState } from 'react';
import { slide as Menu, State } from 'react-burger-menu';

// Menuコンポーネントに適用させるCSS
const styles = {
  bmBurgerButton: {
    position: 'absolute',
    right: '20px',
    width: '32px',
    height: '26px',
  },
  bmBurgerBars: {
    background: '#696969'
  },
  bmCross: {
    background: 'white'
  },
  bmMenuWrap: {
    height: '100%',

  },
  bmMenu: {
    background: 'dimgray',
    padding: '2.5em 1.5em 0',
  },
  bmItemList: {
    color: 'white',
  },
}

export default function BurgerMenu() {
  // メニュー画面の開閉状態を管理する「isMenuOpen」を設定
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // メニューを閉じるための関数を設定
  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  // メニュー画面の開閉状態を確認するための関数を設定
  const handleStateChange = (state: State) => {
    setIsMenuOpen(state.isOpen)
  }

  return (
    <div id="outer-container">
      <Menu
        isOpen={isMenuOpen}
        onStateChange={handleStateChange}
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        right={true}
        styles={styles}

      >
        <main id="page-wrap">
          <ul className="flex flex-col z-[10]">
            <li className="mb-4">
              <button className="hover:opacity-50 underline"
                onClick={() => { handleCloseMenu() }}
              >
                <Link href={"./profile"}>プロフィール編集</Link>
              </button>
            </li>
            <li className="mb-4">
              <button className="hover:opacity-50 underline"
                onClick={() => { handleCloseMenu() }}
              >

                <Link href={"/post"}>投稿 </Link>
              </button>
            </li>
            <li className="mb-4">
              <button className="hover:opacity-50 underline"
                onClick={() => { handleCloseMenu() }}
              >
                <Link href={"/Follower"}>フォロー一覧  </Link>
              </button>
            </li>
            <li className="mb-4">
              <button className="hover:opacity-50 underline"
                onClick={() => { handleCloseMenu() }}
              >
                <Link href={"/Login"}>ログイン </Link>
              </button>
            </li>
            <li className="mb-4">
              <button className="hover:opacity-50 underline"
                onClick={() => { handleCloseMenu() }}
              >
                <Link href={"/Signup"}>サインアップ </Link>
              </button>
            </li>
            <li className="mb-4">
              <button className="hover:opacity-50 underline"
                onClick={() => { handleCloseMenu() }}
              >
                <Link href={"/Logout"}>ログアウト </Link>
              </button>
            </li>

          </ul>
        </main>
      </Menu>
    </div>
  )
}