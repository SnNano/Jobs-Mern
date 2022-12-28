const Pagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {
    const pageNumbers = [];
    for(let i=1; i<= Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i);
    }
  return (
    <>
        <div className="flex justify-center mt-5">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                {
                    pageNumbers.map((number)=>{
                        return <li key={number} className={`page-item`}>
                                <button onClick={()=>paginate(number)} className={`${currentPage === number ? "bg-teal-600 border-0 text-white" : 'bg-transparent text-teal-500'} mr-5 relative block py-1.5 px-3 outline-none transition-all duration-300 rounded-full hover:text-white hover:bg-teal-600 shadow-md focus:shadow-md`}
                                >{number}</button>
                            </li>
                    })
                }
                </ul>
            </nav>
        </div>
    </>
  )
}
export default Pagination