import './styles.css';

const $ = id => document.getElementById(id);
const pageIds = ['homePage', 'learnPage', 'supportPage', 'profilePage', 'questPage', 'carePage'];
function showPage(id) {
  $('loginPage').classList.add('hidden');
  pageIds.forEach(page => $(page).classList.toggle('hidden', page !== id));
  window.scrollTo(0, 0);
}
function showLogin() {
  pageIds.forEach(id => $(id).classList.add('hidden'));
  $('loginPage').classList.remove('hidden');
}
function toast(message) {
  $('toast').textContent = message;
  $('toast').classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => $('toast').classList.remove('show'), 2200);
}
function openModal(id) {
  $(id).classList.add('active');
}
function closeModal(node) {
  node.classList.remove('active');
}
$('loginForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = $('nickname').value.trim();
  if (!name) return;
  $('helloName').textContent = 'สวัสดี, ' + name + '!';
  $('profileName').textContent = name;
  showPage('homePage');
});
document
  .querySelectorAll('[data-modal]')
  .forEach(button =>
    button.addEventListener('click', () => openModal(button.dataset.modal))
  );
document
  .querySelectorAll('[data-close]')
  .forEach(button =>
    button.addEventListener('click', () => closeModal(button.closest('.modal')))
  );
document
  .querySelectorAll('.close')
  .forEach(button =>
    button.addEventListener('click', () => closeModal(button.closest('.modal')))
  );
document.querySelectorAll('.modal').forEach(modal =>
  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal(modal);
  })
);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape')
    document.querySelectorAll('.modal.active').forEach(closeModal);
});
document.querySelectorAll('[data-page]').forEach(button =>
  button.addEventListener('click', () => {
    document
      .querySelectorAll('.nav button')
      .forEach(item => item.classList.toggle('active', item === button));
    showPage(button.dataset.page);
  })
);
document
  .querySelectorAll('[data-back]')
  .forEach(button =>
    button.addEventListener('click', () => showPage('homePage'))
  );
