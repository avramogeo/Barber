document.addEventListener('DOMContentLoaded', () => {
    const barbershops = [
        { 
            id: 1, 
            name: "Orestis BarberShop", 
            address: "Georgiou Papandreou 85", 
            phone: "123-456-7890", 
            operatingHours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 3:00 PM, Sun: Closed"
        },
        { 
            id: 2, 
            name: "Fotakos XD", 
            address: "456 Elm St, City B", 
            phone: "987-654-3210", 
            operatingHours: "Mon-Sat: 8:00 AM - 8:00 PM, Sun: 10:00 AM - 5:00 PM"
        },
        { 
            id: 3, 
            name: "Asasaki", 
            address: "789 Maple St, City C", 
            phone: "555-123-4567", 
            operatingHours: "Mon-Thu: 10:00 AM - 7:00 PM, Fri-Sat: 10:00 AM - 9:00 PM, Sun: 11:00 AM - 5:00 PM"
        }
    ];

    const barbershopList = document.getElementById('barbershop-list');

    if (barbershopList) {
        barbershops.forEach(barbershop => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="[2]DETAILS.html?barbershop_id=${barbershop.id}"><strong>${barbershop.name}</strong></a><br>${barbershop.address}`;
            barbershopList.appendChild(li);
        });
    }
});
