document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('barber-details-form');

    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault(); // Prevent the form from submitting traditionally
            const formData = new FormData(form);

            // Log formData for debugging (or send to a server)
            console.log('Barbershop Name:', formData.get('name'));
            console.log('Address:', formData.get('address'));
            console.log('Hours:', formData.get('hours'));
            console.log('Photos:', formData.get('photos'));
            console.log('Hairdressers:', formData.get('hairdressers'));

            // Assuming an endpoint '/add-barbershop' that you would have set up on your server:
            // fetch('/add-barbershop', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => alert('Barbershop added successfully!'))
            // .catch(error => console.error('Error:', error));

            alert('Barbershop details submitted!'); // Placeholder feedback
        });
    }
});
