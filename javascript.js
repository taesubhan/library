

// Array that holds all the book objects for library
const myLibrary = []; 

// Button nodes
const openDialogButton = document.querySelector('.open-dialog');
const submitButton = document.querySelector('.submit-dialog');
const cancelButton = document.querySelector('.cancel-dialog');

// Dialog & form nodes
const dialogBox = document.querySelector('.dialog-box');
const dialogOutput = document.querySelector('.dialog-output');
const form = document.querySelector('.book-form');
const userInputs = document.querySelectorAll('.user-input');

// Link to trash-can icon, used for delete button
const trashIconSrc = './icons/delete.svg';

// Book prototype
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `"${title}" by ${author} contains ${pages} pages and was ${read ? 'completed' : 'not read'}`
    }
}

// Add Book object into library array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Create Span Element for text manipulation through CSS
function createSpanElem(text, ...classDesc) {
    const spanElem = document.createElement('span');
    classDesc.forEach((className) => spanElem.classList.add(className));
    spanElem.textContent = text;
    return spanElem;
}

// Adds multiple attributes into an element through an object
function addMultAttr(node, attr) {
    for (let key in attr) {
        node.setAttribute(key, attr[key]);
    }
}

// Inserts slider logic into the slider
function activateSlider(inputNode, book) {
    inputNode.addEventListener('click', (e) => {
        book.read = e.target.checked;

        refreshShelf();
    })
}

// Creates slider element that will allow users to toggle between read and not-read status
function createSlider(book) {
    const sliderLabel = document.createElement('label');
    const inputElem = document.createElement('input');
    const spanElem = document.createElement('span'); 
    
    sliderLabel.classList.add('switch');
    inputElem.setAttribute('type', 'checkbox');
    spanElem.classList.add('slider');
    
    sliderLabel.appendChild(inputElem);
    sliderLabel.appendChild(spanElem);

    inputElem.checked = book.read;
    activateSlider(inputElem, book);

    return sliderLabel;
} 

// Inserts the logic for the delete button
function activateDeleteIcon(deleteNode) {
    deleteNode.addEventListener('click', (e) => {
        const bookCardId = e.target.parentElement.parentElement.id;
        myLibrary.splice(bookCardId,1);

        refreshShelf();
    })
}

// Creates and adds a delete button element for each book card
function createDeleteButton() {
    const deleteNode = document.createElement('a');
    const imageNode = document.createElement('img');
    const imageAttributes = {
        'src': trashIconSrc,
        'alt': 'Delete Button',
        'class': 'delete-img'
    };
    addMultAttr(imageNode, imageAttributes);
    deleteNode.classList.add('delete-button');
    
    deleteNode.appendChild(imageNode);
    activateDeleteIcon(deleteNode);

    return deleteNode;
}

// Displays each Book objects in the array as cards in the front-end
function displayBooks() {
    const libraryNode = document.querySelector('.book-list');

    for (let i = 0; i < myLibrary.length; i++) {
        const bookNode = document.createElement('li');
        bookNode.classList.add('book');
        bookNode.setAttribute('id', `${i}`);
        const titleNode = document.createElement('p');
        titleNode.classList.add('title', 'book-info');
        const authorNode = document.createElement('p');
        authorNode.classList.add('author', 'book-info');
        const pagesNode = document.createElement('p');
        pagesNode.classList.add('pages', 'book-info');
        const isReadNode = document.createElement('p');
        isReadNode.classList.add('read', 'book-info');
        const bookDescNode = document.createElement('div');
        bookDescNode.classList.add('book-description');

        titleNode.textContent = `${myLibrary[i].title}`;
        authorNode.textContent = `${myLibrary[i].author}`;
        pagesNode.textContent = `${myLibrary[i].pages} pages`;
        isReadNode.textContent = `Status: ${myLibrary[i].read ? 'Completed' : 'Not Completed'}`;

        const readSliderNode = createSlider(myLibrary[i]);
        const deleteNode = createDeleteButton();

        [authorNode, pagesNode, isReadNode, readSliderNode].forEach((node) => bookDescNode.appendChild(node));
        [titleNode, bookDescNode, deleteNode].forEach((node) => bookNode.appendChild(node));
        
        libraryNode.appendChild(bookNode);
    }
}

// Delete all book nodes in html
function deleteShelf() {
    const libraryNode = document.querySelector('.book-list');

    while(libraryNode.firstChild) {
        libraryNode.removeChild(libraryNode.firstChild);
    }
}

// Deletes book nodes in html and repopulates the data
function refreshShelf() {
    deleteShelf();
    displayBooks();
}

// Creates Book object based on current dialog input values and adds to library
function createAndAddBook() {
    const inputResponses = Array.from(userInputs, (input) => { 
        return input.id === 'read' 
            ? input.checked 
            : input.value
    });
    const myBook = new Book(inputResponses[0], inputResponses[1], inputResponses[2], inputResponses[3]);
    addBookToLibrary(myBook);

    refreshShelf();
}

// Activates the logic for the dialog box
function activateDialog() {
    openDialogButton.addEventListener('click', () => dialogBox.showModal());

    dialogBox.addEventListener('close', () => {
        form.reset(); // Clears out the input after closing the dialog box, so they are blank the next time user opens
    })

    submitButton.addEventListener('click', (e) => {
        if (!form.reportValidity()) {
            return;
        }

        createAndAddBook();
        e.preventDefault();
        dialogBox.close();
    })

    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        dialogBox.close();
    })
}

// Creates some dummy book values to populate the library
function addDummyBooks() {
    const bookA = new Book('A Book Title', 'Author A', 189, true);
    const bookB = new Book('A Tale of Two Tails', 'Charlie Snickers',  312, true);
    const bookC = new Book('Another Book Title', 'John Smith',  223, false);
    const bookD = new Book('Will You Still Love Me As A Worm?', 'Trent Bookworm',  115, false);
    const bookE = new Book('Why Apple\'s Rock!', 'Justine Apples',  332, true);

    addBookToLibrary(bookA);
    addBookToLibrary(bookB);
    addBookToLibrary(bookC);
    addBookToLibrary(bookD);
    addBookToLibrary(bookE);

    displayBooks();
}

// Runs all the functions that makes the library website work
function startLibrary() {
    addDummyBooks();
    activateDialog();
}

startLibrary();
