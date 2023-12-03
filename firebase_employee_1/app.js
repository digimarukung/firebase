import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore , collection , getDocs,addDoc,deleteDoc,doc} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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
const db = getFirestore(app)
const table = document.getElementById("table") 
const form = document.getElementById("addForm")

async function getEmployees(db){
    const empCol = collection(db,'employees')
    const empSnapshot = await getDocs(empCol)
    console.log(empCol);
    return empSnapshot
}

function showData(employee){
    const row = table.insertRow(-1)

    if (table.rows.length % 2 === 0) {
        console.log("lightblue");
        row.style.backgroundColor = "lightblue"; // สีของแถวเลขคู่
    } else {
        console.log("lightblue");
        row.style.backgroundColor = "white"; // สีของแถวเลขคี่
    }
    const nameCol = row.insertCell(0)
    const ageCol = row.insertCell(1)
    const deleteCol = row.insertCell(2)
    nameCol.innerHTML = employee.data().name
    ageCol.innerHTML = employee.data().age

    //สร้างปุ่มลบ
    let btn =document.createElement('button')
    btn.textContent="ลบข้อมูล"
    btn.setAttribute('class','btn btn-danger')
    btn.setAttribute('data-id',employee.id)
    deleteCol.appendChild(btn)
    btn.addEventListener('click',(e)=>{
        let id = e.target.getAttribute('data-id');
        // แสดง Confirm Box
        let isConfirmed = window.confirm('คุณแน่ใจหรือไม่ที่ต้องการลบข้อมูลนี้?');
        if (isConfirmed) {
        deleteDoc(doc(db,'employees',id))
        .then(() => {
            clearData();
            refreshData();
            console.log('Delete data success.');
          })
          .catch((error) => {
            console.error('Data cannot delete. ', error);
          });  
        }else {
            // ถ้าผู้ใช้กด "ยกเลิก" หรือปิด Confirm Box
            console.log('Deletion canceled.');
        }
    })
}

function clearData() {
    const table = document.getElementById("table"); // แทน "myTable" ด้วย ID ของตารางของคุณ
    const rowCount = table.rows.length;
  
    // เริ่มต้นจากแถวสุดท้ายไปยังแถวแรก (ย้อนหลัง)
    for (let i = rowCount - 1; i > 0; i--) {
      table.deleteRow(i);
    }
}

//ดึงกลุ่ม document
const data = await getEmployees(db)
data.forEach(employee=>{
    showData(employee)
})

async  function refreshData(){
    const result = await getEmployees(db)
    result.forEach(employee=>{
    showData(employee)
})}

//ดึงข้อมูลจากแบบฟอร์ม
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    addDoc(collection(db,'employees'),{
        name:form.name.value,
        age:form.age.value
    })
    form.name.value=""
    form.age.value=""
    alert("บันทึกข้อมูลเรียบร้อย")
    clearData();
    refreshData();
})
