// let userList = document.querySelector('#userList');
let tableList = document.querySelector('#tableList');
let form = document.querySelector('#adduser');


function Renderuser(doc){
    // let li = document.createElement('li');
    // let name = document.createElement('span');
    // let City = document.createElement('span');


    // Show on table

    let tr = document.createElement('tr');
    let name2 = document.createElement('td');
    let City2 = document.createElement('td');
     
    // delete element 
    let del = document.createElement('button');
    del.className = "alert alert-danger";

    // let upt = document.createElement('button');
    // upt.className = "btn btn-warning";

    // li.setAttribute('data-id',doc.id);
    tr.setAttribute('data-id',doc.id);

    // name.textContent = doc.data().name;
    // City.textContent = doc.data().City;

    name2.textContent = doc.data().name;
    City2.textContent = doc.data().City;

    del.textContent = "Delete";
    // upt.textContent = "Edit";

    // li.appendChild(name);
    // li.appendChild(City);
    // li.appendChild(del);

    tr.appendChild(name2);
    tr.appendChild(City2);
    tr.appendChild(del);
    // li.appendChild(upt);
    
    // userList.appendChild(li);
    tableList.appendChild(tr);

    // delete data from firebase 
    del.addEventListener('click', (e)=>{
        let id = e.target.parentElement.getAttribute('data-id');
        console.log(id);
        db.collection('users').doc(id).delete();
    })


}

// // มีคำสั่งคล้ายกับการใช้งาน select * from table orderby City desc โดยเรียงจากเมืองเริ่มต้นที่ Z-A เเละ get element ทั้งหมดใน record มา
// db.collection('users').get().then(user =>{
    
//     // docs = การเข้าไปถึงข้อมูลเป็นลักษณะ array ยาวๆ หากต้องการข้อมูลทีละตัวต้อง loop 

//     user.docs.forEach(doc =>{ // doc => หมายถึงเป็นการสร้างตัวแปรขึ้นมา 
//         console.log(doc.data());  // debug
//         Renderuser(doc); // เรียกใช้งาน function 
//     })
// });



// มีคำสั่งคล้ายกับการใช้งาน select * from table where City = "bangkok" orderby City desc โดยเรียงจากเมืองเริ่มต้นที่ Z-A
// db.collection('users').where('City', '==', 'Bangkok2').orderBy('City', 'desc').get().then(user =>{
    
//     // docs = การเข้าไปถึงข้อมูลเป็นลักษณะ array ยาวๆ หากต้องการข้อมูลทีละตัวต้อง loop 

//     user.docs.forEach(doc =>{ // doc => หมายถึงเป็นการสร้างตัวแปรขึ้นมา 
//         console.log(doc.data());  // debug
//         Renderuser(doc); // เรียกใช้งาน function 
//     })
// });



form.addEventListener('submit', (e)=>{
    e.preventDefault();
    db.collection('users').add({
        name: form.name.value,
        City: form.City.value
    })
    form.name.value = "";
    form.City.value = "";
    
    
} );

// Create real time database 
// หากมีการ เเก้ไขข้อมูลจะทำการ update ค่าใหม่

db.collection('users').orderBy('City', 'desc').onSnapshot(snapshot =>{
    let changes =  snapshot.docChanges();
    changes.forEach(change => {
        // console.log(change); // debug ค่าใน change จะมีค่าของ Type  อยู่ด้านใน 
        if (change.type == "added"){
            Renderuser(change.doc);
            console.log("real time database is running.");
        }
        else if (change.type == "removed"){
            console.log(change.type);
            let tr = tableList.querySelector(`[data-id =${change.doc.id}]`);
            console.log(tr);
            // userList.removeChild(li);
            tableList.removeChild(tr);
        }
    })
})