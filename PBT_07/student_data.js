const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let stats = { Gioi: 0, Kha: 0, TB: 0, Yeu: 0 };
let maxScore = -1, minScore = 11;
let bestStudent = "", worstStudent = "";
let sumMath = 0, sumPhysics = 0, sumCS = 0;
let maleTotal = 0, maleCount = 0, femaleTotal = 0, femaleCount = 0;

console.log("| STT | Tên      | TB   | Xếp loại    |");
console.log("|-----|----------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    let s = students[i];
    let avg = (s.math * 0.4) + (s.physics * 0.3) + (s.cs * 0.3);
    avg = Math.round(avg * 10) / 10; // Làm tròn 1 chữ số thập phân

    let rank = "";
    if (avg >= 8.0) { rank = "Giỏi"; stats.Gioi++; }
    else if (avg >= 6.5) { rank = "Khá"; stats.Kha++; }
    else if (avg >= 5.0) { rank = "Trung bình"; stats.TB++; }
    else { rank = "Yếu"; stats.Yeu++; }

    // Tìm Max, Min
    if (avg > maxScore) { maxScore = avg; bestStudent = s.name; }
    if (avg < minScore) { minScore = avg; worstStudent = s.name; }

    // Cộng dồn điểm để tính TB môn
    sumMath += s.math;
    sumPhysics += s.physics;
    sumCS += s.cs;

    // Cộng dồn điểm theo giới tính
    if (s.gender === "M") { maleTotal += avg; maleCount++; } 
    else { femaleTotal += avg; femaleCount++; }

    // Căn lề khi in bảng
    let stt = String(i + 1).padEnd(3, " ");
    let name = s.name.padEnd(8, " ");
    let avgStr = String(avg.toFixed(1)).padEnd(4, " ");
    let rankStr = rank.padEnd(11, " ");

    console.log(`| ${stt} | ${name} | ${avgStr} | ${rankStr} |`);
}

console.log("\n--- THỐNG KÊ ---");
console.log(`1. Số lượng: Giỏi: ${stats.Gioi}, Khá: ${stats.Kha}, TB: ${stats.TB}, Yếu: ${stats.Yeu}`);
console.log(`2. Cao điểm nhất: ${bestStudent} (${maxScore}) | Thấp điểm nhất: ${worstStudent} (${minScore})`);
console.log(`3. Điểm TB toàn lớp: Toán: ${(sumMath/students.length).toFixed(1)} | Lý: ${(sumPhysics/students.length).toFixed(1)} | CS: ${(sumCS/students.length).toFixed(1)}`);
console.log(`4. Bonus: TB học sinh Nam: ${(maleTotal/maleCount).toFixed(1)} | TB học sinh Nữ: ${(femaleTotal/femaleCount).toFixed(1)}`);