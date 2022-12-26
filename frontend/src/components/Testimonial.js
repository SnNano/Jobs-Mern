import man from "../images/man.jpg";


const Testimonial = () => {
  return (
    <>
        <section className="container mx-auto px-6">
                <div className="flex justify-center items-center h-screen flex-col">
                    <h3 className="text-gray-900 lg:text-5xl md:text-2xl text-md text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae nemo dignissimos explicabo nulla vero mollitia!</h3>
                    <img src={man} alt="developer" className="rounded-full w-40 mt-10" />
                    <h4 className="font-semibold text-xl text-teal-500">John Smith</h4>
                    <p className="text-md font-mono">Web Developer, USA</p>
                </div>
        </section>
    </>
  )
}
export default Testimonial