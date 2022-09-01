const addBox = document.getElementById('add-modal');
const startAddMovies = document.querySelector('header button');
const cancelAddMovies = addBox.querySelector('.btn--passive');
const confirmAddMovies = addBox.querySelector('.btn--success');
const userInputs = addBox.querySelectorAll('input');
const mainText = document.getElementById('entry-text');
const moviesList= document.querySelector('#movie-list');
const sureDelete = document.querySelector('#delete-modal');
const cancelDelete = sureDelete.querySelector('.btn--passive');
const yesDelete = sureDelete.querySelector('.btn--danger');

//uncompleted (Re-watch the video number 036 in Section 7 DOM)

console.log(cancelDelete);
console.log(yesDelete );


const movies = [];

const hiddeText = () => {
   if (movies.length === 0 ) {
      mainText.style.display = 'block'; 
   }else{
       mainText.style.display = 'none';
   }

}



const deleteMovie = (movieId) =>{
    let index =0;
    for(const movie of movies){
        if (movie.id === movieId){
            break;
        }
        index++;
    }
    movies.splice(index , 1);
    moviesList.children[index].remove();
    closeDeleteMovieHandler();
}

const showDeleteMovieHandler = (movieId)=>{
    sureDelete.classList.add('visible');
    startBackDrop ();
    yesDelete.addEventListener('click' , deleteMovie.bind(null,movieId));
    cancelDelete.addEventListener('click' , closeDeleteMovieHandler );
    
}

const closeDeleteMovieHandler = ()=>{
    sureDelete.classList.remove('visible');
    stopBackdrop();
}


const renderedMoviesElement = (id ,title , image , rate) => {
    const newMoviesList = document.createElement('li');
    newMoviesList.className = 'movie-element';
    newMoviesList.innerHTML = `
    <div class='movie-element__image'>
       <img scr='${image}' alt='${title}' 
    </div>

    <div class='movie-element__info'>
    <h2> ${title} </h2>
    <p> ${rate} / 5 Stars </p>
    </div>
    `
    moviesList.append(newMoviesList);
    newMoviesList.addEventListener('click' ,showDeleteMovieHandler.bind(null , id) );

}


const BackDrop = document.querySelector('#backdrop');


const startBackDrop = () => {
    BackDrop.classList.add('visible');
}

const stopBackdrop = () => {
    BackDrop.classList.remove('visible');

}

const clearInput = () =>{
    for (const input of userInputs){
        input.value = '';
    }
 
}

const closeMovieModalHandler = () =>{
    addBox.classList.remove('visible');
    stopBackdrop();
}

const showMovieModalHandler = () =>{
    addBox.classList.add('visible');
    startBackDrop();
}


const backDropClickHandler = () => {
    closeMovieModalHandler();
    clearInput();
    closeDeleteMovieHandler ();
}

const cancelAddMoviesHandler = () =>{
    closeMovieModalHandler();
    clearInput();
}



const confirmAddMoviesHandler = () => {
    const titleValue = userInputs[0].value;
    const ImgValue = userInputs [1].value;
    const rateValue = userInputs[2].value;

    const movieDetails = {
        id : Math.random() ,
        title : titleValue ,
        image : ImgValue ,
        rate : rateValue
    };

    if (titleValue.trim() === '' || 
     ImgValue.trim() === '' ||
     rateValue.trim() === '' ||
     +rateValue < 1 || +rateValue > 5 ) {

        alert('Please Inter Valid Value .')
        return;
    }
    movies.push(movieDetails);
    console.log(movies);
    closeMovieModalHandler();
    clearInput();
    hiddeText();
    renderedMoviesElement(movieDetails.id ,movieDetails.title, movieDetails.image, movieDetails.rate );

}



startAddMovies.addEventListener('click',showMovieModalHandler);
BackDrop.addEventListener('click' , backDropClickHandler);
cancelAddMovies.addEventListener('click' , cancelAddMoviesHandler);
confirmAddMovies.addEventListener('click' , confirmAddMoviesHandler);