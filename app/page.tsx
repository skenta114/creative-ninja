import Link from "next/link";
import Signup from "./Signup/page";
import Login from "./Login/page";

export default function Home() {
  return (

    <main className="w-full">
      <p>hello, world</p>
      <div>
        <h1>First</h1>
        <Link href={"./Signup"}>Signup へ</Link>
      </div>

      <div>
        <h1>First</h1>
        <Link href={"./Login"}>Login へ</Link>
      </div>

      <div id="main-visual" className="md:flex justify-between m-1 p-1 bg-red-100">
        <div className="md:w-1/2 md:h-64 flex justify-center m-1 p-1 bg-red-200">
          <div className="flex items-center">
            実験１
          </div>
        </div>

        <div className="md:w-1/2 md:h-64 flex justify-center m-1 p-1 bg-red-200">
          <div className="flex items-center">
            実験２
          </div>
        </div>
      </div>


      <div id="content1" className="flex justify-center m-1 p-1 bg-yellow-100">
        <div className="w-full h-64 flex justify-center items-center bg-yellow-200">
          Content1
        </div>
      </div>

      <div id="content2" className="flex justify-center m-1 p-1 bg-orange-100">
        <div className="w-full h-64 flex justify-center items-center bg-orange-200">
          Content2
        </div>
      </div>

    </main>
  );
}