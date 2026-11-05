export function renderCards(arr) {
    const cardStr = arr.map(obj => `
        <div class='card'>
            <img src="${obj.image}">
            <h2>${obj.category}</h2>
            <p>${obj.message}</p>
        </div>
        `).join('')
        document.querySelector('.books').innerHTML = cardStr


}
