let notes = JSON.parse(localStorage.getItem('notes')) || [];

const notesContainer = document.getElementById('notes');
const noteForm = document.getElementById('noteForm');
const addNoteButton = document.getElementById('addNoteButton');
const noteInputs = document.getElementById('noteInputs');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');

function displayNotes() {
  notesContainer.innerHTML = '';
  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    const date = new Date(note.timestamp);
    noteElement.innerHTML = `
      <div class="note-content">
        <h2>${note.title}</h2>
        <p>${note.description}</p>
        <div class="note-date">${date.toLocaleString()}</div>
        <div class="dropdown note-actions">
          <button class="dropbtn">...</button>
          <div class="dropdown-content">
            <button onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
          </div>
        </div>
      </div>
    `;
    notesContainer.appendChild(noteElement);
  });
}

function addNote() {
  const title = titleInput.value;
  const description = descriptionInput.value;
  if (title && description) {
    const timestamp = Date.now();
    notes.push({ title, description, timestamp });
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    titleInput.value = '';
    descriptionInput.value = '';
    noteInputs.style.display = 'none'; // Hide inputs after saving
    titleInput.classList.remove('active'); // Remove active class
    descriptionInput.classList.remove('active'); // Remove active class
  } else {
    alert('Please fill in both title and description');
  }
}

function editNote(index) {
  const editedTitle = prompt('Enter new title:', notes[index].title);
  const editedDescription = prompt('Enter new description:', notes[index].description);
  if (editedTitle !== null && editedDescription !== null) {
    notes[index].title = editedTitle;
    notes[index].description = editedDescription;
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
  }
}

function deleteNote(index) {
  if (confirm('Are you sure you want to delete this note?')) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
  }
}

noteForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addNote();
});

addNoteButton.addEventListener('click', function () {
  noteInputs.style.display = 'block';
  titleInput.classList.add('active'); // Add active class
  descriptionInput.classList.add('active'); // Add active class
});

displayNotes();
