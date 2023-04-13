

// Check le navigateur
if(navigator.userAgent.indexOf("Firefox") != -1){
  alert("Vous utilisez Firefox ! Le choix des voix pourrait ne pas être disponible... Je vous recommande d'utiliser Chrome ou Edge");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// récupérer la liste déroulante des voix
const voiceSelect = document.getElementById('voice-select');

// actualiser les options de la liste déroulante lorsque les voix sont modifiées
window.speechSynthesis.addEventListener('voiceschanged', () => {
  const syntheseVocale = window.speechSynthesis;
  const voices = syntheseVocale.getVoices();

  // supprimer toutes les options existantes
  voiceSelect.innerHTML = '';

  // ajouter une option pour chaque voix disponible
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice.name;
    option.setAttribute('value', voice.name);
    voiceSelect.appendChild(option);
  });
});

// lire le texte avec la voix sélectionnée
function read() {
  const text = document.getElementById('text').value;
  const syntheseVocale = window.speechSynthesis;
  const message = new SpeechSynthesisUtterance(text);
  message.lang = 'fr-FR';
  const selectedVoice = voiceSelect.value;
  const voices = syntheseVocale.getVoices();
  const newVoice = voices.find(voice => voice.name === selectedVoice);

  if (newVoice) {
    message.voice = newVoice;
  }

  syntheseVocale.speak(message);
}


const input = document.getElementById('text')
  input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && input.value.trim() !== '') {
      read();
    }
  });

   function clearInput() {
     const input = document.getElementById('text');
    input.value = '';
    document.getElementById('char-count').textContent = "0";
    document.getElementById('char-count-no-spaces').textContent = "0";
    document.getElementById('word-count').textContent = "0";
  }


  // Compte les mots et caractères présents => à revoir....
  function updateStats() {
    const text = document.getElementById('text').value;
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const wordCount = text.trim().split(/[\s,.;:!?]+/).filter(word => word !== '' && !word.match(/\d+/)).length;

    document.getElementById('char-count').textContent = charCount;
    document.getElementById('char-count-no-spaces').textContent = charCountNoSpaces;
    document.getElementById('word-count').textContent = wordCount;
  }