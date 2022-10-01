import Link from "next/link";

export default function FinishedItem({name, link, emmisions, unit}) {
    return (
      <>
        <div className="bg-white shadow-md rounded-xl p-6 grid grid-cols-2">
            <div className="flex flex-col justify-center align-start">
                <span className="flex">
                    <p className="font-bold pr-1">Item Name: </p>
                     <p>{name}</p>
                </span>
                <span className="flex">
                    <p className="font-bold pr-1">View on Amazon: </p>
                    <Link href={link}>
                        <a className="hover:text-blue-500">Link 🔗</a>
                     </Link>
                </span>
            </div>
            <div className="text-center">
                <p className="text-5xl font-bold">{emmisions}<span className="text-2xl">kg</span></p>
                <p className="text-xs pt-2 font-mono">C02 Emmisions </p>
            </div>
        </div>
      </>
    )
  }