$('checkinOpen').addEventListener('click', () => openModal('checkinModal'));
$('checkinNav').addEventListener('click', () => openModal('checkinModal'));
$('rewardOpen').addEventListener('click', () => openModal('rewardModal'));
$('supplySubmit').addEventListener('click', () => {
  $('supplyFeedback').textContent =
    'เลือก ' +
    $('supplyItem').value +
    ' แล้ว กรุณาสอบถามจุดบริการ รพ.สต. หรือห้องพยาบาลโดยตรง รุ่นทดลองนี้ยังไม่รับคำขอจริง';
});
$('periodSubmit').addEventListener('click', () => {
  const value = $('periodDate').value;
  if (!value) {
    $('periodFeedback').textContent = 'กรุณาเลือกวันที่ก่อน';
    return;
  }
  const date = new Date(value + 'T12:00:00');
  if (date > new Date()) {
    $('periodFeedback').textContent = 'วันที่ไม่ควรเป็นวันในอนาคต';
    return;
  }
  $('periodFeedback').textContent =
    'บันทึกวันที่ ' +
    date.toLocaleDateString('th-TH') +
    ' ไว้ในหน้านี้แล้ว เมื่อปิดหรือรีเฟรช ข้อมูลจะไม่คงอยู่';
});
$('consultSubmit').addEventListener('click', () => {
  $('consultFeedback').textContent =
    'หัวข้อ: ' +
    $('consultTopic').value +
    ' — จดคำถามไว้แล้วติดต่อพยาบาลหรือสถานพยาบาลโดยตรง แอปนี้ไม่ได้ส่งคิว';
});
const moodText = {
  เหนื่อย:
    'วันนี้อาจหนักมากก็ได้ ลองพักสัก 5 นาที ดื่มน้ำ และเลือกทำแค่เรื่องเล็กที่สุดก่อนนะ',
  เศร้า: 'ไม่จำเป็นต้องรีบหายเศร้า ลองทักคนที่ไว้ใจและบอกว่าอยากมีคนอยู่ข้าง ๆ',
  กังวล:
    'ลองหายใจเข้า 4 วินาที ออก 6 วินาที ทำซ้ำ 5 รอบ แล้วแยกสิ่งที่ควบคุมได้กับไม่ได้',
  โอเค: 'ดีใจที่วันนี้พอไหว อย่าลืมชื่นชมตัวเองกับสิ่งเล็ก ๆ ที่ทำได้ด้วยนะ',
};
document.querySelectorAll('[data-mood]').forEach(button =>
  button.addEventListener('click', () => {
    $('moodFeedback').textContent = moodText[button.dataset.mood];
  })
);
const rewards = [
  'คุณมีคุณค่า แม้ในวันที่ทำอะไรไม่สำเร็จเลยก็ตาม',
  'การขอความช่วยเหลือคือความกล้าหาญอย่างหนึ่ง',
  'ค่อย ๆ ไปก็ยังถือว่ากำลังก้าวไปข้างหน้า',
  'คุณสมควรได้รับความรัก ความเคารพ และความปลอดภัย',
];
$('newReward').addEventListener('click', () => {
  $('rewardMessage').textContent =
    rewards[Math.floor(Math.random() * rewards.length)];
});
$('throwBtn').addEventListener('click', () => {
  if (!$('whisperText').value.trim()) {
    toast('พิมพ์ข้อความก่อนนะ');
    return;
  }
  $('whisperText').value = '';
  $('voidFeedback').textContent = 'ปล่อยวางแล้ว ข้อความถูกล้างจากหน้าจอ';
  toast('ส่งความรู้สึกลงหลุมดำแล้ว');
});
$('whisperText').addEventListener('keydown', event => {
  if (event.key === 'Enter') $('throwBtn').click();
});
$('logoutBtn').addEventListener('click', () => {
  $('nickname').value = '';
  showLogin();
});
$('shareOpen').addEventListener('click', () => {
  $('shareUrl').value = location.href;
  $('shareQr').src =
    'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' +
    encodeURIComponent(location.href);
  openModal('shareModal');
});
$('copyShare').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    toast('คัดลอกลิงก์แล้ว');
  } catch {
    $('shareUrl').select();
    toast('เลือก URL แล้ว กดคัดลอกได้เลย');
  }
});
$('nativeShare').addEventListener('click', async () => {
  if (!navigator.share) {
    toast('อุปกรณ์นี้ไม่รองรับเมนูแชร์');
    return;
  }
  try {
    await navigator.share({
      title: 'TeenShield',
      text: 'พื้นที่เรียนรู้สุขภาพวัยรุ่น',
      url: location.href,
    });
  } catch (error) {
    if (error.name !== 'AbortError') toast('ไม่สามารถเปิดเมนูแชร์ได้');
  }
});
$('sosOpen').addEventListener('click', () =>
  $('sosScreen').classList.remove('hidden')
);
$('exitSos').addEventListener('click', () =>
  $('sosScreen').classList.add('hidden')
);
let display = '0',
  stored = null,
  operation = null,
  reset = false;
function drawCalc() {
  $('calcDisplay').textContent =
    display.length > 10 ? Number(display).toPrecision(7) : display;
}
document.querySelectorAll('[data-calc]').forEach(button =>
  button.addEventListener('click', () => {
    const key = button.dataset.calc;
    if (/^\d$/.test(key)) {
      display = reset || display === '0' ? key : display + key;
      reset = false;
    } else if (key === '.') {
      if (reset) {
        display = '0';
        reset = false;
      }
      if (!display.includes('.')) display += '.';
    } else if (key === 'AC') {
      display = '0';
      stored = null;
      operation = null;
      reset = false;
    } else if (key === 'sign') display = String(Number(display) * -1);
    else if (key === '%') display = String(Number(display) / 100);
    else if (['+', '-', '*', '/'].includes(key)) {
      stored = Number(display);
      operation = key;
      reset = true;
    } else if (key === '=' && operation && stored !== null) {
      const n = Number(display);
      const answer =
        operation === '+'
          ? stored + n
          : operation === '-'
            ? stored - n
            : operation === '*'
              ? stored * n
              : n === 0
                ? NaN
                : stored / n;
      display = Number.isFinite(answer)
        ? String(Number(answer.toPrecision(10)))
        : 'Error';
      stored = null;
      operation = null;
      reset = true;
    }
    drawCalc();
  })
);

const newPageIds = ['questPage', 'carePage'];
pageIds.push(...newPageIds);

