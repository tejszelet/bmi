export function renderForm(container) {
  container.innerHTML = `
    <form class="panel">
      <h2>Számítsd ki a BMI-értékedet!</h2>
      <div class="fields">
        <label>Testsúly (kg)
          <input id="weight" type="number" placeholder="Például: 68">
        </label>
        <label>Magasság (cm)
          <input id="height" type="number" placeholder="Például: 172">
        </label>
      </div>
      <button type="submit">Számítás</button>
      <div id="result"></div>
    </form>`;

  const form = document.querySelector('form');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const suly = document.getElementById('weight').value;
    const magassagCm = document.getElementById('height').value;

    if (suly <= 0 || magassagCm <= 0) {
      result.innerHTML = '<div class="result">Adj meg érvényes számokat!</div>';
      return;
    }

    const magassagM = magassagCm / 100;
    const bmi = suly / (magassagM * magassagM);
    const bmiSzoveg = bmi.toFixed(1).replace('.', ',');


    let id, nev, uzenet,kartyaSzam;
    if (bmi < 18.5) {
      kartyaSzam=1;
      id = 'alultaplalt';
      nev = 'Alultáplált';
      uzenet = 'Fontos, hogy növeld a tápanyagbevitelt.';
    } else if (bmi < 25) {
      kartyaSzam=2;
      id = 'normal';
      nev = 'Normál testsúly';
      uzenet = 'Egészséges testtömeg.';
    } else if (bmi < 30) {
      kartyaSzam=3;
      id = 'tulsulyos';
      nev = 'Túlsúlyos';
      uzenet = 'Fontos odafigyelni az életmódra.';
    } else if (bmi < 35) {
      kartyaSzam=4;
      id = 'elhizas1';
      nev = 'Elhízás I. fokozat';
      uzenet = 'Javasolt életmódváltás.';
    } else if (bmi < 40) {
      kartyaSzam=5;
      id = 'elhizas2';
      nev = 'Elhízás II. fokozat';
      uzenet = 'Orvosi segítség ajánlott.';
    } else {
      kartyaSzam=6;
      id = 'elhizas3';
      nev = 'Elhízás III. fokozat';
      uzenet = 'Súlyos egészségügyi kockázat.';
    }

    result.innerHTML = `
      <div class="result">
        <strong>A BMI-értéked: ${bmiSzoveg}</strong>
        <span>${nev}</span>
        <small>${uzenet}</small>
      </div>`;

    const kartyak = document.querySelectorAll('.kartya');
    kartyak.forEach(k => k.classList.remove('kiemelt'));

    document.querySelector('[data-id="' + kartyaSzam + '"]').classList.add('kiemelt');

  });


}

import { bmiRules } from "./rules";

export function getCateg(height,weight){
     if (typeof height !== 'number' || typeof weight !== 'number') {
        throw new Error('A magasságnak és a súlynak számnak kell lennie!');
    }

    if (height <= 0 || weight <= 0) {
        throw new Error('A magasság és a súly csak pozitív szám lehet!');
    }
    const heightM=height/100
    const bmi = Math.round(weight / (heightM * heightM) * 10) / 10;
    const obj = bmiRules.find(rule => bmi >= rule.min && bmi < rule.max);
    return {...obj,bmi}
}


