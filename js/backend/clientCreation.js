const { ipcRenderer} = require('electron');

document.getElementById('Client-Form').addEventListener('submit', (event) => {
  event.preventDefault();
  const Nom = document.getElementById('Nom').value;
  const Prenom = document.getElementById('Prenom').value;
  const utilisateur = document.getElementById('utilisateur').value;
  const email = document.getElementById('email').value;
  const tele = document.getElementById('tele').value;
  const Num = document.getElementById('Num').value;
  const rue = document.getElementById('rue').value;
  const ville = document.getElementById('ville').value;
  const Codepostal = document.getElementById('Codepostal').value;
  ipcRenderer.send('form-submission', { Nom, Prenom, utilisateur, email, tele, Num, rue, ville, Codepostal });
});
