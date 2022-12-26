import { Link } from "react-router-dom";

const Hero = () => {
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
                <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-2">
                    <Link to="/" className="text-center cursor-pointer mr-5 rounded-full py-2 px-6 text-white border-transparent bg-teal-600">View All</Link>
                </div>
            </div>
        </section>
    </>
  )
}
export default Hero