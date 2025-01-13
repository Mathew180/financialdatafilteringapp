import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// Change the API URL to your backend
const API_URL = 'https://fianancialdatafilterapi.onrender.com/get-financial-data/';

interface DataRow {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

const App = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: ''
  });

  // Sorting state
  const [sorting, setSorting] = useState({
    column: 'date', // default sort by date
    direction: 'asc' as 'asc' | 'desc',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        const responseData = response.data?.data || []; // Ensure data is accessed properly
        setData(responseData); // Set the filtered data
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  // Handle filtering
  const filterData = (data: DataRow[]) => {
    return data.filter(row => {
      const date = row.date.split('-')[0];
      const startDate = filters.startDate ? parseInt(filters.startDate) : 0;
      const endDate = filters.endDate ? parseInt(filters.endDate) : new Date().getFullYear();
      const minRevenue = filters.minRevenue ? parseFloat(filters.minRevenue) : 0;
      const maxRevenue = filters.maxRevenue ? parseFloat(filters.maxRevenue) : Infinity;
      const minNetIncome = filters.minNetIncome ? parseFloat(filters.minNetIncome) : 0;
      const maxNetIncome = filters.maxNetIncome ? parseFloat(filters.maxNetIncome) : Infinity;

      return (
        (parseInt(date) >= startDate && parseInt(date) <= endDate) &&
        (row.revenue >= minRevenue && row.revenue <= maxRevenue) &&
        (row.netIncome >= minNetIncome && row.netIncome <= maxNetIncome)
      );
    });
  };

  // Sorting function
  const sortData = (data: DataRow[]) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const aValue = a[sorting.column as keyof DataRow];
      const bValue = b[sorting.column as keyof DataRow];

      if (sorting.direction === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
    return sortedData;
  };

  // Handle filter change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Handle sorting
  const handleSort = (column: string) => {
    setSorting(prevSorting => ({
      column,
      direction: prevSorting.column === column && prevSorting.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Function to format numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  // Get the filtered and sorted data
  const filteredData = filterData(data);
  const sortedData = sortData(filteredData);

  // Pagination: Slice data based on current page and rows per page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  // Pagination buttons
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Financial Data Filtering</h1>

      {/* Input Filters */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="flex flex-col">
          <label>Date Range:</label>
          <div className="flex flex-col sm:flex-row sm:space-x-2">
            <input
              type="number"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              placeholder="Start Year"
              className="p-2 border mb-2 sm:mb-0 w-full sm:w-auto"
            />
            <input
              type="number"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              placeholder="End Year"
              className="p-2 border w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label>Revenue Range:</label>
          <div className="flex flex-col sm:flex-row sm:space-x-2">
            <input
              type="number"
              name="minRevenue"
              value={filters.minRevenue}
              onChange={handleChange}
              placeholder="Min Revenue"
              className="p-2 border mb-2 sm:mb-0 w-full sm:w-auto"
            />
            <input
              type="number"
              name="maxRevenue"
              value={filters.maxRevenue}
              onChange={handleChange}
              placeholder="Max Revenue"
              className="p-2 border w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label>Net Income Range:</label>
          <div className="flex flex-col sm:flex-row sm:space-x-2">
            <input
              type="number"
              name="minNetIncome"
              value={filters.minNetIncome}
              onChange={handleChange}
              placeholder="Min Net Income"
              className="p-2 border mb-2 sm:mb-0 w-full sm:w-auto"
            />
            <input
              type="number"
              name="maxNetIncome"
              value={filters.maxNetIncome}
              onChange={handleChange}
              placeholder="Max Net Income"
              className="p-2 border w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      {/* Table to display filtered and sorted data */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th
                onClick={() => handleSort('date')}
                className="border border-gray-300 px-4 py-2 cursor-pointer"
              >
                Date {sorting.column === 'date' && (sorting.direction === 'asc' ? '🔼' : '🔽')}
              </th>
              <th
                onClick={() => handleSort('revenue')}
                className="border border-gray-300 px-4 py-2 cursor-pointer"
              >
                Revenue {sorting.column === 'revenue' && (sorting.direction === 'asc' ? '🔼' : '🔽')}
              </th>
              <th
                onClick={() => handleSort('netIncome')}
                className="border border-gray-300 px-4 py-2 cursor-pointer"
              >
                Net Income {sorting.column === 'netIncome' && (sorting.direction === 'asc' ? '🔼' : '🔽')}
              </th>
              <th className="border border-gray-300 px-4 py-2">Gross Profit</th>
              <th className="border border-gray-300 px-4 py-2">EPS</th>
              <th className="border border-gray-300 px-4 py-2">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                <td className="border border-gray-300 px-4 py-2">{formatNumber(row.revenue)}</td>
                <td className="border border-gray-300 px-4 py-2">{formatNumber(row.netIncome)}</td>
                <td className="border border-gray-300 px-4 py-2">{formatNumber(row.grossProfit)}</td>
                <td className="border border-gray-300 px-4 py-2">{row.eps}</td>
                <td className="border border-gray-300 px-4 py-2">{formatNumber(row.operatingIncome)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
