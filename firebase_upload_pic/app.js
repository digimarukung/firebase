import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getStorage, ref, uploadBytes, listAll , getDownloadURL} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBDzvih1DAn7fAI-7JqipeIZgJOw4aNAmc",
    authDomain: "ashimaruhosting.firebaseapp.com",
    projectId: "ashimaruhosting",
    storageBucket: "ashimaruhosting.appspot.com",
    messagingSenderId: "329274100291",
    appId: "1:329274100291:web:d6162f14b9c2e94f9622f6",
    measurementId: "G-Q7PZYQNMSC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
console.log(storage);

function getCurrentDateTimeMillis() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เพราะ getMonth() เริ่มจาก 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0');
  
    return `${year}${month}${day}${hours}${minutes}${seconds}.${milliseconds}`;
  }

const fileUpload = document.getElementById("fileUpload");
fileUpload.addEventListener("change",(e)=>{
    console.log(e);
    const file = e.target.files[0];
    console.log(file);
    const f_name = getCurrentDateTimeMillis();
    console.log(f_name);
    const storageRef = ref(storage, 'myImage'+ f_name);
    uploadBytes(storageRef, file)
    .then((result)=>{
        console.log("upload file success.");
        updateImageTable();
    });

});

function updateImageTable() {
  // ลบข้อมูลเดิมในตาราง
  imageTableBody.innerHTML = "";

  const storage = getStorage();
  const listRef = ref(storage, '');

  // ดึงข้อมูลภาพจาก Firebase Storage
  listAll(listRef).then(async (res) => {
      try {
          console.log(res);
          for (const item of res.items) {   
              getDownloadURL(item).then((url) => {
                console.log(url);
                const fileName = item.name;
                addRowToImageTable(url, fileName);
              });    
          }
      } catch (error) {
          console.error("Error fetching and displaying images:", error);
      }
  });


}

function addRowToImageTable(url, fileName) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
      <td><img src="${url}" alt="${fileName}" style="width: 100px; height: auto;"></td>
      <td>${fileName}</td>
      <td><a href="${url}" download>Download</a></td>
  `;
  imageTableBody.appendChild(newRow);
}

// รันฟังก์ชันเพื่อแสดงข้อมูลเริ่มต้น (ถ้ามี)
updateImageTable();

