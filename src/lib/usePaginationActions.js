import { useState, useCallback } from "react";

const usePagination = ({ gridApi, rowsPerPageDefault = 25 }) => {
  const [page, setPage] = useState(0);
  const [filteredCount, setFilteredCount] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDefault);

  const handleChangePage = useCallback(
    (_, newPage) => {
      gridApi.paginationGoToPage(newPage);
      setPage(newPage);
    },
    [gridApi]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const rows = parseInt(event.target.value, 10);
      setRowsPerPage(rows);
      gridApi.paginationSetPageSize(rows);
      gridApi.sizeColumnsToFit();
      setPage(0);
    },
    [gridApi]
  );

  const onFilterChanged = useCallback(() => {
    setFilteredCount(gridApi.getDisplayedRowCount());
  }, [gridApi]);

  return {
    filteredCount,
    page,
    rowsPerPage,
    onFilterChanged,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default usePagination;
