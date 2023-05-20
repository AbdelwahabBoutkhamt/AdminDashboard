import React, { useState } from 'react';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    id: '',
    name: '',
    modules: [],
    programs: []
  });
  const [newModule, setNewModule] = useState('');
  const [newProgram, setNewProgram] = useState('');

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    setNewDepartment({
      id: '',
      name: '',
      modules: [],
      programs: []
    });
    setNewModule('');
    setNewProgram('');
  };

  const handleDepartmentChange = (event) => {
    const { name, value } = event.target;
    setNewDepartment((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const addDepartment = (event) => {
    event.preventDefault();
    if (newDepartment.name.trim() !== '') {
      const department = {
        ...newDepartment,
        modules: [...newDepartment.modules, newModule],
        programs: [...newDepartment.programs, newProgram]
      };
      setDepartments([...departments, department]);
      toggleForm();
    }
  };

  const handleModuleChange = (event) => {
    setNewModule(event.target.value);
  };

  const handleProgramChange = (event) => {
    setNewProgram(event.target.value);
  };

  return (
    <div>
      <h1>Department Management</h1>

      {!isFormVisible && (
        <button onClick={toggleForm}>Add Department</button>
      )}

      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={addDepartment}>
              <h2>Add Department</h2>
              <div>
                <label>ID:</label>
                <input
                  type="text"
                  name="id"
                  value={newDepartment.id}
                  onChange={handleDepartmentChange}
                  required
                />
              </div>

              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newDepartment.name}
                  onChange={handleDepartmentChange}
                  required
                />
              </div>

              <div>
                <label>Modules:</label>
                <input
                  type="text"
                  value={newModule}
                  onChange={handleModuleChange}
                  required
                />
              </div>

              <div>
                <label>Programs:</label>
                <input
                  type="text"
                  value={newProgram}
                  onChange={handleProgramChange}
                  required
                />
              </div>

              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button onClick={toggleForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="department-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Modules</th>
            <th>Programs</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={index}>
              <td>{department.id}</td>
              <td>{department.name}</td>
              <td>
                {department.modules.map((module, index) => (
                  <div key={index}>{module}</div>
                ))}
              </td>
              <td>
                {department.programs.map((program, index) => (
                  <div key={index}>{program}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentManagement;
