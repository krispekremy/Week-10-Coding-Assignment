/* This is the start of my code! I begin my creating a class for Song that takes a name and length, an Album class that takes an id, a name, a year, an empty array for songs, and a genre, that also has two methods on it, one for adding a song to the this.songs array, and one for deleting a song from the this.songs array. Lastly we create a class for Artist that takes an id, a name, and makes an empty array for albums. This class has two similar methods to the Album class, but this time for adding and deleting Albums from the this.albums array.*/

class Song {
    constructor(name, length) {
        this.name = name;
        this.length = length;
    }
}

class Album {
    constructor(id, name, year, genre) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.genre = genre;
        this.songs = [];
    }

    addSong(song) {
        this.songs.push(song);
    }

    deleteSong(song) {
        let index = this.songs.indexOf(song);
        this.songs.splice(index, 1);
    }
}

class Artist {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.albums = [];
    }

    addAlbum(album) {
        this.albums.push(album);
    }

    deleteAlbum(album) {
        let index = this.albums.indexOf(album);
        this.albums.splice(index, 1);
    }
}
/* Here we start establishing some variables that the code will use. We create an empty array called artists, set the value to artistId to 0, and the albumId also to 0. */
let artists = [];
let artistId = 0;
let albumId = 0;

/* Here I've called the function onClick that is defined just below. It takes a string called 'new-artist' and the action is an arrow function that we pass through the onClick function. The arrow function pushes a new instance of the object Artist, increments the artistId by one, and uses the getValue on the new-artist-name id to return the value of the new artist! It also calles the drawDOM function which we define below.  */

onClick('new-artist', () => {
    artists.push(new Artist(artistId++, getValue('new-artist-name')));
    drawDOM();
});
/* Here We define the onClick function! This lets us easily add an event listener to an Id without having to type out the code every time we want to have something do something when its clicked! */
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

