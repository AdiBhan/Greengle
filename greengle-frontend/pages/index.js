import Cart from '../components/Cart'
import Title from '../components/Title'
import {useState, useEffect} from 'react'
import Totals from '../components/Totals'

export default function Home() {
    const [finishedItems, setFinishedItems] = useState([])
    const [emmisionsTotal, setEmmisionsTotal] = useState(0)
    const [itemsTotal, setItemsTotal] = useState(0)

    useEffect(() => {
        setItemsTotal(finishedItems.length)
        let total = 0
        finishedItems.filter((item) => total += item.emmisions)
        setEmmisionsTotal(total)
      }, [finishedItems])

    return (
      <>
        <main className='flex justify-center max-w-2xl mx-auto m-10'>
            <div className='flex flex-col w-full'>
                <Title />
                <Cart finishedItems={finishedItems} setFinishedItems={setFinishedItems} />
                <Totals finishedItems={finishedItems} setFinishedItems={setFinishedItems} emmisionsTotal={emmisionsTotal}/>
            </div>
        </main>
      </>
    )
  }
