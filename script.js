// 1. دالة الانتقال لصفحة الاسم
function startQuiz() {
  window.location.href = "name.html";
}

// 2. دالة حفظ الاسم والانتقال للاختبار
function continueQuiz() {
  const nameInput = document.getElementById("studentName");
  if (!nameInput) return;
  
  const name = nameInput.value.trim();
  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  localStorage.setItem("studentName", name);
  window.location.href = "quiz.html";
}

// 3. دالة حفظ النتيجة في Firebase
function saveResult(score, total) {
  try {
    if (typeof firebase !== "undefined" && firebase.apps) {
      if (!firebase.apps.length) {
        const firebaseConfig = {
          apiKey: "AIzaSyBlowoG5NRIMZNa69vLUCn8RatM_JwmRVY",
          authDomain: "english-quiz-7f0a9.firebaseapp.com",
          databaseURL: "https://english-quiz-7f0a9-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "english-quiz-7f0a9",
          storageBucket: "english-quiz-7f0a9.firebasestorage.app",
          messagingSenderId: "212629260642",
          appId: "1:212629260642:web:3e027c381c67014326443b",
          measurementId: "G-Y4TMSWJCFH"
        };
        firebase.initializeApp(firebaseConfig);
      }
      
      const studentName = localStorage.getItem("studentName") || "Student";
      firebase.database().ref('results').push({
        name: studentName,
        score: score,
        total: total,
        date: new Date().toLocaleString('ar-LY')
      }).then(() => {
        alert("تم حفظ نتيجتك بنجاح يا " + studentName + "!");
      }).catch((error) => {
        console.error("خطأ أثناء الحفظ: ", error);
      });
    }
  } catch (err) {
    console.error("Firebase error: ", err);
  }
}

// جعل الدوال متاحة عالمياً للـ HTML
window.startQuiz = startQuiz;
window.continueQuiz = continueQuiz;
window.saveResult = saveResult;