document.addEventListener("DOMContentLoaded", () => {
    loadNotes();                                                                             // Load notes from localStorage on page load
});

function addNote() {
const noteText = document.getElementById("new-note").value;

if (noteText.trim() === "") {
    alert("Please enter a note.");
    return;
}

const notes = getNotes();
const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()} ${currentDate.toLocaleTimeString()}`;
const noteWithDate = `${formattedDate}: ${noteText}`;
notes.push(noteWithDate);
saveNotes(notes);


document.getElementById("new-note").value = "";                                              // Clear the input field


loadNotes();                                                                                 // Refresh the notes list
}



// Function to load notes
function loadNotes() {
   
    const notes = getNotes();                                                                 // Get all notes

   
    const notesListContainer = document.getElementById("notes-list");                         // Get the container where notes will be displayed

   
    notesListContainer.innerHTML = "";                                                        // Clear the existing content in the notes container

   // Loop through each note and create a display element
    notes.forEach((note, index) => {
       
        const noteElement = document.createElement("div");                                     // Create a div element for the note

    
        noteElement.classList.add("note");                                                     // Add a CSS class to the note div

       
        const deleteButton = document.createElement("button");                                  // Create a delete button for the note
        deleteButton.innerHTML = "Delete";
        deleteButton.id = "Deleteid";

     
        deleteButton.addEventListener("click", () => deleteNote(index));                         // Add a click event listener to the delete button

      
        const editButton = document.createElement("button");                                     // Create an edit button for the note
        editButton.innerHTML = "Edit";
        editButton.id = "Editid";

        
        editButton.addEventListener("click", () => editNote(index));                             // Add a click event listener to the edit button

     
        const readButton = document.createElement("button");                                     // Create a read button for the note
        readButton.innerHTML = "Read";
        readButton.classList.add("read-btn");

        
        readButton.addEventListener("click", () => readNote(index));                             // Add a click event listener to the read button, passing the index to readNote

      
        noteElement.innerText = note;                                                             // Set the text content of the note element

        
        noteElement.appendChild(editButton);                                                      // Append the edit, delete, and read buttons to the note element
        noteElement.appendChild(deleteButton);
        noteElement.appendChild(readButton);

        notesListContainer.appendChild(noteElement);                   
        // Append the note element to the notes container
    });
}


// Function to delete a note
function deleteNote(index) {
    const notes = getNotes();                                                                        // Get all the existing notes
    notes.splice(index, 1);                                                                         // Remove the note at the specified index from the notes array
    saveNotes(notes);                                                                                 // Save the updated notes array without the deleted note
    loadNotes();                                                                                     // Reload and display the updated list of notes
}


// Function to edit a note
function editNote(index) {
   
    const notes = getNotes();                                                                        // Get all the existing notes

   
    const editedNote = prompt("Edit your note", notes[index]);                                         // Prompt the user to edit the selected note, showing the current note content as the default value

   
    if (editedNote !== null) {                                                                         // Check if the user clicked "Cancel" (null value)
        notes[index] = editedNote;                                                                    // Update the note at the specified index with the edited content
        saveNotes(notes);                                                                             // Save the updated notes array
        loadNotes();                                                                                  // Reload and display the updated list of notes
    }
}


function getNotes() {
   
    const savedNotes = localStorage.getItem("notes");                                                      // Retrieve notes from localStorage
    return savedNotes ? JSON.parse(savedNotes) : [];
}

function saveNotes(notes) {
   
    localStorage.setItem("notes", JSON.stringify(notes));                                                    // Save notes to localStorage
}
function deleteAllNotes() {
    const confirmation = confirm("Are you sure you want to delete all notes?");

    if (confirmation) {
      
        localStorage.removeItem("notes");                                                              // Clear localStorage

       
        loadNotes();                                                                                    // Refresh the notes list
    }
}
// Function to search and display notes based on a keyword
function searchNotes() {
    const searchQuery = prompt("Enter the search keyword");                                          // Prompt the user to enter a search keyword
    const notes = getNotes();                                                                         // Get all the existing notes
    const filteredNotes = notes.filter(note => note.includes(searchQuery));                          // Filter notes based on whether they include the search keyword
    const notesListContainer = document.getElementById("notes-list");                                  // Get the container where notes will be displayed
    notesListContainer.innerHTML = "";                                                                 // Clear the existing content in the notes container

    
    filteredNotes.forEach((note, index) => {                                                        // Loop through each filtered note and create a display element
    
        const noteElement = document.createElement("div");                                               // Create a div element for the note

        
        noteElement.classList.add("note");                                                           // Add a CSS class to the note div

        // Create a delete button for the note
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.id = "Deleteid";

        
        deleteButton.addEventListener("click", () => deleteNote(index));                                  // Add a click event listener to the delete button

        const editButton = document.createElement("button");                                                // Create an edit button for the note
        editButton.innerHTML = "Edit";
        editButton.id = "Editid";

      
        editButton.addEventListener("click", () => editNote(index));                                         // Add a click event listener to the edit button

       
        noteElement.innerText = note;                                                                         // Set the text content of the note element

      
        noteElement.appendChild(editButton);                                                                   // Append the edit and delete buttons to the note element
        noteElement.appendChild(deleteButton);

      
        notesListContainer.appendChild(noteElement);                                                            // Append the note element to the notes container
    });
}


function readNote(index) {
const notes = getNotes();
const fullContentContainer = document.getElementById("full-content-container");

// Clear previous content
fullContentContainer.innerHTML = "";

// Display the content of the specific note
const fullNoteElement = document.createElement("div");
fullNoteElement.classList.add("full-note");
fullNoteElement.innerText = notes[index];

fullContentContainer.appendChild(fullNoteElement);
}