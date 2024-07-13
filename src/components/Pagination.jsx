import React from 'react'

const Pagination = ({ totalCards, cardPerPage, setCurrentPage, currentPage }) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalCards / cardPerPage); i++) {
        pages.push(i)
    }
    return (
        <div className='flex w-full items-center justify-center  gap-[10px] absolute bottom-0'>
            {pages.map((page, index) => {
                return (
                    <button key={index} className={`flex justify-center border-2 p-2 w-[45px] rounded-lg text-[white] bg-[black] hover:opacity-70 hover:cursor-pointer active:text-[red] ${page === currentPage ? 'text-[#000000] bg-[#ffffff] border-2 border-[#000000] scale-[1.05]' : ''}`} onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                )
            })}
        </div>
    )
}

export default Pagination