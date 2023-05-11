const apiKey = '41ec00a7a5dcc7d8a86ba2b2cf7a068d';
const movieId = 550; // Replace with the actual movie ID

const itemsPerPage = 20
let currentPage = 1
// Construct the API URL
//const url = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}`;
const SEARCHAPI =
"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const imgPath = "https://image.tmdb.org/t/p/w1280";
let main = document.getElementById('content')



// Send a GET request to the API

async function getMovies(currentPage){
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}`;
  const resp = await fetch(url)
  const respData = await resp.json()
  //console.log(respData.results  )
  // console.log(respData.results.length)
  showMovies(respData.results);
}

//handling the next button in the last
const navNextBtn = document.getElementById('nextBtn')

navNextBtn.addEventListener('click',() => {
 getMovies(currentPage++)
});

//handling the navigator previous button
const navPrevBtn = document.getElementById('prevBtn')
//navPrevBtn.disabled = currentPage == 1
navPrevBtn.addEventListener('click', () =>{
   getMovies(currentPage--)
});
const navFirstBtn = document.getElementById('first-page')
navFirstBtn.addEventListener('click', () =>{
   getMovies(1)
});
const navSecondBtn = document.getElementById('second-page')
navSecondBtn.addEventListener('click', () =>{
   getMovies(2)
});
const navThirdBtn = document.getElementById('third-page')
navThirdBtn.addEventListener('click', () =>{
   getMovies(3)
});

//getting the home page by page no. 1
getMovies(currentPage)

//function to display all the things on the screen
function showMovies(movies){
main.innerHTML = ""
movies.forEach((movie) =>{
  // console.log(movie)
const {backdrop_path, title, vote_average, overview}  = movie;
const movieEl = document.createElement("div")
movieEl.classList.add("movie")
movieEl.innerHTML = `
<img src ="${imgPath + backdrop_path}"
alt = "${title}"
/>

<div class ="movie-info">
<h3>${title}</h3>
<span class = "${getClassByRate(
  vote_average
)}"> ${vote_average.toFixed(1)}</span>
</div>

<div class="overview">
<h3>Overview:</h3>
${overview}
</div>

`;
main.appendChild(movieEl)
});
}
// function goToHome(){
//   window.location.href = "/";
// }
function getClassByRate(vote){
  if(vote > 8){
    return "green"
  }else if(vote >=5){
    return "orange"
  }else{
    return "red"
  }
}
form.addEventListener("click", (e) =>{
e.preventDefault();
const searchTerm = search.value;
if (searchTerm) {
getMovies(SEARCHAPI + searchTerm);
search.value = "";
}
});




// fetch(url)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Extract the movie details
//     const { title, release_date, overview, vote_average } = data;

//     // Print the movie details
//         console.log(`Title: ${title}`);
//         // const div = document.createElement('div')
//         // div.classList.add('title')
//         displayTitle.innerHTML= title
    
//         console.log(`Release Date: ${release_date}`);
//         console.log(`Overview: ${overview}`);
//         console.log(`vote_average: ${vote_average}`);
    
//   })
//   .catch(error => {
//     console.error('Error:', error.message);
//   });


//**************************  TO DO  ********************************* */
// 1. Add next and prev button and load more data in it --------> DONE
// 2. Make the search button on the navbar working ------>  DONE
// 3. Remove the other search Button ---------> DONE
// 4. Understand the code of the css file and make any changes if possible and if it will look good 
// 5. Make the Home Button on the Navbar working -----------> DONE
// 6. 
// *************************   END   ********************************** /