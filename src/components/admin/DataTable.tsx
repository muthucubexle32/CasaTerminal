// src/components/admin/DataTable.tsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: any) => React.ReactNode;
  mobile?: boolean;
  hideMobile?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
}

function DataTable<T extends Record<string, any>>({ 
  data, 
  columns, 
  itemsPerPage = 5 
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* Mobile View */}
      <div className="block sm:hidden">
        {paginatedData.map((item, index) => (
          <div key={index} className="p-4 border-b border-gray-100 last:border-0">
            {columns
              .filter(col => col.mobile !== false)
              .map((column) => (
                <div key={String(column.key)} className="flex justify-between py-1">
                  <span className="text-xs text-gray-500">{column.header}</span>
                  <span className="text-xs font-medium text-gray-900">
                    {column.render 
                      ? column.render(item[column.key])
                      : item[column.key]}
                  </span>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.hideMobile ? 'hidden lg:table-cell' : ''
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      column.hideMobile ? 'hidden lg:table-cell' : ''
                    }`}
                  >
                    {column.render 
                      ? column.render(item[column.key])
                      : <span className="text-gray-900">{item[column.key]}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;