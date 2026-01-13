// URL에서 date 파라미터 가져오기
const params = new URLSearchParams(window.location.search);
const date = params.get("date");

// date가 없으면 목록으로 돌려보내기
if (!date) {
  location.href = "./list.html";
}

// JSON 불러오기
fetch("../data/weekly.json")
  .then(res => res.json())
  .then(data => {
    const week = data.weeks.find(w => w.date === date);

    if (!week) {
      alert("해당 날짜의 주보를 찾을 수 없습니다.");
      return;
    }

    // 상단
    document.getElementById("weekDate").textContent = format(date);
    document.getElementById("sermonTitle").textContent = week.title;
    document.getElementById("preacher").textContent = week.preacher;

    // 말씀
    document.getElementById("verseText").innerHTML =
  week.verse.replace(/\n/g, "<br>");
    document.getElementById("verseRef").textContent = week.bible;

    // 예배 순서
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = "";
    week.order.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.title} · ${item.who}`;
      orderList.appendChild(li);
    });

    // 공지
    const noticeList = document.getElementById("noticeList");
    noticeList.innerHTML = "";
    week.notice.forEach(text => {
      const li = document.createElement("li");
      li.textContent = text;
      noticeList.appendChild(li);
    });

    // 다음 주
    document.getElementById("nextDate").textContent = format(week.next.date);

    const nextList = document.getElementById("nextList");
    nextList.innerHTML = "";
    week.next.members.forEach(m => {
      const div = document.createElement("div");
      div.innerHTML = `<span>${m.role}</span>${m.name}`;
      nextList.appendChild(div);
    });
  })
  .catch(err => {
    console.error("JSON 불러오기 실패:", err);
  });

// 날짜 포맷 2026-01-11 → 2026.01.11
function format(d) {
  const date = new Date(d);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}