document.querySelectorAll('[data-open-page]').forEach(button => {
  button.addEventListener('click', () => showPage(button.dataset.openPage));
});

let pulseMood = '';
document.querySelectorAll('[data-pulse-mood]').forEach(button => {
  button.addEventListener('click', () => {
    pulseMood = button.dataset.pulseMood;
    document.querySelectorAll('[data-pulse-mood]').forEach(item => item.classList.toggle('selected', item === button));
  });
});
$('pulseSubmit').addEventListener('click', () => {
  const safety = $('pulseSafety').value;
  const stress = Number($('pulseStress').value);
  if (!pulseMood) {
    $('pulseFeedback').textContent = 'เลือกความรู้สึกของตัวเองก่อนนะ หรือข้ามการเช็กอินได้เสมอ';
    return;
  }
  let message = 'ขอบคุณที่เช็กอินนะ ตอนนี้คุณรู้สึก ' + pulseMood + ' และให้คะแนนความตึงเครียดตัวเอง ' + stress + ' จาก 5 ';
  if (safety === 'unsafe' || safety === 'selfharm') {
    message += 'สิ่งสำคัญที่สุดตอนนี้คือความปลอดภัย กรุณาไปอยู่กับผู้ใหญ่ที่ไว้ใจหรือพื้นที่ปลอดภัย อย่าอยู่ลำพัง หากเสี่ยงทำร้ายตัวเองหรือบาดเจ็บ ให้โทร 1669 หรือขอให้คนใกล้ตัวพาไปโรงพยาบาล โทร 1323 เพื่อปรึกษาสุขภาพใจ หรือ 1387 หากอายุไม่เกิน 18 ปี';
    $('pulseFeedback').classList.add('urgent-result');
  } else if (safety === 'unsure') {
    message += 'ถ้ายังไม่แน่ใจ ลองขยับไปอยู่ใกล้คนที่ไว้ใจ และบอกสั้น ๆ ว่า “ตอนนี้ฉันอยากมีคนอยู่ด้วย”';
    $('pulseFeedback').classList.remove('urgent-result');
  } else if (stress >= 4) {
    message += 'ลองพักจากสิ่งที่กดดัน ดื่มน้ำ หายใจช้า ๆ และเลือกคุยกับคนที่ไว้ใจสักคน คุณไม่จำเป็นต้องจัดการทุกอย่างคนเดียว';
    $('pulseFeedback').classList.remove('urgent-result');
  } else {
    message += 'เลือกทำสิ่งเล็ก ๆ ที่ช่วยให้วันนี้เบาขึ้นได้ เช่น พักสั้น ๆ เดินยืดเส้น หรือทักคนที่ทำให้สบายใจ';
    $('pulseFeedback').classList.remove('urgent-result');
  }
  $('pulseFeedback').textContent = message;
});

$('safeBuild').addEventListener('click', () => {
  const topic = $('safeTopic').value;
  const urgency = $('safeUrgency').value;
  let message = '';
  if (urgency === 'now') {
    message = 'ตอนนี้ฉันรู้สึกไม่ปลอดภัยและต้องการความช่วยเหลือทันที กรุณาอยู่กับฉัน พาฉันไปยังที่ปลอดภัย และช่วยติดต่อผู้ใหญ่หรือหน่วยงานที่ช่วยได้';
  } else if (urgency === 'today') {
    message = 'ฉันอยากคุยเรื่อง ' + topic + ' ภายในวันนี้ ช่วยรับฟังโดยไม่ตัดสิน และช่วยฉันคิดว่าจะทำอย่างไรต่อไปได้ไหม';
  } else {
    message = 'ฉันกำลังหาข้อมูลเกี่ยวกับ ' + topic + ' ตอนนี้ยังไม่พร้อมเล่ารายละเอียด แต่อยากรู้ว่ามีใครหรือบริการไหนที่ฉันคุยได้บ้าง';
  }
  $('safeResult').textContent = message;
  $('safeResult').classList.remove('hidden');
  $('safeCopy').classList.remove('hidden');
  if (urgency === 'now') {
    $('safeResult').classList.add('urgent-result');
    $('safeResult').textContent += ' หากมีอันตรายเร่งด่วน โทร 191; หากบาดเจ็บหรือฉุกเฉินทางการแพทย์ โทร 1669; หากต้องการความช่วยเหลือด้านใจ โทร 1323; เด็กและเยาวชนอายุไม่เกิน 18 ปี โทร 1387';
  } else {
    $('safeResult').classList.remove('urgent-result');
  }
});
$('safeCopy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('safeResult').textContent);
    toast('คัดลอกข้อความเริ่มคุยแล้ว');
  } catch {
    toast('อุปกรณ์ไม่อนุญาตให้คัดลอก กรุณาเลือกข้อความด้วยตนเอง');
  }
});

