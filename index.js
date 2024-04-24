let registerationForm = document.querySelector('.registration-form');
let allinputs = registerationForm.querySelectorAll('input');
let textAreaEl = registerationForm.querySelector('textarea');
let tBodyEl = document.querySelector('.t-body');

let usersInfo = [];

// get data from localstorage and store the data into array
if (localStorage.getItem('user') !== null) {
    usersInfo = JSON.parse(localStorage.getItem('user'));
}

// Show the registartion data into UI
const showInformation = (users) => {
    tBodyEl.innerHTML = "";
    users.forEach((item, index) => {
        tBodyInfo(item, index);
    })
}

// Make dynamic T-Body
const tBodyInfo = (item, index) => {
    let tr = `
        <tr class="text-nowrap">    
            <th scope="row">${index + 1}</th>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.password}</td>
            <td>${item.fatherName}</td>
            <td>${item.address}</td>
            <td>
                <button class="btn bg-success text-white">Edit</button>
                <button class="btn btn-danger text-white">Delete</button>
            </td>
        </tr>
    `;

    tBodyEl.innerHTML += tr;
}

// Call the function when page loads
showInformation(usersInfo);

// Call and perform functions on form submit
registerationForm.onsubmit = (e) => {
    e.preventDefault();
    if (allinputs[0].value !== '' && allinputs[1].value !== '', allinputs[2].value !== '', allinputs[3].value !== '') {

        let user = {
            name: allinputs[0].value,
            email: allinputs[1].value,
            password: allinputs[2].value,
            fatherName: allinputs[3].value,
            address: textAreaEl.value
        }

        usersInfo.push(user);
        localStorage.setItem('user', JSON.stringify(usersInfo));
        registerationForm.reset();
        Swal.fire({
            title: "Success !",
            text: "Registration Completed",
            icon: "success"
        });
        showInformation(usersInfo);
    } else {
        Swal.fire({
            title: "Warning !",
            text: "All fields are mandatory to fill.",
            icon: "warning"
        });
    }
}