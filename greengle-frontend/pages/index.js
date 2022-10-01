import Cart from '../components/Cart'
import Title from '../components/Title'
import {useState, useEffect} from 'react'
import Totals from '../components/Totals'
import Coords from '../components/Coords'

export default function Home() {
    const [finishedItems, setFinishedItems] = useState([])
    const [emmisionsTotal, setEmmisionsTotal] = useState(0)
    const [itemsTotal, setItemsTotal] = useState(0)
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);


    const getLocation = () => {
        if (!navigator.geolocation) {
          setStatus('Geolocation is not supported by your browser');
        } else {
          setStatus('Locating...');
          navigator.geolocation.getCurrentPosition((position) => {
            setStatus(null);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
          }, () => {
            setStatus('Unable to retrieve your location');
          });
        }
      }

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
                <Coords lat={lat} lng={lng} status={status}/>
                <button className='mt-2 text-left' onClick={getLocation}>📍 Get Location</button>
                <Cart finishedItems={finishedItems} setFinishedItems={setFinishedItems} />
                <Totals finishedItems={finishedItems} setFinishedItems={setFinishedItems} emmisionsTotal={emmisionsTotal}/>
            </div>
        </main>
      </>
    )
  }
