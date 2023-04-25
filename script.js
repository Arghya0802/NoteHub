const addBtn = document.getElementById("add");
const searchBtn = document.querySelector(".search-btn") ;
const searchbar = document.querySelector('.search-box');
const toggleBtn = document.querySelector('#checkbox') ;
const noteContainer = document.getElementById('notes-div') ;

let notesAdded = [] ;

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('.notes') ;
    const notes = [] ;

    textAreaData.forEach((note) => {

        return notes.push(note.value) ;
    })

    notesAdded = textAreaData.forEach((note) => {
        return notesAdded.push(note , note.value) ;
    })

    console.log(notesAdded);
    localStorage.setItem('notes' , JSON.stringify(notes)) ;
} ;

const addNotes = (text = '') => {
  const note = document.createElement("div");
  note.classList.add("div-1");

  const htmlData = `
    <div class="first-Row">
        <button class="edit" id="edit"><ion-icon name="create-outline"></ion-icon></button>
        <button class="delete" id="delete"><ion-icon name="trash-outline"></ion-icon></button>
    </div>
    <div class="main ${text ? "" : "hide"}"></div>
    <textarea name="" class="notes ${text ? "hide" : ""}"></textarea> ` ;

    note.insertAdjacentHTML('afterbegin' , htmlData) ;

    const notesDiv = document.querySelector('.notes-div') ;
    notesDiv.appendChild(note) ;

    // Getting the references for Each Note
    const editBtn = note.querySelector('.edit') ;
    const delBtn = note.querySelector('.delete') ;
    const mainDiv = note.querySelector('.main') ;
    const textArea = note.querySelector('.notes') ;

    textArea.innerHTML = text ;
    mainDiv.innerHTML = text ;

    delBtn.addEventListener('click' , () => {
        note.remove() ;
        updateLSData() ;
    })

    editBtn.addEventListener('click' , () => {
        mainDiv.classList.toggle('hide') ;
        textArea.classList.toggle('hide') ;
    })

    textArea.addEventListener('change' , (event) => {
        const textAdded = event.target.value ;

        mainDiv.innerHTML= textAdded ;

        updateLSData() ;
    })
};



const incWidth = () => {
    if(window.innerWidth <= 847 && window.innerWidth >= 400) {
        searchbar.style.width = '100px'; 
        // searchbar.setAttribute('placeholder', 'Search Notes Here');
        return ;
    }

    else if(window.innerWidth < 400)  
    {
        searchbar.style.width = "70px" ;
        return ;
    }
    searchbar.style.width = '195px';
    searchbar.setAttribute('placeholder', 'Search Notes Here');
}

document.addEventListener('click', (event) => {
    if (event.target != searchbar) {
        searchbar.style.width = '75px';
        searchbar.setAttribute('placeholder', 'Search');
    }
})

const getdiv = () => {
    const input = searchbar.value.toLowerCase();
    allNotesDiv = [...noteContainer.children] ;
    if (notedivs.length == 0) return;
    if (input != null) {
        notedivs.forEach(el => {
            const maintext = el.querySelector('.main').innerText.toLowerCase();
            if (maintext.includes(input)) {
                el.style.display = 'flex';
                const regex = new RegExp(input, "gi");
                el.querySelector('.main').innerHTML = el.querySelector('.main').innerText.replace(regex, `<span style='background-color: rgb(255, 208, 0);'>$&</span>`);

            }
            else {
                el.style.display = 'none';
            }


        })
    }
    else {
        notedivs.forEach(el => {
            const divtext = el.querySelector(".main").innerText;
            el.querySelector(".main").innerHTML = divtext;
            el.style.display = 'flex';
        })
    }
}


// const searchInput = (event) => {
//     const value = event.value.toLowerCase() ;

//     let allNotes = document.querySelectorAll('.main-div') ;

//     allNotes.forEach((note) => {
//         let text = note.value.toLowerCase() ;

//         if(value != text){
//             note.classList.toggle('hide') ;
//         }

//     })
// }

addBtn.addEventListener("click", () => addNotes());
// searchbar.addEventListener("click" , incWidth() ) ;
// searchbar.addEventListener("input" , getdiv())  ;

toggleBtn.addEventListener('change' , () => {

    let isDark = toggleBtn.checked ;

    localStorage.setItem('dark-mode' , isDark) ;
    // let darkNotes = JSON.parse(localStorage.getItem('notes')) ;

    if(toggleBtn.checked) {
        document.body.classList.add('dark-mode') ;
        const mainDiv = document.querySelector('main-div') ;
        mainDiv.classList.add('dark-mode') ;

        // if(notes) {notes.forEach((note) => addNotes(note) ) } ;
    }

    else{
        document.body.classList.remove('dark-mode') ;
        const mainDiv = document.querySelector('main-div') ;
        mainDiv.classList.remove('dark-mode') ;
        // const notes = JSON.parse(localStorage.getItem('notes')) ;

        // if(notes) {notes.forEach((note) => addNotes(note) ) } ;
    }
    
})

searchbar.addEventListener('input' , () => {
    let inputText = searchbar.value.toLowerCase() ;
    const allNotesDiv = document.querySelectorAll('.div-1')

    if(inputText === null || allNotesDiv.length == 0)  return ;

    allNotesDiv.forEach((notes) => {
        const mainText = notes.querySelector('.main').innerText.toLowerCase() ;
        
        if(mainText.includes(inputText) ) notes.classList.remove('hide') ;

        else notes.classList.add('hide') ;
    })
}) 

const alreadyChecked = localStorage.getItem('dark-mode');
if (alreadyChecked == 'true') {
  toggleBtn.checked = true;
  document.body.classList.add('dark-mode');
} else {
  toggleBtn.checked = false;
  document.body.classList.remove('dark-mode');
}

const notes = JSON.parse(localStorage.getItem('notes')) ;

if(notes) {notes.forEach((note) => addNotes(note) ) } ;

