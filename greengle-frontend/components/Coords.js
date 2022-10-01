export default function Coords({status, lng, lat}) {
    return (
      <>
        <div className="flex flex-col mt-6">
            <h1 className="font-bold text-2xl pr-2">Shipping To:</h1>
            <p>{status}</p>
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}
        </div>
      </>
    )
  }
