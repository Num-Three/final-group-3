const DynamicTable = ({ data }) => {
    if (!data || data.length === 0) {
      return <p>No data available.</p>;
    }
  
    // Extract column names from the first object in the data
    const columns = Object.keys(data[0]);
  
    return (
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {/* Render <th> elements dynamically based on the keys */}
            {columns.map((col, index) => (
              <th key={index}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render rows dynamically */}
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default DynamicTable;