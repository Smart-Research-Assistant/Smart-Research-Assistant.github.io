function summarize() {
    const input = document.getElementById('textToSummarize').value;
    const summary = input.split('.').slice(0, 2).join('.') + '.';
    document.getElementById('summaryOutput').innerText = summary || 'No input provided.';
  }
  