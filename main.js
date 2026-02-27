const questions = [
    { q: "아침에 눈을 뜨자마자 가장 먼저 하는 일은?", a: "알림, 카톡, SNS 피드 확인", b: "기지개 켜기 혹은 물 마시기" },
    { q: "화장실에 갈 때 핸드폰을 깜빡했다면?", a: "다시 나가서 무조건 가져온다", b: "그냥 볼일을 본다" },
    { q: "혼자 밥을 먹으려는데 볼 영상이 없다면?", a: "찾을 때까지 숟가락을 들지 않는다", b: "그냥 밥 먹는 것에 집중한다" },
    { q: "10분이 넘는 영상이나 글을 볼 때 나는?", a: "무조건 스킵하거나 요약본만 찾는다", b: "처음부터 끝까지 진득하게 본다" },
    { q: "친구가 약속에 5분 늦는다는 연락을 받으면?", a: "즉시 숏폼(쇼츠/릴스)을 켠다", b: "주변을 구경하거나 멍때린다" },
    { q: "인터넷 글을 읽을 때 나의 스타일은?", a: "핵심 문장만 훑으며 빠르게 내려간다", b: "한 문장씩 천천히 정독한다" },
    { q: "영화나 드라마 시청 중 지루한 구간이 나오면?", a: "나도 모르게 폰을 켜서 딴짓한다", b: "지루해도 화면을 끝까지 유지한다" },
    { q: "배터리가 15% 미만인데 충전기가 없다면?", a: "불안해서 아무것도 손에 안 잡힌다", b: "꺼지면 꺼지는 거지 생각한다" },
    { q: "알림 진동이 온 것 같아 확인했는데 아무것도 없었다면?", a: "자주 겪는 일이다", b: "거의 겪지 않는다" },
    { q: "잠들기 직전 불을 끈 상태에서 나의 모습은?", a: "졸려서 폰을 떨어뜨릴 때까지 스크롤", b: "폰을 멀리 두고 바로 눈을 감는다" },
    { q: "맛집이나 예쁜 카페에 가면?", a: "사진/스토리에 올리는 것이 우선이다", b: "사진 한 장 찍거나 바로 먹는다" },
    { q: "하루 동안 SNS/숏폼을 금지하는 버튼이 있다면?", a: "절대 못 누른다. 세상과 단절된 기분", b: "당장 누르고 해방감을 느낀다" }
];

const results = [
    { min: 0, max: 2, emoji: "🦄", title: "디지털 천연기념물", desc: "당신은 2026년 인류 중 상위 1%의 자제력을 가졌습니다. 알고리즘의 유혹을 완벽히 통제하고 진정한 삶의 여유를 즐길 줄 아는 분이군요!" },
    { min: 3, max: 5, emoji: "🏕️", title: "선택적 디지털 은둔자", desc: "핸드폰을 도구로 잘 활용하시네요. 필요할 땐 몰입하지만, 아날로그의 즐거움을 잊지 않은 건강한 상태입니다." },
    { min: 6, max: 8, emoji: "🎧", title: "BGM형 멀티태스커", desc: "현대인의 표준입니다. 다만, 침묵을 견디기 힘들어 항상 배경에 무언가를 틀어놓지는 않나요? 가끔은 뇌에 휴식을 주세요." },
    { min: 9, max: 10, emoji: "🧟", title: "새로고침 좀비", desc: "위험 단계입니다! 무의식적인 새로고침과 의미 없는 스크롤링에 소중한 시간을 뺏기고 있어요. 오늘 하루는 폰을 멀리해볼까요?" },
    { min: 11, max: 12, emoji: "🐠", title: "뇌세포 15초 붕어", desc: "긴급 상황! 당신의 집중력은 이미 숏폼 알고리즘에 완전히 장악되었습니다. 15초 이상의 자극 없이는 무료함을 참지 못하는 상태입니다. 강력한 디톡스가 필요해요!" }
];

let currentIdx = 0;
let scoreA = 0;

function startTest() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('question-screen').classList.remove('hidden');
    document.getElementById('p-bar').style.display = 'block';
    updateQuestion();
}

function updateQuestion() {
    const progress = ((currentIdx) / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('q-num').innerText = `Q${currentIdx + 1}.`;
    document.getElementById('q-text').innerText = questions[currentIdx].q;
    const btns = document.querySelectorAll('.btn-option');
    btns[0].innerText = questions[currentIdx].a;
    btns[1].innerText = questions[currentIdx].b;
}

function handleSelect(choice) {
    if (choice === 'A') scoreA++;
    currentIdx++;
    if (currentIdx < questions.length) {
        updateQuestion();
    } else {
        showLoading();
    }
}

function showLoading() {
    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('loading-screen').classList.remove('hidden');
    setTimeout(showResult, 2500);
}

function showResult() {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    const res = results.find(r => scoreA >= r.min && scoreA <= r.max);
    document.getElementById('result-emoji').innerText = res.emoji;
    document.getElementById('result-title').innerText = res.title;
    document.getElementById('result-desc').innerHTML = `<strong>A 선택 횟수: ${scoreA}회</strong><br><br>${res.desc}`;
}

// Theme Toggle Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.innerText = theme === 'light' ? '🌙' : '☀️';
    }
}

// Contact Form Toggle Logic
function toggleContactForm(event) {
    event.stopPropagation();
    const section = document.querySelector('.contact-section');
    section.classList.toggle('active');
}

document.addEventListener('click', (e) => {
    const section = document.querySelector('.contact-section');
    if (section && !section.contains(e.target)) {
        section.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', initTheme);
