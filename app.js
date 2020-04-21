const app = $('#app');

const BASE_URL = 'https://api.currentsapi.services/v1';
const API_KEY= 'CygYwFKRkZx4ON3n9uAIQn8-XGiB2VGksvsiAX_ro36z12B3';
const LANG = 'en';


const INITIAL_FETCH_KEY = 'initial_news';
const CACHE_TIMEOUT = 1000 * 60 * 5;


const LATEST_NEWS_URL = `${BASE_URL}/latest-news?language=${LANG}&apiKey=${API_KEY}`;

// const fetchJson = (url) => fetch(url)
//     .then(response => response.json());



// async function preFetch () {
//     const preFetchItems = localStorage.getItem(INITIAL_FETCH_KEY)
    
//     if (!preFetchItems) {
//         fetchJson(LATEST_NEWS_URL)
//         .then((data) => {
//             state.fetchedItems = data.news
//             localStorage.setItem(INITIAL_FETCH_KEY , JSON.stringify({
//                 news: data.news, 
//                 timestamp: Date.now() 
//             }));
//             console.log('Brand new news!: ' , data.news)
//         })
//         .catch(err => console.error(err))
//     } else {
//         const { news, timestamp } = JSON.parse(preFetchItems);

//         console.log('The news is older : ' , news);

//         const now = Date.now();

//         if (now - timestamp > CACHE_TIMEOUT) {
//             console.log('Getting new content!')
//             localStorage.removeItem(INITIAL_FETCH_KEY)
//             preFetch();
//         } else {
//             console.log('News cache is still new enough!')
//             state.fetchedItems = news;
//         }
//     };
// };
// console.log(typeof news) 
// preFetch().then((x => console.log(x)));

// const createNewsCard= (newsItem) => {
//     const newsCard = $(`<div id ='feature'>`);

//     const newsImage = $(`<img src='${newsItem.image}'/>`);
//     const newsTitle = $(`${newsItem.title}`);
//     const newsAuthor= $(`${newsItem.author}`);
//     const newsDescription = $(`${newsItem.description}`)

//         newsCard.append(newsItem, newsTitle , newsAuthor, newsDescription)
    
//         return newsCard

// }
// createNewsCard()

// function renderNewsCards(newsItem) {
//     const { image , title , author, description} = newsItem;

//     console.log(newsItem)

//     return 
//     // $(`#feature`).append(createNewsCard)

// }
// renderNewsCards()

async function fetchLatestNews() {
    const url = LATEST_NEWS_URL
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        updateNewsCardsPreview(data.news)
        console.log(data)
        return data;
        
    } catch (error) {
        console.error(error)
    }
}

// fetchLatestNews().then(obj => console.log(obj));

function renderNewsCard(newsItem){

     const {image , title, author, description}  = newsItem;
    // console.log(newsImage)

    return $(`<main id='feature'> 
    <h3>${title ? title : ''}</h3>
    ${image ? `<img src=" ${image}"/>` : ''}
    <h4> Written by: ${author ? author: ''}</h4>
    <p> ${description ? description : ''}</p> 
    </main>`).data('newsItem', newsItem)
}

function updateNewsCardsPreview(newsItems) {
    console.log(newsItems)
    const root = $('#app');


    newsItems.forEach( function(newsItem){
        root.append(renderNewsCard(newsItem))
    })

}
// updateNewsCardsPreview(newsItem)


async function fetchCategories() {
    const url = `${BASE_URL}/available/categories`;

    console.log(url)

    if (localStorage.getItem('categories')) {
        return JSON.parse(localStorage.getItem('categories'));
      }

    try {
        const response = await fetch(url)
        const { categories } = await response.json();
        
        return categories;
    }   catch (error) {
        console.error(error)
    }
    
}; 
fetchCategories();


async function fetchLanguages(){
    const url = `${BASE_URL}/available/languages`
    
    if (localStorage.getItem('languages')) {
        return JSON.parse(localStorage.getItem('languages'));
      }

    try {
        const response = await fetch(url)
        const { languages } = await response.json();
        
        return languages;
    }   catch (error) {
        console.error(error)
    }
}
fetchLanguages();

async function fetchRegions() {
    const url = `${BASE_URL}/available/regions`
    
    if (localStorage.getItem('regions')) {
        return JSON.parse(localStorage.getItem('regions'));
      }

    try {
        const response = await fetch(url)
        const {regions } = await response.json();
        
        console.log(regions)
        return regions;
    }   catch (error) {
        console.error(error)
    }
}
fetchRegions();

async function prefetchEndpoints () {
    try {
        const [ categories, languages, regions]
         = await Promise.all([
            fetchCategories(),
            fetchLanguages(),
            fetchRegions()
        ])
    
        console.log(categories)
    $('.category-count').text(`(${categories.length})`);

    categories.forEach(category => {
        $('#select-category').append($(`<option value='${category}'>'${category}'</option>`))
    });

    $('.language-count').text(`(${length})`)

    for(const language in languages){

        $('#select-language').append($(`<option value='${languages[language]}'>'${language}'</option>`))
    };

    $('.region-count').text(`(${length})`)

    for(const region in regions) {
        $('#select-region').append($(`<option value='${regions[region]}'>'${region}'</option>`))
    };
} catch (error) {
    console.error(error)
}};

function buildSearchString(){
    const categorySelected = $('#select-category').val();
    const languageSelected = $('#select-language').val();
    const regionSelected = $('#selecct-region').val();
    const keywordEntered = $('#keywords').val();

    const url = `${BASE_URL}/search?language${languageSelected}&${categorySelected}&${regionSelected}&${keywordEntered}&apiKey=${API_KEY}`

    console.log(url)

    return url;
}

buildSearchString()
prefetchEndpoints()