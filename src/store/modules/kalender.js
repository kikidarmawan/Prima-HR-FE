
export function generateCalendar(month = null, year = null) {
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = month ?? now.getMonth(); // 0-11

  // cari jumlah hari di bulan ini
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const result = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d);
    const weekday = date.toLocaleDateString("id-ID", { weekday: "short" }); // Sen, Sel, Rab...
    result.push({
      day: d.toString().padStart(2, "0"),
      weekday,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      raw: { tanggal: `${y}-${(m + 1).toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}` }
    });
  }

  return result;
}
