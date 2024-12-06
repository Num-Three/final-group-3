import { useNavigate } from 'react-router';
const DynamicTable = ({ json_data, tableName, handleDelete, canEdit }) => {
  const navigate = useNavigate();

  // Check if json_data is an array
  if (!Array.isArray(json_data)) {
    return <p>No data available for {tableName}.</p>;
  }

  // Handle edit (can be implemented further if needed)
  const handleEdit = (id) => {
    navigate("/admin/edit-form", { state: { id: id } });
  };

  if (json_data.length === 0) {
    return <p>No data available for {tableName}.</p>;
  }

  const columns = Object.keys(json_data[0] || {});
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
          ))}
          {canEdit && (
            <th>Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {json_data.map((row) => (
          <tr key={row.id}>
            {columns.map((col, index) => (
              <td key={index}>{row[col]}</td>
            ))}
            {canEdit && (
              <td>
                <button onClick={() => handleEdit(row.id)}>Edit</button>
                <button onClick={() => handleDelete(row.id, tableName)}>Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