/* This function is written for a similar reason as the one above! This way we don't have to always write out this line of code everytime we want to find the value of something in the DOM! */
function getValue(id) {
    return document.getElementById(id).value;
}
/* We have created this function so that every time we submit new data or delete data from the table, the html on the page updates to properly reflect the changes made. It does this by using for loops to iterate through each array of artists and their respective albums and updates the html on the page to reflect the current data being stored behind the scenes.*/
function drawDOM() {
    let artistDiv = document.getElementById('artists');
    clearElement(artistDiv);
    for (let artist of artists) {
        let artistDivContainer = document.createElement('div');
        let title = document.createElement('h2');
        title.innerHTML = artist.name;
        title.appendChild(createDeleteArtistButton(artist));
        artistDivContainer.appendChild(title);
        artistDivContainer.appendChild(createArtistTable(artist));
        for (let album of artist.albums) {
            artistDivContainer.appendChild(createAlbumSection(artist, album));
        }
        artistDiv.appendChild(artistDivContainer);
    }
}
/* This function has been written to easily remove an element from the DOM instead write the code out everytime we do this. It does so with a while loop and says while the element passed through does have a first child, remove that first child. */
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
/* This is a pretty long function that basically goes through and adds creates the Artist table! We create a variable called table and create it on the first line, then immediately set the attributes of the table. Then we create a row variable that lets us add rows to the table. Then we go through and create each column element in the DOM (th), assign the innerHTML to be the appropriate name, and then append the row to have that newely created column info. Then we repeat the process but this time allow for input on the rest of the th elements! We also call createNewAlbumButton function and pass through the artist that the table was created for. */
function createArtistTable(artist) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let yearColumn = document.createElement('th');
    let genreColumn = document.createElement('th');
    nameColumn.innerHTML = 'Album Name';
    yearColumn.innerHTML = 'Year';
    genreColumn.innerHTML = 'Genre';
    row.appendChild(nameColumn);
    row.appendChild(yearColumn);
    row.appendChild(genreColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let yearTh = document.createElement('th');
    let genreTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `album-name-input-${artist.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let yearInput = document.createElement('input');
    yearInput.setAttribute('id', `album-year-input-${artist.id}`);
    yearInput.setAttribute('type', 'text');
    yearInput.setAttribute('class', 'form-control');
    let genreInput = document.createElement('input');
    genreInput.setAttribute('id', `album-genre-input-${artist.id}`);
    genreInput.setAttribute('type', 'text');
    genreInput.setAttribute('class', 'form-control');
    let newAlbumButton = createNewAlbumButton(artist);
    nameTh.appendChild(nameInput);
    yearTh.appendChild(yearInput);
    genreTh.appendChild(genreInput);
    createTh.appendChild(newAlbumButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(yearTh);
    formRow.appendChild(genreTh);
    formRow.appendChild(createTh);
    return table;
}
/* This function lets us create the button that makes a new album for an artist! We set the btn class using boot strap to make it loop nice, and pass a arrow function when its clicked that adds a new intstance of the Album object into the artist object. That arrow function also calls drawDOM. */
function createNewAlbumButton(artist) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create Album';
    btn.onclick = () => {
        artist.addAlbum(new Album(
            albumId++, 
            getValue(`album-name-input-${artist.id}`), 
            getValue(`album-year-input-${artist.id}`), 
            getValue(`album-genre-input-${artist.id}`)
        ));
        drawDOM();
    };
    return btn;
}

/* This function is written to create the section of the page that contains the Album info as well as create the album delete button so you can delete it if you want! */
function createAlbumSection(artist, album) {
    let albumDiv = document.createElement('div');
    let albumTitle = document.createElement('h4');
    albumTitle.innerHTML = `${album.name} (${album.year}, ${album.genre})`;
    albumTitle.appendChild(createDeleteAlbumButton(artist, album));
    albumDiv.appendChild(albumTitle);
    albumDiv.appendChild(createAlbumTable(artist, album));
    return albumDiv;
}
/* This is where I define the createDeletAlbumButton function that lets us delete an album if we so choose! It works similar to the createNewAlbum button but instead of adding it to the array it deletes it. */
function createDeleteAlbumButton(artist, album) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete Album';
    btn.onclick = () => {
        artist.deleteAlbum(album);
        drawDOM();
    };
    return btn;
}
/* This function works very similarly to the above createArtistTable function, but for albums. */
function createAlbumTable(artist, album) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-light table-striped');
    
    let row = table.insertRow(0);
    let songNameColumn = document.createElement('th');
    let songLengthColumn = document.createElement('th');
    songNameColumn.innerHTML = 'Song Name';
    songLengthColumn.innerHTML = 'Length';
    row.appendChild(songNameColumn);
    row.appendChild(songLengthColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let lengthTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `song-name-input-${album.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let lengthInput = document.createElement('input');
    lengthInput.setAttribute('id', `song-length-input-${album.id}`);
    lengthInput.setAttribute('type', 'text');
    lengthInput.setAttribute('class', 'form-control');
    let newSongButton = createNewSongButton(artist, album);
    nameTh.appendChild(nameInput);
    lengthTh.appendChild(lengthInput);
    createTh.appendChild(newSongButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(lengthTh);
    formRow.appendChild(createTh);
    table.appendChild(formRow);
    
    for (let song of album.songs) {
        createSongRow(album, table, song);
    }

    return table;
}
/* This code works very similar to the createNewAlbumButton function, but this makes a button that when you click it, it makes a new song in an album and draws the DOM. */
function createNewSongButton(artist, album) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Add Song';
    btn.onclick = () => {
        album.addSong(new Song(
            getValue(`song-name-input-${album.id}`), 
            getValue(`song-length-input-${album.id}`)
        ));
        drawDOM();
    };
    return btn;
}
/* This function is used in the above function createAlbumTable. This gives us a new section of the table for our newly added song, and gives calls the createDeleteRow button that deletes the song from the album. */
function createSongRow(album, table, song) {
    let row = table.insertRow(-1);
    row.insertCell(0).innerHTML = song.name;
    row.insertCell(1).innerHTML = song.length;
    let actions = row.insertCell(2);
    let deleteButton = createDeleteRowButton(album, song);
    actions.appendChild(deleteButton);
}
/* Here we've defined the createDeleteRowButton! It works very similar to the createDeletAlbumButton, but this time it works on a song! */
function createDeleteRowButton(album, song) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = album.songs.indexOf(song);
        album.songs.splice(index, 1);
        drawDOM();
    };
    return btn;
}
/* Another createDelete button, this time for artists!!! */
function createDeleteArtistButton(artist) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete Artist';
    btn.onclick = () => {
        let index = artists.indexOf(artist);
        artists.splice(index, 1);
        drawDOM();
    };
    return btn;
}