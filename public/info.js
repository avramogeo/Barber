document.addEventListener('DOMContentLoaded', function() {
    // Generate time slots
    const startHour = 9;
    const endHour = 17;
    const timeSlots = [];
    for (let hour = startHour; hour < endHour; hour++) {
        timeSlots.push(`${String(hour).padStart(2, '0')}:00-${String(hour).padStart(2, '0')}:30`);
        timeSlots.push(`${String(hour).padStart(2, '0')}:30-${String(hour + 1).padStart(2, '0')}:00`);
    }

    const timeSlotsContainer = document.getElementById('timeSlots');
    timeSlots.forEach(slot => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = slot;
        checkbox.name = 'timeSlots';
        checkbox.value = slot;
        
        const label = document.createElement('label');
        label.htmlFor = slot;
        label.textContent = slot;

        timeSlotsContainer.appendChild(checkbox);
        timeSlotsContainer.appendChild(label);
    });
});

document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const storeData = {
        storeName: document.getElementById('storeName').value,
        storeAddress: document.getElementById('storeAddress').value,
        storePhone: document.getElementById('storePhone').value,
        storeHours: document.getElementById('storeHours').value,
    };

    fetch('/updateStore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(storeData)
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
});

document.getElementById('addHairdresserForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const timeSlots = Array.from(document.querySelectorAll('input[name="timeSlots"]:checked')).map(el => el.value);
    const hairdresserData = {
        hairdresserName: document.getElementById('hairdresserName').value,
        date: document.getElementById('date').value,
        timeSlots: timeSlots
    };

    fetch('/addHairdresser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hairdresserData)
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
});
