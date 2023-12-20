document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error('Nätverksresponsen var inte okej');
        }
        const users = await response.json();
        console.log(users);

        // Skapa en container för grid layout
        const userGrid = document.createElement('div');
        userGrid.className = 'user-grid';

        // Loopa igenom varje user och skapa en användarkort
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = `user-card ${user.color}`;

            // Använd en templatesträng för att infoga användardata i användarkortet
            userCard.innerHTML = `
                <h2>${user.firstName} ${user.lastName}</h2>
                <p>Username: ${user.username}</p>
                <p>Favorite Color: ${user.color}</p>
            `;

            // Lägg till användarkortet i grid-containern
            userGrid.appendChild(userCard);
        });

        // Lägg till grid-containern i DOM-trädet
        document.getElementById('user-list').appendChild(userGrid);
    } catch (error) {
        console.error('Det uppstod ett fel vid hämtning av användare:', error);
    }
});