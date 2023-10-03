const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? read : false;

    this.info = function() {
        return `"${title}" by ${author} contains ${pages} pages and was ${read ? 'completed' : 'not read'}`
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createSpanElem(text, ...classDesc) {
    const spanElem = document.createElement('span');
    classDesc.forEach((className) => spanElem.classList.add(className));
    spanElem.textContent = text;
    return spanElem;
}

function appendText(node, ...textNode) {
    textNode.forEach((text) => {node.appendChild(text)});
}

function displayBooks() {
    const libraryNode = document.querySelector('.book-list');

    for (let book of myLibrary) {
        const bookNode = document.createElement('li');
        bookNode.classList.add('book');
        const titleNode = document.createElement('div');
        titleNode.classList.add('title', 'book-info');
        const authorNode = document.createElement('p');
        authorNode.classList.add('author', 'book-info');
        const pagesNode = document.createElement('p');
        pagesNode.classList.add('pages', 'book-info');
        const isReadNode = document.createElement('p');
        isReadNode.classList.add('read', 'book-info');

        titleNode.textContent = `${book.title}`;
        authorNode.textContent = `${book.author}`;
        pagesNode.textContent = `${book.pages} pages`;
        isReadNode.textContent = `Status: ${book.pages ? 'Completed' : 'Not Completed'}`;

        [titleNode, authorNode, pagesNode, isReadNode].forEach((node) => bookNode.appendChild(node));
        
        libraryNode.appendChild(bookNode);
    }
}

const bookA = new Book('The Title A', 'James Willis', 189, true);
const bookB = new Book('The Tale of Tales', 'Susan Jacobson',  312, true);
const bookC = new Book('My Horrible Apple', 'Alex Blade',  223, false);
const bookD = new Book('Worm\'s Favorite Book', 'Trent Bookworm',  115, false);
const bookE = new Book('Why Apple\'s Rock!', 'Jessica Applework',  332, true);

addBookToLibrary(bookA);
addBookToLibrary(bookB);
addBookToLibrary(bookC);
addBookToLibrary(bookD);
addBookToLibrary(bookE);

displayBooks();

