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

    // Delete the registration
    let allDelBtn = tBodyEl.querySelectorAll('.del-btn');
    let allEditBtn = tBodyEl.querySelectorAll('.edit-btn');
    deleteRegistration(allDelBtn);
    editRegistration(allEditBtn);
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
                <button class="btn p-1 px-2 bg-success text-white edit-btn">
                    <i class="fa fa-edit"></i>
                </button>
                <button class="btn p-1 px-2 btn-danger text-white del-btn">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
    `;

    tBodyEl.innerHTML += tr;
}

// // Delete the registration function
const deleteRegistration = (allDelBtn) => {
    allDelBtn.forEach((element, index) => {
        element.onclick = () => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    usersInfo.splice(index, 1);
                    localStorage.setItem("user", JSON.stringify(usersInfo));
                    showInformation(usersInfo)
                    console.log(usersInfo)

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        }
    })
}

// Edit the registration function
const editRegistration = (allEditBtn) => {
    allEditBtn.forEach((editBtn, index) => {
        editBtn.onclick = () => {

            let tr = editBtn.parentElement.parentElement;
            let allTd = tr.querySelectorAll('td');

            // For loop for alltds to update data in a row
            for (let i = 0; i < allTd.length - 1; i++) {
                allTd[i].contentEditable = true;
                allTd[i].style.border = '2px solid red';
            }

            // update coding
            let updateBtn = allTd[allTd.length - 1].querySelector('button');
            updateRegistration(updateBtn, allTd, index);
        }
    })
}

// Update registration
const updateRegistration = (updateBtn, allTd, index) => {
    updateBtn.innerHTML = `<i class="fa fa-save"></i>`
    updateBtn.onclick = () => {
        let objParam = {
            name: allTd[0].innerText,
            email: allTd[1].innerText,
            password: allTd[2].innerText,
            fatherName: allTd[3].innerText,
            address: allTd[4].innerText
        }
        usersInfo[index] = objParam;
        showInformation(usersInfo);
        localStorage.setItem('user', JSON.stringify(usersInfo));
        Swal.fire({
            title: "Success !",
            text: "Data Updated Successfully",
            icon: "success"
        });
    }
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