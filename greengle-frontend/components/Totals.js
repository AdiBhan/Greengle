import {useState, useEffect} from 'react'

export default function Totals({finishedItems, setFinishedItems, emmisionsTotal}) {
    return (
      <>
        <div className="mt-8">
            <h3 className="font-bold text-2xl">Your Totals:</h3>
            <div className="mt-4 bg-white shadow-md rounded-xl p-6 grid grid-cols-2">
                <div className="text-center">
                    <p className="text-5xl font-bold">{finishedItems.length}</p>
                    <p className="text-xs pt-2 font-mono">Total Items </p>
                </div>
                <div className="text-center">
                    <p className="text-5xl font-bold">{emmisionsTotal}<span className="text-2xl">kg</span></p>
                    <p className="text-xs pt-2 font-mono">Total C02 Emmisions </p>
                </div>
            </div>
        </div>
      </>
    )
  }
