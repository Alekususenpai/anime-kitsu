const apiForm = document.getElementById('apiForm');
const searchTerm = document.getElementById('search').value;
const optionSelected = document.getElementById('options').value;
const option = document.getElementById('options');
const button = document.querySelector('#click');

option.addEventListener('change', () => {
          const search = document.getElementById('search');
          const optionSelected = document.getElementById('options').value;
          if (optionSelected === 'categories') {
                    search.setAttribute('placeholder', 'Searching by category');
          } else { search.setAttribute('placeholder', 'Searching by name'); }
})



apiForm.addEventListener('submit', (event) => {
          event.preventDefault()
          const searchTerm = document.getElementById('search').value;
          const search = document.getElementById('search');
          if (searchTerm === '') {
                    search.classList.add('shake');
                    setTimeout(() => {
                              search.classList.remove('shake');
                    }, 1000);
          } else {
                    searchAnime()
          }
})



function searchAnime() {
          const searchTerm = document.getElementById('search').value;
          const optionSelected = document.getElementById('options').value;
          const request = axios.get(`https://kitsu.io/api/edge/anime?filter[${optionSelected}]=${searchTerm}`)
                    .then(res => {
                              const div = document.querySelector('.results');
                              div.innerHTML = '';
                              for (let i = 0; i < res.data.data.length; i++) {
                                        const image = document.createElement('img');
                                        image.src = res.data.data[i].attributes.posterImage.small;

                                        const titles = document.createElement('h3');
                                        titles.innerText = res.data.data[i].attributes.titles.en_jp;

                                        const popularity = document.createElement('h4');
                                        popularity.innerText = `Average Rating: ${res.data.data[i].attributes.averageRating}`;
                                        const nullpop = res.data.data[i].attributes.averageRating;

                                        const startDate = document.createElement('h4');
                                        startDate.innerText = `Start Date: ${res.data.data[i].attributes.startDate}`;
                                        const nullstart = res.data.data[i].attributes.startDate;

                                        const endDate = document.createElement('h4');
                                        endDate.innerText = `End Date: ${res.data.data[i].attributes.endDate}`;
                                        const nullend = res.data.data[i].attributes.endDate;

                                        const synopsis = document.createElement('p');
                                        synopsis.innerText = `Synopsis: ${res.data.data[i].attributes.synopsis}`;
                                        const nullsynop = res.data.data[i].attributes.synopsis;

                                        const divContainer = document.createElement('div');
                                        divContainer.classList.add('column');

                                        divContainer.appendChild(image);
                                        divContainer.appendChild(titles);

                                        if (res.data.data[i].attributes.titles.en_jp === undefined) {
                                                  titles.innerText = 'Name not available'
                                        }

                                        if (nullpop !== null && nullpop !== '') { divContainer.appendChild(popularity); }
                                        if (nullstart !== null && nullstart !== '') { divContainer.appendChild(startDate); }
                                        if (nullend !== null && nullend !== '') { divContainer.appendChild(endDate); }
                                        if (nullsynop !== null && nullsynop !== '') { divContainer.appendChild(synopsis); }

                                        const div = document.querySelector('.results');

                                        div.appendChild(divContainer);

                                        document.getElementById("search").value = ''

                                        div.scrollIntoView({ behavior: "smooth" });
                              }
                    }).catch(err => {
                              console.log('Encountered a mistake, check code', err)
                    })
}


function cleanUp() {

}

// erase old results - show more results 