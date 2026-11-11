export function renderCards(arr) {
  const cardStr = arr.map(obj => {
    let tartomany;
    if (obj.min === 0) {
      tartomany = 'BMI: <' + obj.max;
    } else if (obj.max >= 100) {
      tartomany = 'BMI: ' + obj.min + '+';
    } else {
      tartomany = 'BMI: ' + obj.min + '–' + obj.max;
    }
    tartomany = tartomany.replace('.', ',');

    return `
      <div class="kartya" data-id="${obj.id}">
        <img src="src/${obj.image}">
        <p class="tartomany">${tartomany}</p>
        <h3>${obj.category}</h3>
        <p class="uzenet">${obj.message}</p>
      </div>
    `;
  }).join('');

  document.querySelector('.kartyak').innerHTML = cardStr;
}
