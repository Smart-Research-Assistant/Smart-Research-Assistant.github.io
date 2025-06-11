function startDictation() {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert('Sorry, your browser does not support Speech Recognition.');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'en-US';  
  recognition.interimResults = false; 
  recognition.maxAlternatives = 1;

  const resultArea = document.getElementById('speechResult');

  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    resultArea.value = transcript;
  };

  recognition.onerror = function(event) {
    alert('Error occurred in recognition: ' + event.error);
  };

  recognition.onend = function() {
    console.log('Speech recognition service disconnected');
  };
}
