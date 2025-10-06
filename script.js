document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("student-form");
  const studentTableBody = document.getElementById("student-table-body");

  // Get existing students from localStorage
  let students = JSON.parse(localStorage.getItem("students")) || [];

  // Save students to localStorage
  const saveStudents = () => {
    localStorage.setItem("students", JSON.stringify(students));
  };

  // Render the students table
  const renderTable = () => {
    studentTableBody.innerHTML = "";
    students.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.studentId}</td>
        <td>${student.age}</td>
        <td>${student.major}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      `;
      studentTableBody.appendChild(row);
    });
  };

  // Edit student
  window.editStudent = (index) => {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("age").value = student.age;
    document.getElementById("major").value = student.major;

    // Remove old data
    students.splice(index, 1);
    saveStudents();
    renderTable();
  };

  // Delete student
  window.deleteStudent = (index) => {
    students.splice(index, 1);
    saveStudents();
    renderTable();
  };

  // Handle form submission
  studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const age = document.getElementById("age").value.trim();
    const major = document.getElementById("major").value.trim();

    if (!name || !studentId || !age || !major) {
      alert("Please fill in all fields!");
      return;
    }

    // Prevent duplicate student ID
    const duplicate = students.find(s => s.studentId === studentId);
    if (duplicate) {
      alert("This Student ID already exists!");
      return;
    }

    students.push({ name, studentId, age, major });
    saveStudents();
    renderTable();
    studentForm.reset();
  });

  // Initial render
  renderTable();
});
