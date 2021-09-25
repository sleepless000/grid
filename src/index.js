import { AgGridColumn, AgGridReact } from "ag-grid-react";
import TablePagination from "@mui/material/TablePagination";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import usePaginatedData from "./usePaginatedData";
import PaginationActions from "./lib/paginationActions";
import "./index.css";

const Application = () => {
  const {
    page,
    rowData,
    rowsPerPage,
    filteredCount,
    onFilterChanged,
    handleGridReady,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginatedData({ rowsPerPageDefault: 50 });

  return (
    <main id="application">
      <header id="application--header">
        <h1>Hogwarts Software</h1>
        <h2>Student Registry</h2>
      </header>
      <section id="application--grid" className="ag-theme-alpine">
        <AgGridReact
          defaultColDef={{
            editable: true,
            sortable: true,
            resizable: true,
            filter: true,
          }}
          rowData={rowData}
          onGridReady={handleGridReady}
          pagination
          paginationPageSize={rowsPerPage}
          suppressPaginationPanel={true}
          suppressScrollOnNewData={true}
          onFilterChanged={onFilterChanged}
        >
          <AgGridColumn field="firstName" headerName="First Name" />
          <AgGridColumn field="lastName" headerName="Last Name" />
          <AgGridColumn field="house" headerName="House" />
          <AgGridColumn field="wandCore" headerName="Wand Core" />
          <AgGridColumn field="wandWood" headerName="Wand Wood" />
        </AgGridReact>
        <TablePagination
          sx={{
            width: "100vw",
            borderBottom: "unset",
          }}
          rowsPerPageOptions={[5, 10, 25, 50, 100, { label: "All", value: -1 }]}
          count={filteredCount ?? rowData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={PaginationActions}
        />
      </section>
    </main>
  );
};

export default Application;
