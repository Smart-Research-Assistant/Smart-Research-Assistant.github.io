document.addEventListener('DOMContentLoaded', () => {
  const checklist = document.getElementById('checklist');
  const clearBtn = document.getElementById('clearBtn');

  function loadStatus() {
    const savedStatus = localStorage.getItem('paperChecklist');
    if (savedStatus) {
      const statusObj = JSON.parse(savedStatus);
      checklist.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        const id = cb.getAttribute('data-id');
        cb.checked = !!statusObj[id];
      });
    }
  }

  function saveStatus() {
    const statusObj = {};
    checklist.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      const id = cb.getAttribute('data-id');
      statusObj[id] = cb.checked;
    });
    localStorage.setItem('paperChecklist', JSON.stringify(statusObj));
  }

  checklist.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
      saveStatus();
    }
  });

  clearBtn.addEventListener('click', () => {
    checklist.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    localStorage.removeItem('paperChecklist');
  });

  loadStatus();
});
