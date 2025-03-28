import{a as p,S as A,i as n}from"./assets/vendor-DMjJPMAs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();p.defaults.baseURL="https://pixabay.com/api/";const C={key:"49327646-fcd0425046884d30268cb7003",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};async function y(s,t=1){try{const o=await p.get("/",{params:{...C,q:s,page:t}});return{images:o.data.hits,totalResults:o.data.totalHits}}catch(o){return console.error(o),{images:[],totalResults:0}}}let m=null;function S(){return m||(m=new A(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250})),m}async function f(s,t){if(!s.length)return;const o=document.querySelector(".gallery"),c=s.map(({webformatURL:e,largeImageURL:r,tags:l,likes:L,views:F,comments:w,downloads:v})=>`
        <li class="galleryCard">
          <a href="${r}">
            <img class="img" src="${e}" alt="${l}">
          </a>
          <ul class="attributesList">
            <li class="attributesItem"><span class="attributesLabel">Likes</span><br>${L}</li>
            <li class="attributesItem"><span class="attributesLabel">Views</span><br>${F}</li>
            <li class="attributesItem"><span class="attributesLabel">Comments</span><br>${w}</li>
            <li class="attributesItem"><span class="attributesLabel">Downloads</span><br>${v}</li>
          </ul>
        </li>
      `).join("");o.insertAdjacentHTML("beforeend",c),t.refresh()}const h=document.querySelector(".form"),R=document.querySelector(".gallery"),d=document.querySelector(".loader"),a=document.querySelector(".load-more");let i=1,g=0,u="",b=S();h.addEventListener("submit",async s=>{if(s.preventDefault(),u=s.target.elements.search.value.trim(),!u){n.show({message:"Enter a search term!",position:"topRight"});return}R.innerHTML="",i=1,a.classList.add("visually-hidden"),d.style.display="block";try{const{images:t,totalResults:o}=await y(u,i);!t||t.length===0?n.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",iconColor:"#FAFAFB"}):(f(t,b),g=Math.ceil(o/15),i<g&&a.classList.remove("visually-hidden"))}catch(t){console.error("Error while retrieving images:",t),n.show({message:"An error occurred while searching. Please try again!",position:"topRight",maxWidth:"400px",backgroundColor:"#EF4040",messageColor:"#FAFAFB",iconColor:"#FAFAFB"})}finally{d.style.display="none"}h.reset()});a.addEventListener("click",async()=>{a.classList.add("visually-hidden"),d.style.display="block",i+=1;try{const{images:s}=await y(u,i);f(s,b);const t=document.querySelector(".galleryCard");if(t){const o=t.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}i>=g?(a.classList.add("visually-hidden"),n.show({message:"We're sorry, but you've reached the end of search results.",maxWidth:"400px",position:"topRight"})):a.classList.remove("visually-hidden")}catch(s){console.error("Error while retrieving more images:",s),n.show({message:"An error occurred while loading more images. Please try again!",position:"topRight",width:400,backgroundColor:"#EF4040",messageColor:"#FAFAFB",iconColor:"#FAFAFB"})}finally{d.style.display="none"}});
//# sourceMappingURL=index.js.map
