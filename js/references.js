async function generateReference() {
    const url = document.getElementById('doiInput').value.trim();
    const resultBox = document.getElementById('referenceResult');
    resultBox.innerText = 'Fetching reference...';
  
    const doiMatch = url.match(/10\.\d{4,9}\/[-._;()\/:A-Z0-9]+/i);
    const doi = doiMatch ? doiMatch[0] : url;
  
    const api = `https://api.openalex.org/works/https%3A%2F%2Fdoi.org%2F${encodeURIComponent(doi)}`;
  
    try {
      const response = await fetch(api);
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
  
      const title = data.title;
      const authors = data.authorships.map(a => a.author.display_name).join(', ');
      const year = data.publication_year;
      const venue = data.host_venue ? data.host_venue.display_name : '';
  
      const bibtex = `@article{ref${year},
    title = {${title}},
    author = {${authors}},
    journal = {${venue}},
    year = {${year}},
    doi = {${doi}},
    url = {${url}}
  }`;
  
      resultBox.innerText = bibtex;
    } catch (err) {
      resultBox.innerText = 'Error: ' + err.message;
    }
  }
  