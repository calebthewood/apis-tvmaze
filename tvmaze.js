"use strict";

const $showsList = $("#showsList");
const $episodesList = $(".episodesList")
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const API_BASE_URL = "http://api.tvmaze.com";
const ALT_IMAGE = 'https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300';


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

/*
  event listener > searchForShowAndDisplay
   > getShowByTerm
    //send axios get request to query API
      //accepts search term, returns array
   > populateShows
  */


async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  const nameSearch = `${API_BASE_URL}/search/shows`;
  //http://api.tvmaze.com/search/shows?q=[searchquery]
  //const idSearch = `http://api.tvmaze.com/shows/${val}/episodes`;
  //http://api.tvmaze.com/shows/[showid]/episodes
  //make a nested object season = season iteration:idSearch[i].episodes
  //season[i]

  const showsArray = await axios.get(nameSearch, { params: { q: term } });

  const shows = [];

  for (let i = 0; i < showsArray.data.length; i++) {

    let image = showsArray.data[i].show.image;

    if (!image) {
      image = ALT_IMAGE;
    } else {
      image = image.medium;
    }

    shows.push({
      id: showsArray.data[i].show.id,
      name: showsArray.data[i].show.name,
      summary: showsArray.data[i].show.summary,
      image: image
    });
  }
  return shows;
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src='${show.image}'
              alt="Oops"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button value="${show.id}" class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);

    $showsList
    .append($show)
    .on("click", `${}`, (e) => {
      
      const showId = $(e.target).parent().parent().parent().attr("data-show-id");
      getEpisodesOfShow(showId)
      //console.log("button val=",$(e.target).val())
    }/*getEpisodesOfShow*/)
  }
}
//$showEpisodeButton =

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */


//two parts, we may need two conductor
async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  //console.log(typeof(term)) <--this is a string
  const shows = await getShowsByTerm(term); //arrray object of shows
  const episodes = await getEpisodesOfShow
  $episodesArea.hide();
  populateShows(shows);
  //populateEpisodes(episodes);
  pop
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});



/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */
//retrieve id from dom
async function getEpisodesOfShow(showId) {
  console.log("showId=", showId)
  //http://api.tvmaze.com/shows/[showid]/episodes
  //const API_BASE_URL = "http://api.tvmaze.com";
  //const showsArray = await axios.get(nameSearch, { params: { q: term } });
  const episodeSearch = `${API_BASE_URL}/shows/${show.id}/episodes`;
  console.log(episodeSearch)
  episodeInfo = await axios.get(episodeSearch)
  

 }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
