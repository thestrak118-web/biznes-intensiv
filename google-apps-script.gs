/**
 * BIZNES INTENSIV — arizalarni qabul qiluvchi backend
 *
 * Nima qiladi:
 *   1) Saytdan kelgan arizani Google Sheets ga qator qilib yozadi
 *   2) So'ng Telegram orqali sizga xabar yuboradi
 *
 * O'RNATISH:
 *   1. Google Sheets da yangi jadval oching.
 *   2. Kengaytmalar (Extensions) → Apps Script → shu kodni joylashtiring.
 *   3. Quyidagi 2 qiymatni to'ldiring (bot @BotFather dan, chat_id @userinfobot dan).
 *   4. Deploy → New deployment → type: Web app
 *        Execute as: Me
 *        Who has access: Anyone
 *   5. Chiqqan /exec havolasini site/config.js dagi SHEET_URL ga qo'ying.
 */

var TELEGRAM_BOT_TOKEN = '';   // masalan: '8123456789:AAG...'
var TELEGRAM_CHAT_ID   = '';   // masalan: '123456789' yoki guruh uchun '-1001234567890'

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Sana', 'Ism', 'Telefon', 'Holati', 'Investitsiya', 'Sahifa', 'Manba']);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      d.name || '',
      "'" + (d.phone || ''),   // raqam matn bo'lib qolishi uchun
      d.status || '',
      d.invest || '',
      d.page || '',
      d.ref || ''
    ]);

    notifyTelegram(d);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function notifyTelegram(d) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  var text =
    '🔥 <b>Yangi ariza — Biznes intensiv</b>\n\n' +
    '👤 <b>Ism:</b> ' + esc(d.name) + '\n' +
    '📞 <b>Telefon:</b> ' + esc(d.phone) + '\n' +
    '📊 <b>Holati:</b> ' + esc(d.status) + '\n' +
    '💰 <b>Investitsiya:</b> ' + esc(d.invest) + '\n' +
    '🕒 ' + Utilities.formatDate(new Date(), 'Asia/Tashkent', 'dd.MM.yyyy HH:mm');

  UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
    method: 'post',
    payload: { chat_id: TELEGRAM_CHAT_ID, text: text, parse_mode: 'HTML' },
    muteHttpExceptions: true
  });
}

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Deploy qilishdan oldin shu funksiyani bir marta ishga tushirib tekshiring */
function test_() {
  doPost({ postData: { contents: JSON.stringify({
    name: 'Test Testov', phone: '+998 90 123 45 67',
    status: 'Biznesim bor', invest: 'Kapitalim bor', page: 'test', ref: ''
  })}});
}
