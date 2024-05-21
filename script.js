document.addEventListener('DOMContentLoaded', () => {
    const barbershops = [
        { id: 1, name: "Skalpotas", address: "123 Main St, City A", description: "Kourema... Mpoma!! (Kuriolektika + Metaforika)", availableTimes: ["10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 AM","12:30 AM", "2:00 PM"] },
        { id: 2, name: "Fotakos XD", address: "456 Elm St, City B", description: "Gria", availableTimes: ["9:00 AM", "12:00 PM", "4:00 PM"] },
        { id: 3, name: "Asasaki", address: "789 Maple St, City C", description: "Tu eres bonita.", availableTimes: ["11:00 AM", "1:00 PM", "3:00 PM"] }
    ];

    const barbershopList = document.getElementById('barbershop-list');
    const urlParams = new URLSearchParams(window.location.search);
    const barbershopId = urlParams.get('barbershop_id');
    const barbershop = barbershops.find(shop => shop.id == barbershopId);

    if (barbershopList) {
        barbershops.forEach(barbershop => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="barbershop-detail.html?barbershop_id=${barbershop.id}"><strong>${barbershop.name}</strong></a><br>${barbershop.address}`;
            barbershopList.appendChild(li);
        });
    }

    if (barbershopId && barbershop) {
        document.getElementById('barbershop-name').textContent = barbershop.name;
        document.getElementById('barbershop-address').textContent = `Address: ${barbershop.address}`;
        document.getElementById('barbershop-description').textContent = `Description: ${barbershop.description}`;

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

                    // Populate available hours for the selected day
                    const selectedDate = day.dataset.date;
                    const availableHoursDiv = document.getElementById('available-hours');
                    if (availableHoursDiv) {
                        availableHoursDiv.innerHTML = '';
                        barbershop.availableTimes.forEach(time => {
                            const bubble = document.createElement('div');
                            bubble.classList.add('hour-bubble');
                            bubble.textContent = time;
                            bubble.addEventListener('click', () => {
                                document.querySelectorAll('.hour-bubble').forEach(bubble => {
                                    bubble.classList.remove('selected');
                                });
                                bubble.classList.add('selected');
                                document.getElementById('selected-time').value = time;
                            });
                            availableHoursDiv.appendChild(bubble);
                        });
                    }
                });
            });
        }
    }

    const bookingForm = document.getElementById('booking-form');
    const selectedDateInput = document.getElementById('selected-date');
    const selectedTimeInput = document.getElementById('selected-time');

    if (bookingForm) {
        const appointmentDateInput = document.getElementById('appointment-date');
        appointmentDateInput.addEventListener('change', function() {
            const selectedDate = appointmentDateInput.value;
            selectedDateInput.value = selectedDate;
        });

        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(bookingForm);
            const bookingDetails = {
                barbershopId: barbershopId,
                date: selectedDateInput.value,
                time: selectedTimeInput.value,
                name: formData.get('name'),
                surname: formData.get('surname'),
                phone: formData.get('phone'),
                email: formData.get('email')
            };

            localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
            window.location.href = 'verification.html';
        });
    }

    const verificationForm = document.getElementById('verification-form');
    if (verificationForm) {
        verificationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // In a real application, verification code validation would occur here
            window.location.href = 'confirmation.html';
        });
    }

    const appointmentDetailsDiv = document.getElementById('appointment-details');
    if (appointmentDetailsDiv) {
        const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
        if (bookingDetails) {
            appointmentDetailsDiv.innerHTML = `
                <p>Barbershop: ${bookingDetails.barbershopId}</p>
                <p>Date: ${bookingDetails.date}</p>
                <p>Time: ${bookingDetails.time}</p>
                <p>Name: ${bookingDetails.name}</p>
                <p>Surname: ${bookingDetails.surname}</p>
                <p>Phone: ${bookingDetails.phone}</p>
                <p>Email: ${bookingDetails.email}</p>
                `;
            document.getElementById('modify-link').href = `barbershop-detail.html?barbershop_id=${bookingDetails.barbershopId}`;
        }
    }
});
