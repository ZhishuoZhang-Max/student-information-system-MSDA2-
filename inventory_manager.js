// inventory_manager.js
// Feature: Add and manage students

let students = [];

function addStudent(id, name) {
    // Prevent duplicate ID
    if (students.some(student => student.id === id)) {
        alert("Student ID already exists!");
        return;
    }
    students.push({ id: id, name: name });
    console.log(`Student added: ${id} - ${name}`);
}

function listStudents() {
    console.log("Student List:");
    students.forEach(student => {
        console.log(`${student.id} - ${student.name}`);
    });
}

// Example usage
addStudent(1001, "Alice");
addStudent(1002, "Bob");
listStudents();
