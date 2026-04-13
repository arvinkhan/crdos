async function fetchResult(studentId) {
    return new Promise((resolve) => {
        // Simulate main server generation cost
        setTimeout(() => {
            const mathBase = studentId.replace(/\D/g, '') || '0';
            const seed = parseInt(mathBase.slice(-2)) || 50;
            
            const mathScore = Math.min(100, seed + 30);
            const csScore = Math.min(100, seed + 40);
            const phyScore = Math.min(100, seed + 20);
            const chemScore = Math.min(100, seed + 15);
            
            const total = mathScore + csScore + phyScore + chemScore;
            const percentage = (total / 400 * 100).toFixed(1);
            
            let grade = 'A';
            if (percentage < 90) grade = 'B';
            if (percentage < 80) grade = 'C';
            if (percentage < 70) grade = 'D';

            resolve({
                year: "2026",
                fullName: "Student " + studentId,
                studentId: studentId.toUpperCase(),
                course: "B.Sc Computer Science",
                subjects: [
                    { code: "CS-101", name: "Data Structures", max: 100, score: csScore },
                    { code: "MA-101", name: "Mathematics I", max: 100, score: mathScore },
                    { code: "PH-101", name: "Physics", max: 100, score: phyScore },
                    { code: "CH-101", name: "Chemistry", max: 100, score: chemScore }
                ],
                maxScore: 400,
                totalScore: total,
                percentage: percentage,
                grade: grade,
                remarks: percentage >= 50 ? "PASS" : "FAIL",
                issuedAt: new Date().toLocaleDateString()
            });
        }, 2000); // simulate 2s heavy computation latency
    });
}

module.exports = { fetchResult };
