import React from 'react';
import dayjs from 'dayjs';

interface IColumn<T> {
    label: string;
    key: keyof T;
    render?: (item: T) => React.ReactNode;
}

interface IDataTableProps<T> {
    columns: IColumn<T>[];
    data: T[];
    dateFormat?: string;
}

const DataTable = <T extends object>({
    columns,
    data,
    dateFormat = "DD/MM/YYYY"
}: IDataTableProps<T>) => {
    return (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-white">
                <thead className="text-yellow-500 bg-white">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="px-6 py-3 text-left font-semibold">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-200 hover:text-gray-800">
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="px-6 py-4">
                                    {column.render 
                                        ? column.render(item)
                                        : column.key.toString().includes('date')
                                        ? dayjs(item[column.key] as string).format(dateFormat)
                                        : String(item[column.key])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;