import { useState, useCallback } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const usePagination = ({ gridApi, rowsPerPageDefault = 25 }) => {
  const [page, setPage] = useState(0);
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

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default usePagination;
