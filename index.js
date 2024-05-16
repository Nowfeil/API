let url ="http://localhost:3000/users";


function addUsers(){
    let id = document.getElementById("uid").value;
    let name = document.getElementById("uname").value;
    let branch = document.getElementById("branch").value;
    let phno = document.getElementById("phno").value;
    let email = document.getElementById("email").value;
    var uid="";
    fetch(url).then(response => response.json()).then(data => {
         uid = data.find(d => d.id == id);
         if (uid) {
             alert("This id already exists");
             return;
         }
        if(id==="" || name==="" ||branch===""||phno===""||email===""){
            alert("Enter valid data")
            return;
        }
        fetch(url,{
            method:"POST",
            body:JSON.stringify({
                "id":id,
                "name":name,
            "branch":branch,
            "phno":phno,
            "email":email
            })
        }).then((response)=>response.json()).then((data)=>{
            console.log(data);
        })
    })
}


let display = true;
function showUsers(){
    let table =document.getElementById('tbody');
    let btn = document.getElementById("btn-name");
    let thead = document.getElementById("thead");
    if(display === true){
        thead.innerHTML = `<th>Id</th><th>Name</th><th>Branch</th><th>Mobile Number</th><th>Email</th><th>Operations</th>`
        btn.innerText = "Hide"
        display = false;
        table.innerHTML = ''
        fetch(url).then((response)=>response.json()).then((data)=>{
            data.forEach((user)=>{
                let row = document.createElement("tr");
                row.innerHTML +=`<td>${user.id}</td><td>${user.name}</td><td>${user.branch}</td><td>${user.phno}</td><td>${user.email}</td><td><button onclick="deleteUser(${user.id})">Delete</button>&nbsp;<button onclick="editUser(${user.id})">Edit</button></td>`
                table.appendChild(row);
            })
        })
    }else{
        display = true;
        table.innerHTML = '';
        btn.innerText = "Show"
        thead.innerHTML = ''
    }
    
}

function deleteUser(id){
    fetch(url+`/${id}`,{
        method:"DELETE"
    }).then((response)=>response.json()).then((data)=>{
        console.log(data);
    })
}

function editUser(id) {
    document.getElementById("editForm").style.display = "block";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const user = data.find(users => users.id == id);
            if (user) {
                document.getElementById("Ename").value = user.name;
                document.getElementById("Ebranch").value = user.branch;
                document.getElementById("Ephno").value = user.phno;
                document.getElementById("Eemail").value = user.email;
            }
            
            document.getElementById("editUserForm").onsubmit = function(event) {
                event.preventDefault();
                updateUser(id);
            };
        })
        .catch(error => console.error('Error fetching user data:', error));
}

function updateUser(id) {
    const name = document.getElementById("Ename").value;
    const branch = document.getElementById("Ebranch").value;
    const phno = document.getElementById("Ephno").value;
    const email = document.getElementById("Eemail").value;
    fetch(url + `/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name, branch,phno,email })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Updated user:', data);
    })
    .catch(error => console.error('Error updating user:', error));
}

function search(){
    text = document.getElementById("searchbar").value;
    console.log(text);
    const searchtable = document.getElementById('tbody');
    searchtable.innerHTML = ''
    fetch(url).then((response)=>response.json()).then((data)=>{
        const searchData = data.filter((u)=>{
            return (u.id.includes(text)||u.name.includes(text)||u.branch.includes(text)||u.phno.includes(text)||u.email.includes(text))
        })
        let ntng = document.getElementById('containerNothing');
        if(searchData.length==0){
            ntng.style.display = "block";
        }else{
            ntng.style.display = "none";
            const searchHead = document.getElementById('thead')
            searchHead.innerHTML = `<th>Id</th><th>Name</th><th>Branch</th><th>Mobile Number</th><th>Email</th><th>Operations</th>`
            searchData.forEach((user)=>{
                let row = document.createElement("tr");
                row.innerHTML +=`<td>${user.id}</td><td>${user.name}</td><td>${user.branch}</td><td>${user.phno}</td><td>${user.email}</td><td><button onclick="deleteUser(${user.id})">Delete</button>&nbsp;<button onclick="editUser(${user.id})">Edit</button></td>`
                searchtable.appendChild(row);
            })
        }
    })
}