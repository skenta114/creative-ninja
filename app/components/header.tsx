import React from 'react'
import BurgerMenu from './burgerMenu'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full p-2 sticky bg-gray-100">
      <nav className="p-2">
        <div className="hidden md:flex justify-between  min-w-3xl">
          <div className='opacity:0'></div>
          <div className="ml-1 text-xl  font-fantasy">
            <Link href={"/"}>アプリ名</Link>
          </div>
          <BurgerMenu />
        </div>
        <div className="md:hidden flex justify-between  max-w-3xl ">
          <div className='opacity:0'></div>
          <div className="text-xl font-fantasy">
            <Link href={"/"}>アプリ名</Link>
          </div>
          <div className="text-xl justify-end font-bold">
            <BurgerMenu />
          </div>
        </div>
      </nav>
    </header>


  )
}
