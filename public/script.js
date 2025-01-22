// Fetch and display users
function fetchUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const usersDiv = document.getElementById('users');
            usersDiv.innerHTML = '<h2>Users:</h2>';
            users.forEach(user => {
                usersDiv.innerHTML += `<p>${user.name} (${user.email}) - ${user.role}</p>`;
            });
        });
}

// Add a new user
document.getElementById('userForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role }),
    })
        .then(response => response.json())
        .then(() => {
            fetchUsers(); // Refresh the user list
        });
});

// Initial fetch
fetchUsers();