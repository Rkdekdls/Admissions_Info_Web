/* 전공 찾기. 전공 탐색 안내에서 열고, 응답은 이 세션에만 둔다. */
(function (root) {
  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const TAG_EMOJI = {
    t_mind: "🧠", t_care: "👨‍👩‍👧", t_law: "⚖️", t_school: "📚", t_history: "🏛️",
    t_body: "🩺", t_drug: "💊", t_life: "🧬", t_grow: "🌱", t_food: "🍽️",
    t_number: "📊", t_phys: "🌊", t_earth: "🌍", t_matter: "🧪", t_eco: "🍃", t_sciphilo: "🔍",
    t_city: "🏙️", t_machine: "⚙️", t_electro: "💡", t_soft: "💻", t_material: "🧱", t_safety: "🛡️",
    t_company: "💼", t_economy: "📈", t_logistics: "🚚", t_media: "📣", t_archive: "📁",
    t_lang: "✏️", t_design: "🎨", t_music: "🎵", t_film: "🎬", t_game: "🎮", t_sport: "⚽",
    "track:자연과학계열": "🔬",
    "track:공학계열": "⚙️",
    "track:의학계열": "🩺",
    "track:인문사회계열": "📚",
    "track:예체능계열": "🎨",
  };

  const VALUE_EMOJI = {
    want: "😄",
    like: "🙂",
    some: "😐",
    less: "🙁",
    no: "😢",
  };

  const EMOJI_RULES = [
    [/돌보|치료|환자|간호/, "🩺"],
    [/걷|재활|운동/, "🏃"],
    [/병의 원인|검사/, "🔬"],
    [/치아|잇몸/, "🦷"],
    [/약|침과/, "💊"],
    [/동물|가축|물고기/, "🐾"],
    [/작물|숲|나무|식물/, "🌿"],
    [/음식|식단|요리|영양/, "🍽️"],
    [/숫자|증명|설문|통계/, "📊"],
    [/빛|소리|힘/, "🔆"],
    [/땅|별|바다|날씨/, "🌍"],
    [/물질|반응|플라스틱|금속|재료|소재|섬유/, "🧪"],
    [/환경|오염|생태/, "🍃"],
    [/건물|도시|길|통학|다리|방/, "🏙️"],
    [/자동차|비행|기계|모터|배/, "🚗"],
    [/전기|회로|칩|신호/, "💡"],
    [/앱|프로그램|추천/, "💻"],
    [/옷|그림|디자인|색/, "🎨"],
    [/음악|노래|멜로디|피아노|가야금/, "🎵"],
    [/영상|영화|사진|카메라|연기/, "🎬"],
    [/게임|만화|놀이/, "🎮"],
    [/춤|박자/, "💃"],
    [/법|규칙|행정|나라/, "⚖️"],
    [/수업|가르치|학생/, "📚"],
    [/언어|글|우리말|영어/, "✏️"],
    [/돈|회사|가격|예산/, "💼"],
    [/안전|사고|불/, "🛡️"],
  ];

  const ICON = {
    chat: '<path d="M7.5 17 5 19.2V16A7 7 0 1 1 12 19H7.5z"/>',
    users: '<path d="M16 19.5v-1a2.8 2.8 0 0 0-2-2.7"/><path d="M8 19.5v-1a3 3 0 0 1 4.2-2.8"/><circle cx="9" cy="8.2" r="2.1"/><circle cx="15" cy="8.8" r="1.7"/>',
    scale: '<path d="M12 4v15"/><path d="M7 19h10"/><path d="M6.5 8h11"/><path d="m6.5 8-2.2 4.6a2.6 2.6 0 0 0 4.4 0z"/><path d="m17.5 8-2.2 4.6a2.6 2.6 0 0 0 4.4 0z"/>',
    book: '<path d="M5 5.5h5.8A2.7 2.7 0 0 1 13.5 8v10.5A2 2 0 0 0 11.5 16.5H5z"/><path d="M19 5.5h-5.8A2.7 2.7 0 0 0 10.5 8v10.5A2 2 0 0 1 12.5 16.5H19z"/>',
    landmark: '<path d="M4 10.5h16"/><path d="M6.5 10.5V17"/><path d="M10.2 10.5V17"/><path d="M13.8 10.5V17"/><path d="M17.5 10.5V17"/><path d="M3.5 17.5h17"/><path d="M12 4 4 10.5h16z"/>',
    heart: '<path d="M12 18.5s-5.8-3.6-5.8-7.4A3.2 3.2 0 0 1 12 8.6a3.2 3.2 0 0 1 5.8 2.5c0 3.8-5.8 7.4-5.8 7.4z"/>',
    pill: '<rect x="8.2" y="3.5" width="7.6" height="17" rx="3.8"/><path d="M8.2 12h7.6"/>',
    dna: '<path d="M8 4c4 2.8 4 4.6 0 7.4S4 16.2 8 19"/><path d="M16 4c-4 2.8-4 4.6 0 7.4s4 4.8 0 7.6"/><path d="M9.2 8.2h5.6"/><path d="M9.2 15.8h5.6"/>',
    sprout: '<path d="M12 20v-8"/><path d="M12 14c0-3.6 2.8-5.6 6.5-5.6-1 3.6-3 5.6-6.5 5.6z"/><path d="M12 16c0-2.8-2.2-4.6-5.4-4.6 1 3.2 2.6 4.6 5.4 4.6z"/>',
    utensils: '<path d="M8 4v5.5A2 2 0 0 0 10 11.5V4"/><path d="M8 4v16"/><path d="M16 4v16"/><path d="M16 4c1.8 1.2 1.8 3.6 0 5.2"/>',
    chart: '<path d="M4 19h16"/><path d="M7.5 16v-4"/><path d="M12 16V8"/><path d="M16.5 16v-6"/>',
    waves: '<path d="M3.5 9c1.8 0 1.8-2 3.6-2s1.8 2 3.6 2 1.8-2 3.6-2 1.8 2 3.6 2 1.8-2 3.6-2"/><path d="M3.5 15c1.8 0 1.8-2 3.6-2s1.8 2 3.6 2 1.8-2 3.6-2 1.8 2 3.6 2 1.8-2 3.6-2"/>',
    globe: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16"/><path d="M12 4c2.2 2.1 3.4 4.8 3.4 8s-1.2 5.9-3.4 8c-2.2-2.1-3.4-4.8-3.4-8s1.2-5.9 3.4-8z"/>',
    flask: '<path d="M10 3.5h4"/><path d="M11 3.5v5.6L6.8 17.6A2.8 2.8 0 0 0 9.2 21h5.6a2.8 2.8 0 0 0 2.4-3.4L13 9.1V3.5"/>',
    leaf: '<path d="M5 18.5C5 11 10.5 5.5 19 5.5 19 13 13.5 18.5 5 18.5z"/><path d="M8.5 15.5c2-2 3.8-4.6 5.5-7.2"/>',
    search: '<circle cx="11" cy="11" r="5.5"/><path d="m15.5 15.5 4 4"/>',
    city: '<path d="M4 20V9.5L8.5 7V20"/><path d="M8.5 20V7l6 2.6V20"/><path d="M14.5 20V11l5.5 2V20"/><path d="M3 20h18"/>',
    cog: '<circle cx="12" cy="12" r="2.6"/><path d="M12 3.5v2M12 18.5v2M4.8 6.4l1.4 1.4M17.8 16.2l1.4 1.4M3.5 12h2M18.5 12h2M4.8 17.6l1.4-1.4M17.8 7.8l1.4-1.4"/>',
    cpu: '<rect x="7" y="7" width="10" height="10" rx="1.4"/><path d="M9.5 3.5V7M12 3.5V7M14.5 3.5V7M9.5 17v3.5M12 17v3.5M14.5 17v3.5M3.5 9.5H7M3.5 12H7M3.5 14.5H7M17 9.5h3.5M17 12h3.5M17 14.5h3.5"/>',
    code: '<path d="m8 8-3.5 4L8 16"/><path d="m16 8 3.5 4L16 16"/><path d="m13 6-2 12"/>',
    layers: '<path d="m12 4 8 4-8 4-8-4z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/>',
    shield: '<path d="M12 3.5 5.5 6.2v5.6c0 3.8 2.6 6.4 6.5 8.2 3.9-1.8 6.5-4.4 6.5-8.2V6.2z"/>',
    briefcase: '<rect x="3.5" y="7.5" width="17" height="12" rx="1.4"/><path d="M8.5 7.5V6A1.5 1.5 0 0 1 10 4.5h4A1.5 1.5 0 0 1 15.5 6v1.5"/><path d="M3.5 12.5h17"/>',
    truck: '<path d="M3 7.5h10.5v8H3z"/><path d="M13.5 10.5H17l3 2.8v2.2h-6.5"/><circle cx="7" cy="17.6" r="1.5"/><circle cx="17" cy="17.6" r="1.5"/>',
    megaphone: '<path d="M5 10v4"/><path d="M5 10h2.8l8.2-3.6v11.2L7.8 14H5"/><path d="M7.8 14v2.4A1.8 1.8 0 0 0 9.6 18"/>',
    folder: '<path d="M3.5 7.5h5.5l2 2h9.5V19h-17z"/>',
    pen: '<path d="M4 20h3.6L18.5 9.1 14.9 5.5 4 16.4z"/><path d="m13.2 7.2 3.6 3.6"/>',
    palette: '<path d="M12 4.5a7.5 7.5 0 1 0 0 15h1.1a1.8 1.8 0 0 0 0-3.6H12a1.8 1.8 0 0 1-1.8-1.8A5.6 5.6 0 0 1 12 4.5z"/><circle cx="8.2" cy="10.2" r=".7" fill="currentColor" stroke="none"/><circle cx="10.2" cy="7.8" r=".7" fill="currentColor" stroke="none"/><circle cx="13.8" cy="7.8" r=".7" fill="currentColor" stroke="none"/>',
    music: '<path d="M9 17.5V6.5l9.5-2v11"/><circle cx="7.2" cy="17.5" r="1.8"/><circle cx="16.7" cy="15.5" r="1.8"/>',
    camera: '<path d="M4 8.5h3.2L9 6.5h6L16.8 8.5H20V18H4z"/><circle cx="12" cy="13" r="2.8"/>',
    gamepad: '<rect x="3" y="8.5" width="18" height="8.5" rx="2.8"/><path d="M8 11.2v3.6M6.2 13h3.6"/><circle cx="15.6" cy="12" r=".6" fill="currentColor" stroke="none"/><circle cx="17.6" cy="13.8" r=".6" fill="currentColor" stroke="none"/>',
    activity: '<path d="M3.5 14h3.2l1.8-4.6 3 8.2 2-3.6h6.8"/>',
    smile: '<circle cx="12" cy="12" r="8"/><path d="M8.6 10.2h.01M15.4 10.2h.01"/><path d="M8.6 14.2a4 4 0 0 0 6.8 0"/>',
    meh: '<circle cx="12" cy="12" r="8"/><path d="M8.6 10.2h.01M15.4 10.2h.01"/><path d="M8.6 15h6.8"/>',
    no: '<circle cx="12" cy="12" r="8"/><path d="m8 8 8 8"/>',
    clipboard: '<rect x="6.5" y="4.5" width="11" height="15.5" rx="1.4"/><path d="M9 4.8h6V7H9z"/><path d="M9 11.2h6M9 14.6h4"/>',
    tooth: '<path d="M8 6.2c0-2 8-2 8 0 0 2.6 1.8 3.6 1.8 7.2 0 2.6-1.8 4.4-2.8 1.8-1-2.2-1.6-2.2-2.6.2-1 2.6-2.8.8-2.8-1.6 0-3.6 1.8-4.6 1.8-7.6z"/>',
    paw: '<circle cx="7.6" cy="8.2" r="1.3"/><circle cx="12" cy="6.6" r="1.3"/><circle cx="16.4" cy="8.2" r="1.3"/><path d="M8.2 14.2c0-1.8 1.3-2.8 3.8-2.8s3.8 1 3.8 2.8-1.4 3.6-3.8 3.6-3.8-1.8-3.8-3.6z"/>',
    scan: '<path d="M4.5 8.5V5h3.5M16 5h3.5v3.5M19.5 15.5V19H16M8 19H4.5v-3.5"/><path d="M7 12h10"/>',
  };

  const TAG_ICON = {
    t_mind: "chat",
    t_care: "users",
    t_law: "scale",
    t_school: "book",
    t_history: "landmark",
    t_body: "heart",
    t_drug: "pill",
    t_life: "dna",
    t_grow: "sprout",
    t_food: "utensils",
    t_number: "chart",
    t_phys: "waves",
    t_earth: "globe",
    t_matter: "flask",
    t_eco: "leaf",
    t_sciphilo: "search",
    t_city: "city",
    t_machine: "cog",
    t_electro: "cpu",
    t_soft: "code",
    t_material: "layers",
    t_safety: "shield",
    t_company: "briefcase",
    t_economy: "chart",
    t_logistics: "truck",
    t_media: "megaphone",
    t_archive: "folder",
    t_lang: "pen",
    t_design: "palette",
    t_music: "music",
    t_film: "camera",
    t_game: "gamepad",
    t_sport: "activity",
  };

  const VALUE_ICON = { want: "smile", some: "meh", no: "no" };

  const ICON_RULES = [
    [/치아|잇몸/, "tooth"],
    [/약용|약재|침과/, "sprout"],
    [/용량|몸속/, "pill"],
    [/동물|가축|물고기|동식물|양식|사육/, "paw"],
    [/검사 장비|의료기기|수치와 영상|측정하도록/, "scan"],
    [/예방|재해|사고가 나|위험한|미리 막는|비나 불/, "shield"],
    [/병원|보건소|일정과 기록|행사|순서를 맞춰|무대와|반응을 기록|반응을 적/, "clipboard"],
    [/환자|치료|증상|돌보|걷거나|건강 상태/, "heart"],
    [/세포|유전자|미생물/, "dna"],
    [/작물|숲의|나무와|농지|흙,|흙을/, "sprout"],
    [/식단|영양|요리|음식|맛과|급식|메뉴/, "utensils"],
    [/증명|성립하는지/, "chart"],
    [/빛, 소리, 힘/, "waves"],
    [/지층|땅의 층|별,|날씨|바다|대기|관측/, "globe"],
    [/물질|반응할|플라스틱|분자|공장/, "flask"],
    [/오염|생태계|더러운|강이/, "leaf"],
    [/믿을 만한|한계를/, "search"],
    [/건물|통학|횡단|마당|녹지|다리|방 배치|다니는 길/, "city"],
    [/자동차|비행기|우주선|열차가|기계|모터|배가 파도|부품을/, "cog"],
    [/전기|회로|칩|신호|렌즈|빛길|전력이/, "cpu"],
    [/앱|추천하는|설문|재고|프로그램|기능 만들/, "code"],
    [/소재|금속|도자기|섬유|재료를|강도와/, "layers"],
    [/저축|보험|물건값|집값|기록을 맞춰|사람과 돈을|예산/, "briefcase"],
    [/버스|항공|항로|비행 경로|운항|항구|여행|사람이 타지|매장|가게를|열차 간격/, "truck"],
    [/뉴스|메시지|관심을 갖게/, "megaphone"],
    [/책과 자료|주제별로|근거를|자료를 모아/, "folder"],
    [/카메라|사진으로|영상|대본|출연|컷을/, "camera"],
    [/가야금|피아노|노랫말|멜로디|악보|밴드|음악|장구|발성/, "music"],
    [/옷의|옷감|피부|색과 스타일|포스터|조형을|그림의|작품|손과 도구|배치/, "palette"],
    [/놀이|만화|애니메이션|칸과 대사|규칙과 단계|그림이 이어져/, "gamepad"],
    [/운동 동작|춤|박과 감정|박자|기록이 좋아/, "activity"],
    [/우리말|영어|중국어|일본어|독일어|프랑스어|스페인어|러시아어|아시아의 다른 언어|유럽의 다른 언어|여러 언어|시와 이야기/, "pen"],
    [/느끼고 행동|차별|생활 방식|방식으로 사는|어려운 사람|아이와 가족|가정의 돈|다툼|공공기관|의견 충돌|나라의 안전|여러 나라가/, "users"],
    [/수업|초등|어린아이|학생에게|학생들이|외국어나 국어|눈높이|배우는 방법/, "book"],
    [/옛 기록|민요|종교|유물|한 지역의 역사/, "landmark"],
    [/옳은 행동|규칙이 적용|법이/, "scale"],
    [/관찰하고|변화를 기록/, "search"],
    [/쉽게 알려|곁에서/, "users"],
    [/작동하는 물건|고쳐 보기|고장 나면/, "cog"],
    [/이야기나 그림|결과물을/, "palette"],
  ];

  function iconNameForLabel(label) {
    const text = String(label || "");
    for (let i = 0; i < ICON_RULES.length; i += 1) {
      if (ICON_RULES[i][0].test(text)) return ICON_RULES[i][1];
    }
    return "search";
  }

  const EMOJI_POOL = [
    "🧠", "👨‍👩‍👧", "⚖️", "📚", "🏛️", "🩺", "💊", "🧬", "🌱", "🍽️",
    "📊", "🌊", "🌍", "🧪", "🍃", "🔍", "🏙️", "⚙️", "💡", "💻",
    "🧱", "🛡️", "💼", "📈", "🚚", "📣", "📁", "✏️", "🎨", "🎵",
    "🎬", "🎮", "⚽", "😄", "😐", "🙁", "🏃", "🦷", "🐾", "🌿",
    "🔆", "🚗", "💃", "🍎", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓",
    "🍒", "🍑", "🍍", "🥝", "🍅", "🥑", "🥦", "🌽", "🥕", "🍞",
    "🧀", "🥚", "🍳", "🥓", "🍗", "🍔", "🍟", "🍕", "🌮", "🍣",
    "🍜", "🍩", "🍪", "🍫", "🍯", "☕", "🍵", "🐶", "🐱", "🐭",
    "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸",
    "🐵", "🐔", "🐧", "🐦", "🦆", "🦅", "🦉", "🐺", "🐴", "🦄",
    "🐝", "🦋", "🐞", "🐢", "🐍", "🐙", "🦀", "🐠", "🐬", "🐳",
    "🦈", "🐘", "🦒", "🦘", "🦌", "🐓", "🦜", "🌸", "🌻", "🌹",
    "🌷", "🍀", "🍁", "🍄", "🌵", "🌴", "🌲", "⭐", "🌙", "☀️",
    "⛅", "🌈", "⚡", "❄️", "🔥", "💧", "🎈", "🎁", "📌", "📎",
    "✂️", "📏", "🔑", "🔒", "🧲", "🔧", "🔨", "🪛", "🪚", "🪜",
    "🧱", "🚪", "🪟", "🪑", "🛏️", "🛋️", "🚿", "🧴", "🧼", "🧽",
    "🧹", "🧺", "🧻", "🪥", "👓", "🕶️", "👔", "👗", "👠", "👟",
    "🎩", "👑", "💍", "💎", "📷", "🎥", "📺", "📻", "🎙️", "🎧",
    "🎹", "🥁", "🎷", "🎺", "🎸", "🎻", "🪕", "🎤", "🔔", "📢",
    "📮", "✉️", "📦", "📫", "📰", "🗞️", "📘", "📗", "📙", "📕",
    "📓", "📔", "📒", "📜", "📝", "🖊️", "🖋️", "🖌️", "🖍️", "🧮",
    "💰", "💴", "💵", "💳", "🧾", "💹", "🏦", "🏪", "🏫", "🏥",
    "🏨", "⛪", "🕌", "🛕", "🗽", "🗼", "🏰", "🎡", "🎢", "⛵",
    "🚢", "✈️", "🚁", "🚂", "🚃", "🚌", "🚎", "🚓", "🚑", "🚒",
    "🚜", "🚲", "🛵", "🏍️", "🚨", "🚦", "🚧", "⚓", "🗺️", "🧭",
    "⏱️", "⏰", "🕰️", "📡", "🔋", "🔌", "💾", "💿", "📀", "🖱️",
    "🖨️", "⌨️", "📱", "☎️", "📞", "📠", "🔭", "🔬", "💉", "🩸",
    "🩹", "🦴", "🫁", "🫀", "🧠", "👁️", "👂", "👃", "👅", "🦷",
    "👶", "🧒", "👦", "👧", "🧑", "👨", "👩", "🧓", "👴", "👵",
    "👮", "👷", "💂", "🕵️", "👩‍⚕️", "👩‍🏫", "👩‍🌾", "👩‍🍳", "👩‍🔧", "👩‍🔬",
    "👩‍💻", "👩‍🎤", "👩‍🎨", "👩‍✈️", "👩‍🚀", "👩‍⚖️", "👰", "🤴", "🦸", "🦹",
    "🧙", "🧚", "🧛", "🧜", "🧝", "🧞", "🧟", "💆", "💇", "🚶",
    "🧍", "🧎", "🏃‍♀️", "💃", "🕺", "👯", "🧖", "🧗", "🏇", "⛷️",
    "🏂", "🏌️", "🏄", "🚣", "🏊", "⛹️", "🏋️", "🚴", "🚵", "🤸",
    "🤼", "🤽", "🤾", "🤹", "🧘", "🎪", "🎭", "🎨", "🧵", "🧶",
    "🪡", "🪢", "👓", "🥽", "🥼", "🦺", "👘", "🥻", "🩴", "🧦",
    "🎒", "🎓", "🧢", "🪖", "💄", "💍", "📿", "🪙", "🪜", "🧰",
    "🧲", "🧪", "🧫", "🧬", "🔭", "📡", "💉", "🩹", "🩺", "🚪"
  ];

  function preferredEmoji(choice) {
    if (choice.value && VALUE_EMOJI[choice.value]) return VALUE_EMOJI[choice.value];
    const tag = choice.tags && choice.tags[0];
    if (tag && TAG_EMOJI[tag]) return TAG_EMOJI[tag];
    const text = String(choice.label || "");
    for (let i = 0; i < EMOJI_RULES.length; i += 1) {
      if (EMOJI_RULES[i][0].test(text)) return EMOJI_RULES[i][1];
    }
    return "";
  }

  function assignEmojis() {
    const data = root.MajorFinderData;
    const byLabel = {};
    const used = new Set(["🤔"]);
    function claim(label, preferred, questionIndex) {
      if (!label || byLabel[label]) return;
      let emoji = preferred && !used.has(preferred) ? preferred : "";
      if (!emoji) {
        const stride = 17;
        for (let step = 0; step < EMOJI_POOL.length; step += 1) {
          const item = EMOJI_POOL[(questionIndex * 3 + step * stride) % EMOJI_POOL.length];
          if (!used.has(item)) {
            emoji = item;
            break;
          }
        }
      }
      if (!emoji) emoji = "✨";
      byLabel[label] = emoji;
      used.add(emoji);
    }
    const questions = (data && data.questions || []).concat(data && data.lateQuestions || []);
    questions.forEach((question, questionIndex) => {
      (question.choices || []).forEach((choice) => {
        if (choice.special) return;
        claim(choice.label, preferredEmoji(choice), questionIndex);
      });
    });
    return byLabel;
  }

  const LABEL_EMOJI = assignEmojis();

  function choiceEmoji(choice) {
    if (choice.special) return "🤔";
    if (choice.emoji) return choice.emoji;
    if (choice.label && LABEL_EMOJI[choice.label]) return LABEL_EMOJI[choice.label];
    return preferredEmoji(choice) || "✨";
  }

  function choiceIcon(choice) {
    return `<span class="mf-opt-icon" aria-hidden="true">${choiceEmoji(choice)}</span>`;
  }

  const PHASES = [
    { key: "topic", name: "관심 분야" },
    { key: "activity", name: "활동 선호" },
    { key: "late", name: "전공 비교" },
  ];

  function open() {
    if (!root.MajorFinderData || !root.MajorFinderEngine) return;
    let engine;
    try {
      engine = root.MajorFinderEngine.createEngine(root.MajorFinderData);
    } catch (error) {
      return;
    }

    let session = engine.createSession();
    session.phase = "question";
    let selection = [];
    let focusIndex = -1;
    let result = null;
    let errorText = "";

    let shell = document.getElementById("mf-root");
    if (!shell) {
      shell = document.createElement("div");
      shell.id = "mf-root";
      shell.className = "admit-detail-root mf-root";
      shell.hidden = true;
      document.body.appendChild(shell);
      shell.addEventListener("click", (event) => shell._ctrl && shell._ctrl.onClick(event));
      document.addEventListener("keydown", (event) => shell._ctrl && shell._ctrl.onKey(event));
    }
    shell.hidden = false;
    document.body.style.overflow = "hidden";

    function question() {
      return session.phase === "question" ? engine.currentQuestion(session) : null;
    }

    function loadSelection() {
      const saved = engine.currentAnswer(session);
      selection = saved ? saved.choiceIds.slice() : [];
      errorText = "";
    }

    function isValid() {
      const current = question();
      if (!current) return false;
      return engine.validateAnswer(current, { questionId: current.id, choiceIds: selection }).ok;
    }

    function commit() {
      const current = question();
      if (!current) return { ok: true };
      return engine.setAnswer(session, { questionId: current.id, choiceIds: selection.slice() });
    }

    function toggle(choice) {
      const current = question();
      if (!current || !choice) return;
      const id = choice.id;
      const limit = current.maxSelect || 2;
      if (choice.special || current.kind === "activity" || limit === 1) {
        selection = selection.length === 1 && selection[0] === id ? [] : [id];
      } else if (selection.indexOf(id) !== -1) {
        selection = selection.filter((item) => item !== id);
      } else {
        selection = selection.filter((item) => {
          const picked = current.choices.find((c) => c.id === item);
          return picked && !picked.special;
        });
        if (selection.length >= limit) {
          errorText = "최대 2개까지 고를 수 있어요";
          return;
        }
        selection = selection.concat(id);
      }
      errorText = "";
    }

    function goNext() {
      const saved = commit();
      if (!saved.ok) {
        errorText = saved.error || "응답을 확인해 주세요.";
        draw();
        return;
      }
      if (!engine.hasNext(session)) {
        result = engine.recommend({ version: engine.data.version, answers: engine.answersFromSession(session) });
        session.phase = "result";
        draw();
        return;
      }
      session.cursor += 1;
      loadSelection();
      focusIndex = -1;
      draw();
    }

    function goPrev() {
      if (isValid()) commit();
      if (session.cursor <= 0) {
        draw();
        return;
      }
      session.cursor -= 1;
      loadSelection();
      focusIndex = -1;
      draw();
    }

    function close() {
      shell.hidden = true;
      const detail = document.getElementById("major-detail-root");
      if (!detail || detail.hidden) document.body.style.removeProperty("overflow");
      const openers = [...document.querySelectorAll("[data-major-find-open]")];
      const opener = openers.find((node) => node.getClientRects().length) || openers[0];
      if (opener) opener.focus();
    }

    function restart() {
      session = engine.createSession();
      session.phase = "question";
      selection = [];
      result = null;
      errorText = "";
      focusIndex = -1;
      draw();
    }

    function questionKind(item) {
      if (!item) return "";
      return item.kind || "late";
    }

    function dynamicSession() {
      return session.mode === "short" || session.mode === "path";
    }

    function questionAt(index) {
      if (dynamicSession()) {
        const step = (session.steps || [])[index];
        if (!step) return null;
        return engine.questionById.get(step.questionId) || engine.lateById.get(step.questionId);
      }
      if (index < 12) return engine.questionById.get(engine.fixedIds[index]);
      const slot = (session.late || [])[index - 12];
      return slot ? engine.lateById.get(slot.questionId) : null;
    }

    function progressHtml() {
      if (session.phase === "question") question();
      const caps = { topic: 6, activity: 3, late: 3 };
      const starts = { topic: 0, activity: 6, late: 9 };
      const phases = PHASES.map((phase) => {
        const start = starts[phase.key];
        const shown = caps[phase.key];
        let count = 0;
        let cls = "";
        if (session.phase === "result") {
          count = shown;
          cls = " is-done";
        } else if (session.cursor >= start + shown) {
          count = shown;
          cls = " is-done";
        } else if (session.cursor >= start) {
          count = session.cursor - start + 1;
          cls = " is-on";
        }
        const width = shown ? Math.min(100, (count / shown) * 100) : 0;
        return `<div class="mf-phase${cls}">
          <span class="mf-phase-name">${phase.name}(${count}/${shown})</span>
          <span class="mf-phase-bar" role="presentation"><i style="width:${width}%"></i></span>
        </div>`;
      }).join("");
      return `<div class="mf-progress" aria-label="진행률">
        <div class="mf-phases">${phases}</div>
      </div>`;
    }

    function choiceIdsAt(index) {
      if (session.phase === "question" && session.cursor === index) return selection;
      if (dynamicSession()) {
        const step = (session.steps || [])[index];
        return (step && step.answer && step.answer.choiceIds) || [];
      }
      if (index < 12) {
        const saved = session.fixed && session.fixed[index];
        return (saved && saved.choiceIds) || [];
      }
      const slot = (session.late || [])[index - 12];
      return (slot && slot.answer && slot.answer.choiceIds) || [];
    }

    function picksHtml() {
      const groups = PHASES.map((phase) => ({ name: phase.name, key: phase.key, items: [] }));
      const steps = session.steps || [];
      const last = session.phase === "result" ? (dynamicSession() ? steps.length : 15) : session.cursor + 1;
      for (let index = 0; index < last; index += 1) {
        const current = questionAt(index);
        const ids = choiceIdsAt(index);
        if (!current || !ids.length) continue;
        const kind = questionKind(current);
        const group = groups.find((item) => item.key === kind);
        if (!group) continue;
        ids.forEach((id) => {
          const choice = current.choices.find((item) => item.id === id);
          if (!choice) return;
          const lead = kind === "activity" && current.activityLabel ? `${current.activityLabel} · ` : "";
          groups[groups.indexOf(group)].items.push(lead + choice.label);
        });
      }
      const body = groups
        .map((group) => {
          const chips = group.items.length
            ? group.items.map((label) => `<li>${escapeHtml(label)}</li>`).join("")
            : `<li class="is-empty">아직 없어요</li>`;
          return `<section class="mf-pick-group"><h3>${group.name}</h3><ul>${chips}</ul></section>`;
        })
        .join("");
      return `<aside class="mf-side">
        <h2>내가 고른 것</h2>
        ${body}
      </aside>`;
    }

    function box(on) {
      const mark = on
        ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.2 12.2 3.2 3.2 8-8.2" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        : "";
      return `<span class="mf-box" aria-hidden="true">${mark}</span>`;
    }

    function choiceButtons(current) {
      return current.choices.map((choice) => {
        const on = selection.indexOf(choice.id) !== -1;
        const plain = choice.specialKind === "unknown";
        return `<button type="button" class="mf-opt${plain ? " is-unknown" : ""}${on ? " is-on" : ""}" data-mf-choice="${escapeHtml(choice.id)}" aria-pressed="${on ? "true" : "false"}">
            <span class="mf-opt-main">${plain ? "" : choiceIcon(choice)}<span class="mf-opt-label">${escapeHtml(choice.label)}</span></span>
            ${box(on)}
          </button>`;
      }).join("");
    }

    const majorEmoji = new Map();
    (engine.data.lateQuestions || []).forEach((question) => {
      (question.choices || []).forEach((choice) => {
        if (choice.special) return;
        (choice.coreMajorIds || []).forEach((id) => {
          if (!majorEmoji.has(id)) majorEmoji.set(id, choiceEmoji(choice));
        });
      });
    });

    function linkedGroups(item) {
      const profile = engine.profileById.get(item.majorId);
      if (!profile) return [];
      const topics = new Set([].concat(profile.coreTopics || [], profile.relatedTopics || []));
      const activities = new Set([profile.coreActivity, profile.relatedActivity].filter(Boolean));
      const groups = PHASES.map((phase) => ({ name: phase.name, key: phase.key, items: [] }));
      const last = dynamicSession() ? (session.steps || []).length : 15;
      for (let index = 0; index < last; index += 1) {
        const current = questionAt(index);
        const ids = choiceIdsAt(index);
        if (!current || !ids.length) continue;
        const kind = questionKind(current);
        const group = groups.find((entry) => entry.key === kind);
        if (!group) continue;
        ids.forEach((id) => {
          const choice = current.choices.find((entry) => entry.id === id);
          if (!choice || choice.special) return;
          let related = false;
          if (kind === "topic") related = (choice.tags || []).some((tag) => topics.has(tag));
          else if (kind === "activity") related = activities.has(current.activityId);
          else if (kind === "late") {
            const idsForMajor = [].concat(choice.coreMajorIds || [], choice.relatedMajorIds || []);
            related = idsForMajor.indexOf(item.majorId) !== -1;
          }
          if (!related) return;
          const lead = kind === "activity" && current.activityLabel ? `${current.activityLabel} · ` : "";
          group.items.push(lead + choice.label);
        });
      }
      return groups.flatMap((group) => group.items.map((text) => ({
        name: group.name,
        key: group.key,
        text,
      })));
    }

    function linkedHtml(item) {
      const rows = linkedGroups(item);
      if (!rows.length) return "";
      const body = rows.map((row) => `<div class="admit-record-box admit-record-box-method"><div class="admit-record-method-top"><span class="admit-record-method-badge" data-mf-tone="${escapeHtml(row.key)}">${escapeHtml(row.name)}</span><span class="admit-record-method-desc">${escapeHtml(row.text)}</span></div></div>`).join("");
      return `<h4 class="admit-detail-section-title">전공과 관련된 내 답변</h4><div class="mf-linked">${body}</div>`;
    }

    function metaParts(item) {
      const parts = item.name === item.mid ? [item.track] : [item.track, item.mid];
      return parts.filter(Boolean);
    }

    function resultCard(item) {
      const emoji = majorEmoji.get(item.majorId) || "✨";
      const parts = metaParts(item).map((part, index) => `<span${index === 0 ? ' class="is-track"' : ""}>${escapeHtml(part)}</span>`).join("");
      return `<article class="mf-result-card" role="button" tabindex="0" data-mf-detail="${escapeHtml(item.name)}" data-mf-track="${escapeHtml(item.track)}" data-mf-mid="${escapeHtml(item.mid)}">
        <div class="mf-result-kicker">
          <h3 class="mf-result-name"><span class="mf-result-emoji" aria-hidden="true">${emoji}</span><span>${escapeHtml(item.name)}</span></h3>
          <p class="mf-result-meta">${parts}</p>
        </div>
        ${item.slotKind === "also" ? `<p class="mf-result-also">함께 살펴볼 전공</p>` : ""}
        ${linkedHtml(item)}
      </article>`;
    }

    function pdfDocument() {
      const detailHtml = (name) => (root.Guide && root.Guide.majorDetailSectionsHtml)
        ? root.Guide.majorDetailSectionsHtml(name)
        : "";
      const sheets = result.items.map((item) => {
        const parts = metaParts(item).map((part, index) => `<span${index === 0 ? ' class="is-track"' : ""}>${escapeHtml(part)}</span>`).join("");
        const emoji = majorEmoji.get(item.majorId) || "✨";
        const also = item.slotKind === "also" ? `<p class="also">함께 살펴볼 전공</p>` : "";
        const picks = linkedGroups(item).length
          ? `<h3 class="sec">전공과 관련된 내 답변</h3>${linkedGroups(item).map((row) => `<p class="pick"><b class="tone-${escapeHtml(row.key)}">${escapeHtml(row.name)}</b><span>${escapeHtml(row.text)}</span></p>`).join("")}`
          : "";
        return `<section class="sheet">
          <div class="fit"><article>
            <div class="kicker">
              <h2><span class="emoji">${emoji}</span><span>${escapeHtml(item.name)}</span></h2>
              <p class="meta">${parts}</p>
            </div>
            ${also}
            ${picks}
            ${detailHtml(item.name)}
          </article></div>
        </section>`;
      }).join("");
      return `<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=750, initial-scale=1"><title>전공 찾기 결과</title>
        <style>
          @page { size: A4; margin: 22px; }
          * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          html, body { margin: 0; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
          body { color: #1f2937; font-family: "Malgun Gothic", "Apple SD Gothic Neo", sans-serif; }
          .sheet { break-after: page; page-break-after: always; }
          .sheet:last-child { break-after: auto; page-break-after: auto; }
          .fit { transform-origin: top center; }
          article { padding: 0; border: 0; }
          h2 { display: flex; align-items: center; gap: 8px; margin: 0; font-size: 22px; line-height: 1; letter-spacing: -0.04em; }
          h2 > span:last-child { position: relative; top: -3px; }
          h2 .emoji { margin-left: -3px; font-size: 18px; line-height: 1; }
          h3.sec { display: flex; align-items: center; gap: 8px; margin: 15px 0; color: #1f2937; font-size: 15px; font-weight: 700; letter-spacing: -0.02em; line-height: 1; }
          h3.sec::before { content: ""; width: 7px; height: 7px; background: #1a4796; }
          p.pick { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 12px; margin: 0 0 8px; padding: 14px 16px; border: 1px solid #e5e7eb; line-height: 1.35; }
          p.pick b { display: inline-flex; align-items: center; height: 26px; padding: 0 10px; font-size: 12px; font-weight: 600; letter-spacing: -0.2px; }
          p.pick b.tone-topic { background: #fff7ed; color: #ea580c; }
          p.pick b.tone-activity { background: #f5f3ff; color: #7c3aed; }
          p.pick b.tone-late { background: #ecfdf8; color: #0f766e; }
          p.pick span { color: #1f2937; font-size: 13px; font-weight: 500; letter-spacing: -0.2px; }
          p { margin: 0; line-height: 1.55; }
          .kicker { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px 12px; }
          .also { margin-top: 10px; color: #1a4796; font-size: 13px; font-weight: 600; }
          .meta { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; margin: 0 0 0 auto; }
          .meta span { display: inline-flex; align-items: center; min-height: 28px; padding: 4px 10px; border: 1px solid #d1d5db; background: #fff; color: #1f2937; font-size: 13px; font-weight: 500; letter-spacing: -0.02em; line-height: 1.2; }
          .meta span.is-track { border-color: #dbe4f3; background: #eef4fb; color: #1a4796; }
          .intro { padding: 18px 16px 14px; border: 1px solid #e5e7eb; background: #fafafa; color: #1f2937; font-size: 13px; line-height: 1.45; }
          .intro p + p { margin-top: 5px; }
          .learn, .major-detail-career-card, .major-detail-trait { border: 1px solid #e5e7eb; background: #fff; }
          .learn, .major-detail-career-card { padding: 16px; }
          .major-detail-career-card { border-top: 2px solid #1a4796; }
          .major-detail-pill-wrap, .major-detail-career-grid { display: flex; flex-wrap: wrap; gap: 8px; }
          .major-detail-career-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
          .major-detail-pill { display: inline-flex; align-items: center; min-height: 28px; padding: 4px 10px; border: 1px solid #dbe4f3; background: #eef4fb; color: #1a4796; font-size: 13px; font-weight: 500; }
          .major-detail-traits { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 0; padding: 0; list-style: none; }
          .major-detail-trait { display: flex; align-items: center; gap: 10px; margin: 0; padding: 16px; font-size: 14px; font-weight: 500; line-height: 1.5; }
          .major-detail-trait-icon { display: inline-flex; color: #1a4796; }
          .major-detail-trait-icon svg { width: 18px; height: 18px; }
          .major-detail-career-title { margin: 0 0 10px; font-size: 15px; }
          .major-detail-career-body { margin: 0; color: #4b5563; font-size: 13px; font-weight: 400; line-height: 1.55; }
          .jobs { padding: 16px; border: 1px solid #e5e7eb; background: #fff; }
          .admit-record-list { margin: 0; padding: 0; list-style: none; font-size: 13px; line-height: 1.45; }
          .admit-record-list li { display: flex; align-items: flex-start; gap: 8px; }
          .admit-record-list li + li { margin-top: 6px; }
          .admit-record-list li::before { content: ""; flex: 0 0 auto; width: 5px; height: 5px; margin-top: 6px; border-radius: 50%; background: #1a4796; }
        </style></head><body>
        ${sheets}
      </body></html>`;
    }

    function fitPdfSheets(doc) {
      const limit = 1078;
      doc.querySelectorAll(".sheet").forEach((sheet) => {
        const fit = sheet.querySelector(".fit");
        if (!fit) return;
        fit.style.transform = "none";
        fit.style.marginBottom = "0px";
        const needed = fit.scrollHeight;
        if (!needed || needed <= limit) return;
        const scale = Math.floor((limit / needed) * 1000) / 1000;
        fit.style.transformOrigin = "top center";
        fit.style.transform = `scale(${scale})`;
        fit.style.marginBottom = `${Math.round(needed * (scale - 1))}px`;
      });
    }

    function pdfSaveTitle() {
      const now = new Date();
      const pad = (value) => String(value).padStart(2, "0");
      const stamp = `${String(now.getFullYear()).slice(2)}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
      return `전공 찾기 결과_${stamp}`;
    }

    function savePdf() {
      if (!result || !result.ok) return;
      const frame = document.createElement("iframe");
      frame.setAttribute("aria-hidden", "true");
      frame.style.cssText = "position:fixed;left:-12000px;top:0;width:750px;height:1400px;max-width:none;border:0";
      document.body.appendChild(frame);
      const doc = frame.contentDocument;
      doc.open();
      doc.write(pdfDocument());
      doc.close();
      const win = frame.contentWindow;
      const previousTitle = document.title;
      const restoreTitle = () => { document.title = previousTitle; };
      const remove = () => {
        restoreTitle();
        window.setTimeout(() => frame.remove(), 400);
      };
      win.addEventListener("afterprint", remove);
      window.addEventListener("afterprint", restoreTitle, { once: true });
      win.requestAnimationFrame(() => win.requestAnimationFrame(() => {
        fitPdfSheets(doc);
        const fileTitle = pdfSaveTitle();
        doc.title = fileTitle;
        document.title = fileTitle;
        win.focus();
        win.print();
      }));
    }

    function draw() {
      const closeBtn = `<button type="button" class="admit-detail-close" data-mf-close aria-label="닫기">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>`;
      const pdfBtn = session.phase === "result" && result && result.ok
        ? `<button type="button" class="admit-detail-link-btn" data-mf-pdf>PDF 저장<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M14 5h5v5M19 5l-9 9M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`
        : "";
      let main = "";
      const chevron = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      if (session.phase === "result") {
        const body = !result || !result.ok
          ? `<p class="mf-result-lead">${escapeHtml((result && result.error) || "결과를 만들지 못했습니다.")}</p>`
          : `<div class="mf-results">${result.items.map(resultCard).join("")}</div>`;
        main = `<div class="mf-q">${body}
          <div class="mf-foot">
            <button type="button" class="mf-prev" data-mf-edit>${chevron}답변 수정</button>
            <button type="button" class="mf-next" data-mf-restart>다시 하기</button>
          </div>
        </div>`;
      } else {
        const current = question();
        if (!current) {
          main = `<div class="mf-q"><h2 class="mf-prompt">다음 문항을 만들지 못했습니다.</h2><button type="button" class="mf-next" data-mf-retry>다시 시도</button></div>`;
        } else {
          const single = current.kind === "activity" || (current.maxSelect || 2) === 1;
          const hint = single ? "하나만 골라 주세요" : "최대 2개를 골라 주세요";
          const title = current.kind === "activity" ? current.activityPhrase || current.prompt : current.prompt;
          const isLast = engine.isLastQuestion(session);
          const prevBtn = session.cursor === 0
            ? ""
            : `<button type="button" class="mf-prev" data-mf-prev>${chevron}이전</button>`;
          const nextInner = isLast ? "결과 보기" : `다음${chevron}`;
          main = `<div class="mf-q">
            <h2 class="mf-prompt" tabindex="-1">${session.cursor + 1}. ${escapeHtml(title)}</h2>
            <p class="mf-hint">${hint}</p>
            <div class="mf-options" role="${single ? "radiogroup" : "group"}">${choiceButtons(current)}</div>
            ${errorText ? `<p class="mf-inline-error" role="alert">${escapeHtml(errorText)}</p>` : ""}
            <div class="mf-foot">
              ${prevBtn}
              <button type="button" class="mf-next" data-mf-next ${isValid() ? "" : "disabled"}>${nextInner}</button>
            </div>
          </div>`;
        }
      }
      shell.innerHTML = `<button type="button" class="admit-detail-backdrop" data-mf-close aria-label="닫기"></button>
        <div class="admit-detail-dialog major-detail-dialog mf-dialog" role="dialog" aria-modal="true" aria-labelledby="mf-title">
          <div class="admit-detail-head">
            <div class="admit-detail-title-wrap">
              <p class="admit-detail-crumb" id="mf-title">${session.phase === "result" ? "추천 전공 TOP3" : "전공 찾기"}</p>
            </div>
            <div class="mf-head-actions">${pdfBtn}${closeBtn}</div>
            ${progressHtml()}
          </div>
          <div class="mf-dialog-body${session.phase === "result" ? " is-result" : ""}">${main}${session.phase === "result" ? "" : picksHtml()}</div>
        </div>`;
      const buttons = [...shell.querySelectorAll("[data-mf-choice]")];
      if (focusIndex >= 0) buttons[focusIndex]?.focus();
      else shell.querySelector(".mf-prompt")?.focus({ preventScroll: true });
    }

    function onClick(event) {
      if (!shell.contains(event.target)) return;
      const choice = event.target.closest("[data-mf-choice]");
      if (choice) {
        const current = question();
        const found = current && current.choices.find((item) => item.id === choice.dataset.mfChoice);
        const buttons = [...shell.querySelectorAll("[data-mf-choice]")];
        focusIndex = buttons.indexOf(choice);
        toggle(found);
        draw();
        return;
      }
      if (event.target.closest("[data-mf-pdf]")) {
        savePdf();
        return;
      }
      if (event.target.closest("[data-mf-close]")) {
        close();
        return;
      }
      if (event.target.closest("[data-mf-retry]")) {
        root.location.reload();
        return;
      }
      if (event.target.closest("[data-mf-next]")) {
        goNext();
        return;
      }
      if (event.target.closest("[data-mf-prev]")) {
        goPrev();
        return;
      }
      if (event.target.closest("[data-mf-restart]")) {
        restart();
        return;
      }
      if (event.target.closest("[data-mf-edit]")) {
        session.phase = "question";
        if (dynamicSession()) session.cursor = Math.max(0, (session.steps || []).length - 1);
        loadSelection();
        result = null;
        focusIndex = -1;
        draw();
        return;
      }
      const detail = event.target.closest("[data-mf-detail]");
      if (detail && root.Guide && root.Guide.openMajorDetailFromFinder) {
        root.Guide.openMajorDetailFromFinder(detail.dataset.mfDetail, {
          track: detail.dataset.mfTrack,
          subtrack: detail.dataset.mfMid,
        });
      }
    }

    function onKey(event) {
      if (shell.hidden) return;
      const detail = document.getElementById("major-detail-root");
      if (event.key === "Escape") {
        if (detail && !detail.hidden) return;
        close();
        return;
      }
      if (session.phase === "result" && (event.key === "Enter" || event.key === " ")) {
        const card = event.target.closest("[data-mf-detail]");
        if (!card || !root.Guide || !root.Guide.openMajorDetailFromFinder) return;
        event.preventDefault();
        root.Guide.openMajorDetailFromFinder(card.dataset.mfDetail, {
          track: card.dataset.mfTrack,
          subtrack: card.dataset.mfMid,
        });
        return;
      }
      if (session.phase !== "question") return;
      const buttons = [...shell.querySelectorAll("[data-mf-choice]")];
      const currentIndex = buttons.indexOf(document.activeElement);
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        focusIndex = Math.min(buttons.length - 1, currentIndex < 0 ? 0 : currentIndex + 1);
        buttons[focusIndex]?.focus();
        return;
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        focusIndex = Math.max(0, currentIndex < 0 ? 0 : currentIndex - 1);
        buttons[focusIndex]?.focus();
        return;
      }
      if (/^[1-9]$/.test(event.key)) {
        const index = Number(event.key) - 1;
        const button = buttons[index];
        if (!button) return;
        event.preventDefault();
        focusIndex = index;
        const current = question();
        const found = current.choices.find((item) => item.id === button.dataset.mfChoice);
        toggle(found);
        draw();
      }
    }

    shell._ctrl = { onClick: onClick, onKey: onKey };
    loadSelection();
    draw();
  }

  root.MajorFinderUI = { open: open };
})(typeof globalThis !== "undefined" ? globalThis : this);
