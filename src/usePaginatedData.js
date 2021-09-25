import { useCallback, useEffect, useState } from "react";
import json from "./MOCK_DATA_1.json";
import usePaginationActions from "./lib/usePaginationActions";

const usePaginatedData = ({ rowsPerPageDefault }) => {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    Promise.resolve(json).then(setRowData);
  }, []);

  const handleGridReady = useCallback(
    ({ api }) => {
      setGridApi(api);
      api.sizeColumnsToFit();
    },
    [setGridApi]
  );
  return {
    gridApi,
    rowData,
    handleGridReady,
    ...usePaginationActions({ gridApi, rowsPerPageDefault }),
  };
};
export default usePaginatedData;
