import * as React from "react";
 
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
 
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};
 
const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];
 
const columnHelper = createColumnHelper();
 
const columns = [
  columnHelper.accessor("p", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("p0", {
    header: () => "p0",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("lq", {
    header: () => <span>lq</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("ls", {
    header: "ls",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("wq", {
    header: "wq",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("ws", {
    header: "ws",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("e_cs", {
    header: "cs",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("e_cw", {
    header: "cw",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("e_ct", {
    header: "e_ct",
    footer: (info) => info.column.id,
  }),
];


 
export default function Table({ results }) {
  const [data, _setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  console.log({results});
 
  const table = useReactTable({
    data:results.result.data[0],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
 
  return (
    <div className="col-span-2 overflow-auto">
      <table className="border-collapse border border-gray-300">
        <thead className="bg-celeste">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 border-b border-gray-300">
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border-b border-gray-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-celeste">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 border-t border-gray-300">
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}