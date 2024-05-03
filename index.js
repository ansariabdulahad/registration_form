let registerationForm = document.querySelector('.registration-form');
let allinputs = registerationForm.querySelectorAll('input');
let textAreaEl = registerationForm.querySelector('textarea');
let tBodyEl = document.querySelector('.t-body');
let rBtn = document.querySelector('.r-btn');
let uBtn = document.querySelector('.u-btn');
let searchEl = document.querySelector('.search');

let usersInfo = [];
let allTd;

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
// const editRegistration = (allEditBtn) => {
//     allEditBtn.forEach((editBtn, index) => {
//         editBtn.onclick = () => {

//             let tr = editBtn.parentElement.parentElement;
//             let allTd = tr.querySelectorAll('td');

//             // Second way of updating code using form submission

//             // assign values to form
//             // allinputs[0].value = allTd[0].innerText;
//             // allinputs[1].value = allTd[1].innerText;
//             // allinputs[2].value = allTd[2].innerText;
//             // allinputs[3].value = allTd[3].innerText;
//             // textAreaEl.value = allTd[4].innerText;

//             // change form btn from register to update btn
//             // rBtn.classList.add('d-none');
//             // uBtn.classList.remove('d-none');

//             // For loop for alltds to update data in a row
//             for (let i = 0; i < allTd.length - 1; i++) {
//                 allTd[i].contentEditable = true;
//                 allTd[i].style.border = '2px solid red';
//             }

//             // update coding
//             let updateBtn = allTd[allTd.length - 1].querySelector('button');
//             updateRegistration(updateBtn, allTd, index);
//             // updateRegistration(uBtn, allTd, index);
//         }
//     })
// }

const editRegistration = (allEditBtn) => {
    allEditBtn.forEach((editBtn, index) => {
        editBtn.onclick = () => {
            let tr = editBtn.parentElement.parentElement;
            allTd = tr.querySelectorAll('TD');

            for (let i = 0; i < allinputs.length; i++) {
                allinputs[i].value = allTd[i].innerText
            }
            textAreaEl.value = allTd[allTd.length - 2].innerText;
            rBtn.classList.add('d-none');
            uBtn.classList.remove('d-none');

            // update coding using registration form.
            updateRegistration(index);
        }
    })
}

const updateRegistration = (index) => {
    uBtn.onclick = () => {
        let updateObj = {
            name: allinputs[0].value,
            email: allinputs[1].value,
            password: allinputs[2].value,
            fatherName: allinputs[3].value,
            address: textAreaEl.value
        }
        usersInfo[index] = updateObj;
        rBtn.classList.remove('d-none');
        uBtn.classList.add('d-none');
        showInformation(usersInfo);
        localStorage.setItem('user', JSON.stringify(usersInfo));
        registerationForm.reset();
        Swal.fire({
            title: "Success !",
            text: "Data Updated successfully !",
            icon: "success"
        });
    }
}

// Update registration
// const updateRegistration = (updateBtn, allTd, index) => {
//     updateBtn.innerHTML = `<i class="fa fa-save"></i>`
//     updateBtn.onclick = () => {
//         let objParam = {
//             name: allTd[0].innerText,
//             email: allTd[1].innerText,
//             password: allTd[2].innerText,
//             fatherName: allTd[3].innerText,
//             address: allTd[4].innerText
//         }
//         // let objParam = {
//         //     name: allinputs[0].value,
//         //     email: allinputs[1].value,
//         //     password: allinputs[2].value,
//         //     fatherName: allinputs[3].value,
//         //     address: textAreaEl.value
//         // }
//         usersInfo[index] = objParam;
//         showInformation(usersInfo);
//         localStorage.setItem('user', JSON.stringify(usersInfo));
//         // change form btn from update to register btn
//         // rBtn.classList.remove('d-none');
//         // uBtn.classList.add('d-none');
//         Swal.fire({
//             title: "Success !",
//             text: "Data Updated Successfully",
//             icon: "success"
//         });
//     }
// }

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

        let checkEmail = usersInfo.find((data) => {
            return data.email == user.email;
        });

        if (!checkEmail || checkEmail === undefined) {
            usersInfo.push(user);
            localStorage.setItem('user', JSON.stringify(usersInfo));
            showInformation(usersInfo);
            registerationForm.reset();
            Swal.fire({
                title: "Success !",
                text: "Registration Completed",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Warning !",
                text: "Email already exists, please try again.",
                icon: "warning"
            });
        }
    } else {
        Swal.fire({
            title: "Warning !",
            text: "All fields are mandatory to fill.",
            icon: "warning"
        });
    }
}

// Search coding
searchEl.oninput = () => {
    searching();
}

const searching = () => {
    let sValue = searchEl.value.toLowerCase();
    let allTr = tBodyEl.querySelectorAll('TR');

    for (let i = 0; i < allTr.length; i++) {
        let allTd = allTr[i].querySelectorAll('TD');
        let name = allTd[0].innerText.toLowerCase();
        let email = allTd[1].innerText.toLowerCase();

        if (name.indexOf(sValue) != -1 || email.indexOf(sValue) != -1) {
            allTr[i].classList.remove('d-none');
        } else {
            allTr[i].classList.add('d-none');
        }
    }
}