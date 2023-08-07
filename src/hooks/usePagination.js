import { useState } from "react"

const usePagination = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1)
  //   const [itemsPerPage, setItemssPerPage] = useState(5)

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = items?.slice(indexOfFirstItem, indexOfLastItem)

  return {
    currentPage,
    setCurrentPage,
    currentItems,
  }
}

export default usePagination
