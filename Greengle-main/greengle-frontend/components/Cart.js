import URL from "./URL";
import FinishedItem from '../components/FinishedItem'
import {useState, useEffect} from 'react'

export default function Cart({finishedItems, setFinishedItems}) {

    return (
      <div className="mt-10">
        <p className="font-bold text-2xl">My Cart:</p>
        <div className="space-y-4">
            {finishedItems.map((item) => (
                <>
                    <FinishedItem name={item.name} link={item.link} emmisions={item.emmisions} unit={item.unit} brand={item.brand} key={item.key} />
                </>
            ))}
        </div>
        <div className="mt-6">
            <URL setFinishedItems={setFinishedItems} finishedItems={finishedItems} />
        </div>
      </div>
    )
  }
