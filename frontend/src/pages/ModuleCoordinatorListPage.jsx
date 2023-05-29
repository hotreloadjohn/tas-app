import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const defaultData = [
  {
    moduleCode: "EM0301",
    moduleAbbrev: "IS1",
    moduleName: "Independent Study 1",
    staffId: "s26076",
    staffName: "NGIAM-LAU BEE HUA",
  },
  {
    moduleCode: "EM0302",
    moduleAbbrev: "IS2",
    moduleName: "Independent Study 2",
    staffId: "s26076",
    staffName: "NGIAM-LAU BEE HUA",
  },
  {
    moduleCode: "EM0303",
    moduleAbbrev: "DSAL",
    moduleName: "Data Structures and Algorithms	",
    staffId: "s38111",
    staffName: "TAN HU-SHIEN",
  },
];

const columnHelper = createColumnHelper();

const ModuleCoordinatorListPage = () => {
  const [data, setData] = useState(() => [...defaultData]);
  const [sorting, setSorting] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleEdit = (row) => {
    console.log(row);
    setRowData(row);
    setShowModal(true);
  };
  const columns = [
    columnHelper.accessor((row) => row.moduleCode, {
      id: "moduleCode",
      cell: (info) => info.getValue(),
      header: () => <span className="text-base">Module Code</span>,
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.moduleAbbrev, {
      id: "moduleAbbrev",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span className="text-base">Module Abbrev</span>,
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.moduleName, {
      id: "moduleName",
      cell: (info) => info.getValue(),
      header: () => <span className="text-base">Module Name</span>,
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.staffId, {
      id: "staffId",
      cell: (info) => info.getValue(),
      header: () => <span className="text-base">Staff ID</span>,
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.staffName, {
      id: "staffName",
      cell: (info) => (
        <button
          onClick={() => handleEdit(info.row.original)}
          className="bg-green-400 p-2 rounded-md"
        >
          Edit
        </button>
      ),
      header: () => <span className="text-base">Staff Name</span>,
      // footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    state: {
      sorting,
    },

    onSortingChange: setSorting,
  });

  const headers = table.getFlatHeaders();

  return (
    <div className="p-4 overflow-x-auto">
      <table className="table table-auto my-4 w-full border-1 border-gray-400">
        <thead>
          <tr>
            {headers.map((header) => {
              //5. check if the column is sorted
              const direction = header.column.getIsSorted();

              //6. create a map to get the sorting indicator
              const arrow = {
                asc: "🔼",
                desc: "🔽",
              };

              //6. get the sorting indicator if header is sorted
              const sort_indicator = direction && arrow[direction];
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ position: "relative", width: header.getSize() }}
                >
                  {header.isPlaceholder ? null : (
                    //7. add an onClick handler using header.column.getToggleSortingHandler
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      // 8. add a class to render the sorting indicator properly
                      className="cursor-pointer flex gap-4"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* 9. render the sorting indicator */}
                      {direction && <span>{sort_indicator}</span>}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        checked={showModal}
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            onClick={() => setShowModal(false)}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            {JSON.stringify(rowData, null, 2)}
          </h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={rowData.moduleName}
          />

          <div className="modal-action" onClick={() => setShowModal(false)}>
            <label htmlFor="my-modal-3" className="btn bg-red-400">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCoordinatorListPage;
