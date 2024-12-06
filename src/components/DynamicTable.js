const DynamicTable = ({ json_data }) => {
  if (!json_data || json_data.length === 0) {
    return <p>No data available.</p>;
  }

  const columns = Object.keys(json_data[0] || {});
  const handleEdit = (id) => {
    // will send a function thing here or redirect to a different page
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {json_data.map((row) => (
          <tr key={row.id}>
            {columns.map((col, index) => (
              <td key={index}>{row[col]}</td>
            ))}
            <td>
              <button onClick={() => handleEdit(row.id)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
