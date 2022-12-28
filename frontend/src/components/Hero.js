import {useEffect, useState} from 'react';

const Hero = ({dispatch}) => {
    const [search, setSearch] = useState(""); 
    useEffect(()=>{
        dispatch({type:"FILTER_JOBS", search:search})
    }, [search, dispatch])
 
  return (
    <>
    <section className="container mx-auto px-6">
            <div className="w-full">
                <div className="w-3/4">
                <button className="rounded-full py-2 px-6 bg-transparent border border-teal-500 text-teal-500 hover:text-white hover:border-transparent hover:bg-teal-600">We're hiring</button>
                <h1 className="mt-5 text-2xl md:text-4xl lg:text-6xl font-bold text-teal-600 mb-2 lg:mb-6">Be part of our mission</h1>
                <p className="lg:my-12 my-6 text-sm md:text-md lg:text-xl font-semibold text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, nobis. Deserunt aliquam quo magnam recusandae placeat, tenetur distinctio quos animi earum quasi.</p>
                </div>
            </div>
            <div className="w-full">
                <div className="mb-6">
                    <label htmlFor="search" className="mb-3 block text-xl text-teal-600 font-semibold">Search:</label>
                    <input type="text" id="search" value={search} onChange={(e)=>setSearch(e.target.value)} name="search" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="Search ..." required />
                </div>
            </div>
        </section>
    </>
  )
}
export default Hero