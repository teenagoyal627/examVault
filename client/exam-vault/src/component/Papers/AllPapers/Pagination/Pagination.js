import './Pagination.css'

const Pagination = ({
    currentPage,
    setCurrentPage,
    numberOfPages,
    numbers,
    onPageChange
}) => {

    const presentPage = () => {
        if (currentPage !== 1) {
            onPageChange(currentPage - 1)
        }
    }

    const changePage = (id) => {
        setCurrentPage(id)
    }

    const nextPage = () => {
        if (currentPage < numberOfPages) {
            onPageChange(currentPage + 1)
        }
    }
    return (
        <nav className="pagination1">
        <ul className="pagination">
          <li className="page-item">
            <button style={{ color: 'black' }} className="page-link" onClick={presentPage}>Prev</button>
          </li>
          {[...Array(numberOfPages).keys()].map((_, i) => (
            <li
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
            >
              <button
                className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => onPageChange(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button style={{ color: 'black' }} className="page-link" onClick={nextPage}>Next</button>
          </li>
        </ul>
      </nav>

    )

}

export default Pagination