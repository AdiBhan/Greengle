import { useState } from "react"
import axios from "axios";


export default function Example({setFinishedItems, finishedItems}) {
    const [input, setInput] = useState()
    const [loading, setLoading] = useState(false)
    const baseURL = "https://api.rainforestapi.com/request?api_key=41F232E6A10744A1856941BDFF0B9CED&type=product&url=";

    const addItem = (input) => {
        setLoading(true);
        console.log(baseURL+input)
        axios.get(baseURL+input).then((response) => {
            console.log(response.data)
            setFinishedItems([...finishedItems, {
                name: response.data.product.title,
                link: input,
                emmisions: Math.floor(Math.random() * 300),
                unit: 'g',
                key: '1'
            }])
            setLoading(false);
        });
        setInput();
    }
    return (
      <div className="">
        <label htmlFor="email" className="block font-medium">
            Past your Amazon URL here
        </label>
        <div className="mt-1 ">
          <input
            type="url"
            name="url"
            id="url"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-400 sm:text-md"
            placeholder="https:/amazon.com/"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
        type="button"
        className="mt-2 inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-md font-medium leading-4 text-white shadow-sm hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => addItem(input)}
       >
            ✅ Add Item
        </button>
        {loading && (
            <>
              <div>loading...</div>
          </>
        )}
      </div>
    )
  }
