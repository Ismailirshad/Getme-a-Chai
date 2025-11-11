import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-white h-[44vh] p-3 flex flex-col justify-center items-center">
        <div className="font-bold flex items-center gap-3 text-3xl md:text-5xl m-3"> Buy Me a chai
          <span>
            <img src="chai.png" alt='chai' width={88} ></img>
          </span>
        </div>
        <p>A crowdfunding platform for creators. get funded by your fans and followers.</p>
        <div>

          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
           focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 m-2">Start now</button>
          </Link>

          <Link href="/about">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
           focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 m-2">Read more</button>
          </Link>
        </div>

      </div>
      <div className="bg-slate-50 h-1 opacity-15">
      </div>

      <div className="text-white container mx-auto">
        <h1 className="text-2xl font-bold text-center my-8" >Your Fans can buy u a chai</h1>
        <div className="flex py-8 flex-col md:flex-row justify-around">
          <div className="item  flex flex-col justify-center items-center">
            <img src="person.gif" alt='person' className="p-2" width={90}></img>
            <p className="font-bold"> Fans want to help</p>
            <p className="">Your fans are available for yo to help you</p>        </div>
          <div className="item  flex flex-col justify-center items-center">
            <img src="coin.gif" alt='coin' className="  p-2" width={88}></img>
            <p className="font-bold"> Fans want to help</p>
            <p className="">Your fans are available for yo to help you</p>        </div>
          <div className="item flex flex-col justify-center items-center">
            <img src="group.png" alt='group' className=" p-2" width={88}></img>
            <p className="font-bold "> Fans want to help</p>
            <p className="">Your fans are available for yo to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 h-1 opacity-15">
      </div>

      <div className="text-white">
        <div className=" flex flex-col py-8 md:h-[450px] h-[300px] mx-auto justify-center items-center">
          <h1 className="text-2xl font-bold text-center pb-10" >Support us</h1>

          <img src='DonateImage.png' alt='Donateimg' className="h-3/4 w-2/4 rounded-xl" />
        </div>
      </div>

      <div className="bg-slate-50 h-1 opacity-15">
      </div>

      <div className="text-white container mx-auto">
        <h1 className="text-2xl font-bold text-center my-8" >Learn more About us</h1>
        <div className="flex py-8 flex-col md:flex-row  justify-around">
          <div className="item  flex flex-col justify-center items-center">
            <img src="person.gif" alt='person' className="p-2" width={90}></img>
            <p className="font-bold"> Fans want to help</p>
            <p className="">Your fans are available for yo to help you</p>        </div>
          <div className="item  flex flex-col justify-center items-center">
            <img src="coin.gif" alt='coin' className="  p-2" width={88}></img>
            <p className="font-bold"> Fans want to help</p>
            <p className="">Your fans are available for yo to help you</p>        </div>
          <div className="item flex flex-col justify-center items-center">
            <img src="group.png" alt='group' className=" p-2" width={88}></img>
            <p className="font-bold "> Fans want to help</p>
            <p className="">Your fans are available for yo to help you</p>
          </div>
        </div>
      </div>
    </>
  );
}
