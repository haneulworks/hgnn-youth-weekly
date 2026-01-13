const archiveList = document.getElementById('archiveList');

if (archiveList) {
  fetch('../data/weekly.json')
    .then(res => res.json())
    .then(data => {
      data.weeks
        .sort((a,b)=> new Date(b.date) - new Date(a.date))
        .forEach(w => {
          const li = document.createElement('li');

          li.innerHTML = `
            <a href="../sub/view.html?date=${w.date}">
              <div class="date">${format(w.date)}</div>
              <div class="title">${w.title}</div>
            </a>
          `;

          archiveList.appendChild(li);
        });
    });
}

function format(d){
  const date = new Date(d);
  return `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')}`;
}