$('circleBuild').addEventListener('click', () => {
  $('circleMessage').textContent = '“' + $('circleRole').value + ' ฉันมีเรื่องอยากคุยด้วย คือ ' + $('circleTopic').value + ' ตอนนี้อาจยังเล่าได้ไม่หมด แต่อยากให้ช่วยรับฟังก่อน และช่วยคิดว่าจะทำอย่างไรต่อไป”';
});
$('circleCopy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('circleMessage').textContent);
    toast('คัดลอกประโยคแล้ว');
  } catch {
    toast('อุปกรณ์ไม่อนุญาตให้คัดลอก กรุณาเลือกข้อความด้วยตนเอง');
  }
});

const quests = [
  {
    category: 'เพื่อนและการกลั่นแกล้ง',
    title: 'ในกลุ่มแชตมีคนล้อรูปร่างเพื่อนและส่งต่อภาพ',
    prompt: 'คุณเห็นเพื่อนถูกล้อในกลุ่มแชต ทุกคนกำลังส่งต่อภาพและหัวเราะ คุณจะทำอย่างไร?',
    choices: [
      { text: 'ส่งต่อให้เพื่อนกลุ่มอื่นดู', feedback: 'การส่งต่อเพิ่มการทำร้ายและขยายวงความเสียหาย ทางเลือกที่ปลอดภัยกว่าคือหยุดส่งต่อและไม่ร่วมซ้ำเติม' },
      { text: 'หยุดส่งต่อ เก็บหลักฐานอย่างระมัดระวัง และขอผู้ใหญ่ช่วย', feedback: 'เป็นทางเลือกที่คำนึงถึงความปลอดภัย หยุดการขยายเรื่อง เก็บหลักฐานเท่าที่จำเป็นโดยไม่เผยแพร่ซ้ำ และให้ครูหรือผู้ดูแลช่วยจัดการ' },
      { text: 'ตอบโต้ด้วยการประจานคนที่เริ่ม', feedback: 'การตอบโต้สาธารณะอาจทำให้เหตุบานปลาย ลองใช้ช่องทางรายงานและขอผู้ใหญ่ช่วยคุ้มครองผู้ถูกกระทำ' }
    ]
  },
  {
    category: 'ความปลอดภัยออนไลน์',
    title: 'คนรู้จักออนไลน์ขู่เผยแพร่ภาพส่วนตัว',
    prompt: 'มีคนขู่ว่าจะเผยแพร่ภาพส่วนตัวถ้าคุณไม่ส่งเงินหรือส่งภาพเพิ่ม ควรทำอย่างไร?',
    choices: [
      { text: 'ยอมทำตามเพื่อให้เรื่องจบ', feedback: 'การยอมทำตามไม่ได้รับประกันว่าอีกฝ่ายจะหยุด อย่าส่งภาพหรือเงินเพิ่ม หยุดการติดต่อและขอผู้ใหญ่ที่ไว้ใจช่วยทันที' },
      { text: 'บันทึกหลักฐานที่จำเป็น ไม่ส่งต่อภาพ และขอความช่วยเหลือ', feedback: 'ทางเลือกนี้ช่วยลดการเผยแพร่ซ้ำ บันทึกข้อความ/บัญชีที่เกี่ยวข้องอย่างปลอดภัย บล็อกและรายงานแพลตฟอร์ม พร้อมขอผู้ใหญ่หรือหน่วยงานที่ช่วยได้' },
      { text: 'โพสต์ภาพและชื่อเขาให้ทุกคนรู้', feedback: 'การเปิดเผยข้อมูลอาจกระทบความเป็นส่วนตัวและทำให้เหตุซับซ้อนขึ้น ควรเก็บหลักฐานและรายงานผ่านช่องทางที่เหมาะสม' }
    ]
  },
  {
    category: 'แรงกดดันจากเพื่อน',
    title: 'เพื่อนชวนลองบุหรี่ไฟฟ้าหรือดื่มแอลกอฮอล์',
    prompt: 'เพื่อนบอกว่า “ลองครั้งเดียวไม่เป็นไร” และกลัวว่าจะถูกมองว่าไม่เข้ากลุ่ม คุณจะตอบอย่างไร?',
    choices: [
      { text: 'ปฏิเสธสั้น ๆ แล้วชวนทำกิจกรรมอื่น', feedback: 'การปฏิเสธชัดเจนและเปลี่ยนกิจกรรมช่วยลดแรงกดดัน คุณไม่จำเป็นต้องพิสูจน์ตัวเองด้วยการลองสิ่งที่ไม่ต้องการ' },
      { text: 'ลองเพื่อไม่ให้เพื่อนล้อ', feedback: 'การทำตามแรงกดดันไม่ใช่เงื่อนไขของมิตรภาพ คุณมีสิทธิ์ปฏิเสธและเดินออกจากสถานการณ์ได้' },
      { text: 'อยู่ต่อทั้งที่รู้สึกไม่สบายใจ', feedback: 'ลองออกจากจุดเสี่ยงและหาคนที่ทำให้รู้สึกปลอดภัย หากถูกกดดันต่อเนื่องควรปรึกษาผู้ใหญ่ที่ไว้ใจ' }
    ]
  },
  {
    category: 'ความสัมพันธ์และความยินยอม',
    title: 'คนรักกดดันให้ส่งภาพหรือทำสิ่งที่ไม่พร้อม',
    prompt: 'คนที่คุณคบด้วยบอกว่า “ถ้ารักกันต้องยอม” ทั้งที่คุณไม่สบายใจ คุณมีทางเลือกอะไร?',
    choices: [
      { text: 'ยอมเพราะกลัวเสียความสัมพันธ์', feedback: 'ความรักไม่ควรมีเงื่อนไขบังคับ คุณมีสิทธิ์ปฏิเสธและเปลี่ยนใจได้เสมอ ความยินยอมต้องสมัครใจ' },
      { text: 'บอกขอบเขตของตัวเองและขอให้หยุดกดดัน', feedback: 'เป็นการสื่อสารขอบเขตที่ชัดเจน หากอีกฝ่ายไม่เคารพหรือทำให้กลัว ให้ถอยไปยังที่ปลอดภัยและขอคนที่ไว้ใจช่วย' },
      { text: 'เก็บเรื่องนี้ไว้คนเดียว', feedback: 'คุณไม่จำเป็นต้องจัดการลำพัง เลือกผู้ใหญ่ที่ไว้ใจหรือบุคลากรสุขภาพที่รับฟังโดยไม่ตัดสินได้' }
    ]
  },
  {
    category: 'ความเครียดและครอบครัว',
    title: 'รู้สึกกดดันจากการเรียนและไม่กล้าคุยที่บ้าน',
    prompt: 'ช่วงนี้คะแนนตกและกลัวถูกตำหนิ คุณอยากบอกผู้ใหญ่แต่ไม่รู้จะเริ่มอย่างไร?',
    choices: [
      { text: 'รอจนทุกอย่างแย่ลงก่อน', feedback: 'การขอความช่วยเหลือเร็วขึ้นช่วยให้มีคนร่วมคิดทางเลือก ลองเริ่มจากประโยคสั้น ๆ ว่า “ช่วงนี้ฉันไม่ค่อยไหว อยากให้ช่วยฟังก่อน”' },
      { text: 'เลือกคนที่ไว้ใจและบอกสิ่งที่ต้องการทีละนิด', feedback: 'ดีมาก คุณเลือกได้ว่าจะเล่าแค่ไหนและขอความช่วยเหลือแบบใด เช่น ขอให้รับฟัง ช่วยจัดเวลา หรือประสานครูแนะแนว' },
      { text: 'ตัดสินตัวเองว่าไม่เก่งพอ', feedback: 'คะแนนไม่ได้กำหนดคุณค่าของคน ลองแยกปัญหาเป็นเรื่องเล็ก ๆ และคุยกับคนที่ช่วยวางแผนได้' }
    ]
  }
];
let questIndex = 0;
let questAnswered = false;
function renderQuest() {
  const quest = quests[questIndex];
  $('questNumber').textContent = 'ภารกิจ ' + (questIndex + 1) + ' / ' + quests.length;
  $('questCategory').textContent = quest.category;
  $('questTitle').textContent = quest.title;
  $('questPrompt').textContent = quest.prompt;
  $('questProgress').style.width = ((questIndex + 1) / quests.length * 100) + '%';
  $('questChoices').replaceChildren();
  $('questFeedback').textContent = 'เลือกคำตอบที่คุณคิดว่าเหมาะ แล้วอ่านเหตุผลประกอบ';
  questAnswered = false;
  $('questNext').disabled = true;
  $('questNext').textContent = questIndex === quests.length - 1 ? 'จบภารกิจ' : 'สถานการณ์ถัดไป →';
  quest.choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'quest-choice';
    button.type = 'button';
    button.textContent = choice.text;
    button.addEventListener('click', () => {
      $('questChoices').querySelectorAll('button').forEach(item => item.classList.toggle('selected', item === button));
      $('questFeedback').textContent = choice.feedback;
      questAnswered = true;
      $('questNext').disabled = false;
    });
    $('questChoices').appendChild(button);
  });
}
$('questRestart').addEventListener('click', () => {
  questIndex = 0;
  renderQuest();
  toast('เริ่มภารกิจชุดใหม่แล้ว');
});
$('questNext').addEventListener('click', () => {
  if (!questAnswered) return;
  if (questIndex < quests.length - 1) {
    questIndex += 1;
    renderQuest();
  } else {
    $('questFeedback').textContent = 'คุณจบ LifeQuest แล้ว ขอบคุณที่ลองฝึกคิดและเคารพความปลอดภัยของตัวเองกับผู้อื่น';
    $('questNext').disabled = true;
  }
});
renderQuest();

