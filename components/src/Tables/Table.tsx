import React from 'react'

interface TableProps {
  columns: string[]
  data: any[][]
  className?: string
}

export default function Table({ columns, data, className }: TableProps) {
  return (
    <div className={`relative overflow-x-auto ${className}`}>
      <table className="w-full text-left text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-50 ">
          <tr>
            {columns.map((column) => (
              <th scope="col" className="px-6 py-3">
                {column.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-black">
          {data.map((row) => (
            <tr className="bg-white border-b">
              {row.map((item) => (
                <td className="px-6 py-4">{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
