import React from 'react'
import BurgerMenu from './burgerMenu'
import Link from 'next/link'
import Image from "next/image";
import localImage from "../../public/Icon.jpg";
export default function Header() {

  return (
    <header className="w-full p-2 sticky bg-white ">
      <nav className="p-2">
        <div className="hidden md:flex justify-between  min-w-3xl">
          <div className='opacity:0'></div>
          <div className="ml-1 text-xl">
            <Link href={"/"}><div className="flex flex-col min-h-0 md:flex-row">
              <Image
                src={localImage}
                alt="Be.stie"
                sizes="(max-width: 768px) 15vw, 15vw"
                className="flex-1 w-full h-auto object-cover"
              />


            </div></Link>
          </div>
          <BurgerMenu />
        </div>
        <div className="md:hidden flex justify-between  max-w-3xl ">
          <div className='opacity:0'></div>
          <div className="text-xl">
            <Link href={"/"} ><div className="flex flex-col min-h-0 md:flex-row">
              <Image
                src={localImage}
                alt="Be.stie"
                sizes="(max-width: 768px) 15vw, 15vw"
                className="flex-1 w-full h-auto object-cover"
              />


            </div></Link>
          </div>
          <div className="text-xl justify-end font-bold">
            <BurgerMenu />
          </div>
        </div>
      </nav>
    </header>


  )
}
