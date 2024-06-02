document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulate checking credentials (You will need to implement server-side verification)
        if (username === "correctUsername" && password === "correctPassword") {
            // Redirect to the BARBER page if correct
            window.location.href = '[4]BARBER.html';
        } else {
            alert('Invalid credentials!');
        }
    });
});