document.querySelectorAll('[data-care-role]').forEach(button => {
  button.addEventListener('click', () => {
    const role = button.dataset.careRole;
    document.querySelectorAll('[data-care-role]').forEach(item => item.classList.toggle('active', item === button));
    document.querySelectorAll('[data-care-panel]').forEach(panel => panel.classList.toggle('hidden', panel.dataset.carePanel !== role));
  });
});

const familyScripts = {
  stress: '“ช่วงนี้ฉันสังเกตว่าเธออาจเหนื่อยกับการเรียน อยากเล่าไหมว่าอะไรหนักที่สุด? ฉันจะฟังก่อน ไม่รีบตัดสิน เราค่อยคิดทางเลือกด้วยกัน”',
  online: '“ฉันอยากเข้าใจโลกออนไลน์ของเธอมากขึ้น มีอะไรที่ทำให้ไม่สบายใจหรือรู้สึกไม่ปลอดภัยไหม? เรามาช่วยกันหาวิธีป้องกัน โดยไม่ต้องเปิดเผยทุกอย่างในทันที”',
  relationship: '“เธอมีสิทธิ์กำหนดขอบเขตของตัวเองนะ ถ้ามีใครทำให้ไม่สบายใจหรือกดดัน เธอคุยกับฉันได้ เราจะหาทางช่วยกันโดยไม่กล่าวโทษ”',
  health: '“ถ้ามีเรื่องสุขภาพที่อยากถาม ไม่ว่าจะเป็นร่างกาย ประจำเดือน หรือเรื่องเพศ เราหาคนให้คำแนะนำที่ถูกต้องและเคารพความเป็นส่วนตัวไปด้วยกันได้”',
  conflict: '“ฉันอยากเข้าใจว่าเรื่องไหนทำให้เราไม่สบายใจกันมากที่สุด เธออยากให้ฉันฟังหรือช่วยคิดทางออกแบบไหนก่อน?”'
};
$('familyBuild').addEventListener('click', () => {
  $('familyResult').textContent = familyScripts[$('familyTopic').value] + ' ลองถามต่อว่า “มีอะไรที่อยากให้ฉันช่วยตอนนี้ไหม?”';
});

