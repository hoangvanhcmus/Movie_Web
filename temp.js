// const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=1b28abc5f4b5a2e02a3472c81a774c76&language=en-US&page=${page}`;

async function listMovie(url, pages) {
  const response = await fetch(url + pages);
  const ls_Movie = await response.json();
  console.log(ls_Movie);
  var path = "https://image.tmdb.org/t/p/w200";
  $("#itemMovie").empty();
  for (const item of ls_Movie.results) {
    $("#itemMovie").append(`
            <div class="col-md-3 hei_item" >
              <div class="card mb-4 shadow-sm">
                <p class = "tag">${"Rate: " + item.vote_average}</p>
                <img class="img_hei" src="${path + item.poster_path}"/>
                <div class="card-body">
                  <p class="card-text">${item.name}</p>
                  <p class="date_item">${item.first_air_date}</p>
                  <button class="btn_item" onclick = "detailMovie(${
                    item.id
                  })">Chi tiết</button>
                </div>
              </div>
            </div>
            
      `);
  }
}

// async function loadLs() {
//   var url = `https://api.themoviedb.org/3/tv/top_rated?api_key=1b28abc5f4b5a2e02a3472c81a774c76&language=en-US&page=`;
//   let page = 1;
//   const response = await fetch(url + page);
//   const load_ls = await response.json();
//   if (load_ls.total_pages == undefined) pages = 0;
//   else if (load_ls.total_pages <= 10) pages = load_ls.total_pages;
//   else if (load_ls.total_pages > 10) pages = 10;
//   if (page >= 0) {
//     for (let i = 1; i <= pages; i++) {
//       $("pagination").append(`
//       <li><button onclick = "listMovie(${url},${i})">${i}</button></li>`);
//     }
//   }
// }

async function searchMovieName(event) {
  event.preventDefault();
  const name_Movie = $("#search_movie").val();
  console.log(name_Movie);
  const url = `https://api.themoviedb.org/3/search/tv?api_key=1b28abc5f4b5a2e02a3472c81a774c76&language=en-US&query=${name_Movie}&page=`;
  pages = 1;
  $("#itemMovie").empty();
  listMovie(url, pages);
}

async function searchMovieActor(event) {
  event.preventDefault();
  const name_Movie = $("#search_movie").val();
  console.log(name_Movie);
  const url = `https://api.themoviedb.org/3/search/person?api_key=1b28abc5f4b5a2e02a3472c81a774c76&language=en-US&query=${name_Movie}&page=1&include_adult=false`;
  $("#itemMovie").empty();
  listMovieActor(url);
}

async function listMovieActor(url) {
  const response = await fetch(url);
  const ls_Movie = await response.json();
  console.log(ls_Movie);
  var path = "https://image.tmdb.org/t/p/w200";
  $("#itemMovie").empty();

  console.log(ls_Movie.results.known_for);
  for (const item of items.known_for) {
    $("#itemMovie").append(`
            <div class="col-md-3 hei_item" >
              <div class="card mb-4 shadow-sm">
                <p class = "tag">${"Rate: " + item.vote_average}</p>
                <img class="img_hei" src="${path + item.poster_path}"/>
                <div class="card-body">
                  <p class="card-text">${item.title}</p>
                  <p class="date_item">${item.release_date}</p>
                  <button class="btn_item" onclick = "detailMovie(${
                    item.id
                  })">Chi tiết</button>
                </div>
              </div>
            </div>        
      `);
  }
}

async function detailMovie(id) {
  url = `https://api.themoviedb.org/3/tv/${id}?api_key=1b28abc5f4b5a2e02a3472c81a774c76&language=en-US`;
  $("#itemMovie").empty();
  var temp = "https://image.tmdb.org/t/p/w500";
  const response = await fetch(url);
  const detail_movie = await response.json();
  var gen = [];
  var namePro = [];
  for (const item of detail_movie.genres) {
    gen.push(item.name);
  }
  for (const item of detail_movie.production_companies) {
    namePro.push(item.name);
  }
  $("#itemMovie").append(`
  <div class="col-md-6">
    <img class="img-fluid content_detail" src="${temp +
      detail_movie.poster_path}"/>
  </div>

  <div class="col-md-6">
    <h2 class="my-3 tit">${detail_movie.name}</h2>
    <div class="content">
      <dl>
          <span class="dt">Overview:</span>
          <span>${detail_movie.overview}</span>
      </dl>
      <dl>
          <span class="dt">Release:</span>
          <span>${detail_movie.first_air_date}</span>
      </dl>
      <dl>
          <span class="dt">Genres:</span>
          <span>${gen}</span>
      </dl>
      <dl>
          <span class="dt">Vote:</span>
          <span>${detail_movie.vote_count}</span>
      </dl>
      <dl>
          <span class="dt">Status:</span>
          <span>${detail_movie.status}</span>
      </dl>
      <dl>
          <span class="dt">Production:</span>
          <span>${namePro}</span>
      </dl>
    </div>
  </div>
  <h3 class="my-4 tit content_detail">Actor</h3>
  </div>
  <div class="row ls_actor" id = "info"></div> 
  `);
  infoCast(id);
}

async function infoCast(id) {
  urlCast = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=1b28abc5f4b5a2e02a3472c81a774c76&language=en-US`;
  const response = await fetch(urlCast);
  const castMovie = await response.json();
  var path = "https://image.tmdb.org/t/p/w300";

  for (const item of castMovie.cast) {
    $("#info").append(`
      <div class="col-md-3 col-sm-6 mb-4 actor">
        <a href="#">
          <img class="img-fluid" src="${path + item.profile_path}"/>
        </a>
        <div>
          <p class="dt">${item.name}</p>
          <p>${item.character}</p>
      </div>
    `);
  }
}

listMovie(
  `https://api.themoviedb.org/3/tv/top_rated?api_key=1b28abc5f4b5a2e02a3472c81a774c76&language=en-US&page=`,
  `1`
);

{
  /* <h3 class="my-4 tit content_detail">Actor</h3>
  <div class="row">
    <div class="col-md-3 col-sm-6 mb-4">
      <a href="#">
        <img class="img-fluid" src="#"/>
      </a>
      <div content_detail>Nguyen Hoang Son</div>
    </div>
  </div> */
}