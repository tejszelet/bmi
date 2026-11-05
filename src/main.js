import { renderCards } from './render';
import { bmiRules } from './rules';
import './style.css'
import { renderForm } from './urlap'

const container = document.getElementById('urlap-doboz');

renderForm(container);
renderCards(bmiRules);