const schoolPlans = {
  bullying: ['สัปดาห์ 1 · สำรวจช่องทางแจ้งเหตุที่เป็นมิตรและสื่อสารกติกาไม่กลั่นแกล้ง', 'สัปดาห์ 2 · ฝึกครู/แกนนำนักเรียนเรื่องหยุดการซ้ำเติมและรับฟังผู้ได้รับผลกระทบ', 'สัปดาห์ 3 · จัดช่องทางปรึกษาส่วนตัวและแนวทางคุ้มครองเมื่อเกิดเหตุ', 'สัปดาห์ 4 · ทบทวนการช่วยเหลือและติดตามสภาพแวดล้อมโดยไม่เปิดเผยตัวนักเรียน'],
  mental: ['สัปดาห์ 1 · สร้างกิจกรรมดูแลใจและสื่อสารว่าขอความช่วยเหลือได้', 'สัปดาห์ 2 · พัฒนาทักษะครูในการรับฟังและสังเกตสัญญาณโดยไม่วินิจฉัย', 'สัปดาห์ 3 · ระบุผู้รับผิดชอบและช่องทางส่งต่อบุคลากรสุขภาพ', 'สัปดาห์ 4 · ติดตามการเข้าถึงบริการและทบทวนบทเรียนจากข้อมูลภาพรวม'],
  online: ['สัปดาห์ 1 · จัดทำกติกาดิจิทัลร่วมกับนักเรียน', 'สัปดาห์ 2 · สอนการตั้งค่าความเป็นส่วนตัว การเก็บหลักฐาน และการรายงาน', 'สัปดาห์ 3 · กำหนดผู้รับแจ้งเหตุและขั้นตอนช่วยเหลือโดยไม่เผยแพร่ภาพซ้ำ', 'สัปดาห์ 4 · ประเมินความเข้าใจและปรับมาตรการจากข้อเสนอของนักเรียน'],
  sexual: ['สัปดาห์ 1 · ทบทวนเนื้อหาความสัมพันธ์ ความยินยอม และการเคารพขอบเขต', 'สัปดาห์ 2 · จัดการเรียนรู้สุขภาพทางเพศตามวัยและแหล่งข้อมูลที่เชื่อถือได้', 'สัปดาห์ 3 · เชื่อมช่องทางปรึกษาบุคลากรสุขภาพที่เป็นมิตรกับวัยรุ่น', 'สัปดาห์ 4 · ทบทวนการเข้าถึงบริการและอุปสรรคโดยรักษาความเป็นส่วนตัว'],
  substance: ['สัปดาห์ 1 · สำรวจความรู้และแรงกดดันจากเพื่อนโดยไม่ลงโทษผู้ตอบ', 'สัปดาห์ 2 · ฝึกทักษะปฏิเสธและการรับมือสถานการณ์เสี่ยง', 'สัปดาห์ 3 · เชื่อมการให้คำปรึกษากับบุคลากรสุขภาพและครอบครัวตามความเหมาะสม', 'สัปดาห์ 4 · ทบทวนสภาพแวดล้อมปลอดบุหรี่/สารเสพติดและการสนับสนุนต่อเนื่อง'],
  attendance: ['สัปดาห์ 1 · ฟังเหตุผลที่ทำให้มาเรียนไม่ต่อเนื่องโดยไม่กล่าวโทษ', 'สัปดาห์ 2 · ประสานครูที่ปรึกษาและครอบครัวเพื่อหาปัจจัยอุปสรรค', 'สัปดาห์ 3 · วางแผนช่วยเหลือรายบุคคลโดยจำกัดผู้เข้าถึงข้อมูลเท่าที่จำเป็น', 'สัปดาห์ 4 · ติดตามการกลับมาเรียนและปรับความช่วยเหลือตามเสียงของนักเรียน']
};
$('schoolPlanBtn').addEventListener('click', () => {
  const plan = schoolPlans[$('schoolFocus').value];
  $('schoolPlanOutput').textContent = 'แผนตัวอย่าง 4 สัปดาห์\n' + plan.join('\n') + '\n\nผู้รับผิดชอบควรได้รับมอบหมายก่อนเริ่มดำเนินงาน แผนนี้เป็นแม่แบบ ไม่ใช่การแจ้งเหตุหรือส่งงานอัตโนมัติ';
});
