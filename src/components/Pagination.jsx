import React from 'react'

const Pagination = ({ totalCards, cardPerPage, onPageChange, currentPage }) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalCards / cardPerPage); i++) {
        pages.push(i)
    }
    return (
        <div className='flex w-full items-center justify-center  gap-[20px] absolute bottom-0'>
            {pages.map((page, index) => {
                return (
                    <button key={index} className={`flex justify-center items-center border-2 border-[black] p-4 w-[35px] h-[40px] md:w-[45px] rounded-lg text-[#000000] bg-[#ffffff] hover:opacity-70 hover:cursor-pointer active:text-[red] ${page === currentPage ? 'text-[#b7b0b0] bg-[#0f144b] border-2 border-[#000000] scale-[1.05]' : ''}`} onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                )
            })}
        </div>
    )
}

export default Pagination