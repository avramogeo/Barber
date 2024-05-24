document.addEventListener('DOMContentLoaded', () => {
    const barbershops = [
        { 
            id: 1, 
            name: "Orestis BarberShop", 
            address: "Georgiou Papandreou 85", 
            phone: "123-456-7890", 
            operatingHours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 3:00 PM, Sun: Closed", 
            photos: ["PHOTOS/orestis_1.png", "PHOTOS/orestis_2.png", "PHOTOS/orestis_3.png", "PHOTOS/orestis_4.png", "PHOTOS/orestis_5.png", "PHOTOS/orestis_6.png"],
            hairdressers: [
                { name: "Orestis", availableTimes: ["10:00 AM", "11:00 AM", "1:00 PM"] },
                { name: "Purosvestis", availableTimes: ["10:30 AM", "12:00 PM", "2:00 PM"] }
            ]
        },
        { 
            id: 2, 
            name: "Fotakos XD", 
            address: "456 Elm St, City B", 
            phone: "987-654-3210", 
            operatingHours: "Mon-Sat: 8:00 AM - 8:00 PM, Sun: 10:00 AM - 5:00 PM", 
            photos: ["PHOTOS/fotakos_1.png", "PHOTOS/fotakos_2.png", "PHOTOS/fotakos_3.png", "PHOTOS/fotakos_4.png", "PHOTOS/fotakos_5.png", "PHOTOS/fotakos_6.png"],
            hairdressers: [
                { name: "Alice Brown", availableTimes: ["9:00 AM", "12:00 PM", "4:00 PM"] },
                { name: "Bob White", availableTimes: ["11:00 AM", "1:00 PM", "3:00 PM"] }
            ]
        },
        { 
            id: 3, 
            name: "Asasaki", 
            address: "789 Maple St, City C", 
            phone: "555-123-4567", 
            operatingHours: "Mon-Thu: 10:00 AM - 7:00 PM, Fri-Sat: 10:00 AM - 9:00 PM, Sun: 11:00 AM - 5:00 PM", 
            photos: ["PHOTOS/asasaki_1.png", "PHOTOS/asasaki_2.png", "PHOTOS/asasaki_3.png", "PHOTOS/asasaki_4.png", "PHOTOS/asasaki_5.png", "PHOTOS/asasaki_6.png"],
            hairdressers: [
                { name: "Charlie Green", availableTimes: ["11:00 AM", "1:00 PM", "3:00 PM"] },
                { name: "Diana Black", availableTimes: ["10:00 AM", "2:00 PM", "5:00 PM"] }
            ]
        }
    ];

    const barbershopList = document.getElementById('barbershop-list');
    const urlParams = new URLSearchParams(window.location.search);
    const barbershopId = urlParams.get('barbershop_id');
    const barbershop = barbershops.find(shop => shop.id == barbershopId);

    if (barbershopList) {
        barbershops.forEach(barbershop => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="[2]DETAILS.html?barbershop_id=${barbershop.id}"><strong>${barbershop.name}</strong></a><br>${barbershop.address}`;
            barbershopList.appendChild(li);
        });
    }

    if (barbershopId && barbershop) {
        document.getElementById('barbershop-name').textContent = barbershop.name;
        document.getElementById('barbershop-address').textContent = `Address: ${barbershop.address}`;
        document.getElementById('barbershop-phone').textContent = `Phone: ${barbershop.phone}`;
        document.getElementById('barbershop-operating-hours').textContent = `Operating Hours: ${barbershop.operatingHours}`;

        const imageGallery = document.querySelector('.image-gallery');
        if (imageGallery) {
            barbershop.photos.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo;
                img.alt = "Barbershop Image";
                imageGallery.appendChild(img);
            });
        }

        const calendarDiv = document.getElementById('calendar');
        if (calendarDiv) {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const today = new Date();
            const currentYear = today.getFullYear();
            const currentMonth = today.getMonth();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

            let calendarHTML = '<table>';
            calendarHTML += '<tr>';
            for (let i = 0; i < days.length; i++) {
                calendarHTML += `<th>${days[i]}</th>`;
            }
            calendarHTML += '</tr>';

            let dayCount = 1;
            for (let i = 0; i < 6; i++) {
                calendarHTML += '<tr>';
                for (let j = 0; j < 7; j++) {
                    if ((i === 0 && j < today.getDay()) || dayCount > daysInMonth) {
                        calendarHTML += '<td></td>';
                    } else {
                        const cellDate = new Date(currentYear, currentMonth, dayCount);
                        const cellDateString = cellDate.toISOString().split('T')[0];
                        calendarHTML += `<td class="calendar-day" data-date="${cellDateString}">${dayCount}</td>`;
                        dayCount++;
                    }
                }
                calendarHTML += '</tr>';
                if (dayCount > daysInMonth) {
                    break;
                }
            }
            calendarHTML += '</table>';
            calendarDiv.innerHTML = calendarHTML;

            // Add event listener for clicking on a calendar day
            const calendarDays = document.querySelectorAll('.calendar-day');
            calendarDays.forEach(day => {
                day.addEventListener('click', () => {
                    // Reset background color for all days
                    calendarDays.forEach(day => {
                        day.style.backgroundColor = '';
                    });

                    // Highlight selected day
                    day.style.backgroundColor = '#4CAF50';

                    // Populate available hairdressers for the selected day
                    const selectedDate = day.dataset.date;
                    const availableHairdressersDiv = document.getElementById('available-hairdressers');
                    const availableHoursDiv = document.getElementById('available-hours');
                    if (availableHairdressersDiv) {
                        availableHairdressersDiv.innerHTML = '';
                        barbershop.hairdressers.forEach(hairdresser => {
                            const hairdresserBubble = document.createElement('button');
                            hairdresserBubble.classList.add('hairdresser-btn');
                            hairdresserBubble.textContent = hairdresser.name;
                            hairdresserBubble.addEventListener('click', () => {
                                // Reset background color for all hairdresser buttons
                                const hairdresserButtons = document.querySelectorAll('.hairdresser-btn');
                                hairdresserButtons.forEach(btn => {
                                    btn.style.backgroundColor = '';
                                });
                                // Highlight selected hairdresser button
                                hairdresserBubble.style.backgroundColor = '#4CAF50';

                                // Populate available hours for the selected hairdresser and date
                                const selectedHairdresser = hairdresser.name;
                                const selectedHairdresserObj = barbershop.hairdressers.find(h => h.name === selectedHairdresser);
                                const availableTimes = selectedHairdresserObj.availableTimes;
                                availableHoursDiv.innerHTML = '';
                                availableTimes.forEach(time => {
                                    const hourBubble = document.createElement('button');
                                    hourBubble.classList.add('hour-btn');
                                    hourBubble.textContent = time;
                                    hourBubble.addEventListener('click', () => {
                                        // Reset background color for all hour buttons
                                        const hourButtons = document.querySelectorAll('.hour-btn');
                                        hourButtons.forEach(btn => {
                                            btn.style.backgroundColor = '';
                                        });
                                        // Highlight selected hour button
                                        hourBubble.style.backgroundColor = '#4CAF50';

                                        // Set selected date, time, and hairdresser in hidden form fields
                                        document.getElementById('selected-date').value = selectedDate;
                                        document.getElementById('selected-time').value = time;
                                        document.getElementById('selected-hairdresser').value = selectedHairdresser;
                                    });
                                    availableHoursDiv.appendChild(hourBubble);
                                });
                            });
                            availableHairdressersDiv.appendChild(hairdresserBubble);
                        });
                    }
                });
            });
        }
    }

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Here you can add code to handle form submission, like sending data to a server
            alert('Booking submitted successfully!');
        });
    }
});

