function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=n.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){r[e]=n},n.parcelRequired7c6=o);var i=o("fZKcF"),a=o("jTkUK"),s=o("iQIUW"),c=o("3vGNy"),l={},u=/^\s+|\s+$/g,f=/^[-+]0x[0-9a-f]+$/i,d=/^0b[01]+$/i,p=/^0o[0-7]+$/i,g=parseInt,m="object"==typeof n&&n&&n.Object===Object&&n,y="object"==typeof self&&self&&self.Object===Object&&self,v=m||y||Function("return this")(),h=Object.prototype.toString,w=Math.max,b=Math.min,$=function(){return v.Date.now()};function T(e,n,t){var r,o,i,a,s,c,l=0,u=!1,f=!1,d=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function p(n){var t=r,i=o;return r=o=void 0,l=n,a=e.apply(i,t)}function g(e){return l=e,s=setTimeout(y,n),u?p(e):a}function m(e){var t=e-c;return void 0===c||t>=n||t<0||f&&e-l>=i}function y(){var e=$();if(m(e))return v(e);s=setTimeout(y,function(e){var t=n-(e-c);return f?b(t,i-(e-l)):t}(e))}function v(e){return s=void 0,d&&r?p(e):(r=o=void 0,a)}function h(){var e=$(),t=m(e);if(r=arguments,o=this,c=e,t){if(void 0===s)return g(c);if(f)return s=setTimeout(y,n),p(c)}return void 0===s&&(s=setTimeout(y,n)),a}return n=x(n)||0,j(t)&&(u=!!t.leading,i=(f="maxWait"in t)?w(x(t.maxWait)||0,n):i,d="trailing"in t?!!t.trailing:d),h.cancel=function(){void 0!==s&&clearTimeout(s),l=0,r=c=o=s=void 0},h.flush=function(){return void 0===s?a:v($())},h}function j(e){var n=typeof e;return!!e&&("object"==n||"function"==n)}function x(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==h.call(e)}(e))return NaN;if(j(e)){var n="function"==typeof e.valueOf?e.valueOf():e;e=j(n)?n+"":n}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(u,"");var t=d.test(e);return t||p.test(e)?g(e.slice(2),t?2:8):f.test(e)?NaN:+e}l=function(e,n,t){var r=!0,o=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return j(t)&&(r="leading"in t?!!t.leading:r,o="trailing"in t?!!t.trailing:o),T(e,n,{leading:r,maxWait:n,trailing:o})};const L={form:document.querySelector("#search-form"),submitBtn:document.querySelector("#search-form > button"),gallery:document.querySelector(".gallery"),target:document.querySelector(".guard"),scrollUpBtn:document.querySelector(".btn-scroll-up")};L.submitBtn.insertAdjacentHTML("beforeend",c.svgSearch);const O=new(0,a.default),E=new(e(i))(".gallery a");L.form.addEventListener("submit",(async function(e){e.preventDefault(),L.gallery.innerHTML="",O.resetPage(),O.searchQuery=e.target.elements.searchQuery.value;try{const{totalHits:e,hits:n}=await O.fetchImages();if(O.amountOfPages=Math.ceil(e/40),0===e)throw s.Notify.warning("Sorry, there are no images matching your search query. Please try again."),new Error("Sorry, there are no images matching your search query. Please try again.");s.Notify.success(`Hooray! We found ${e} images.`);U(S(n)),E.refresh()}catch(e){console.log(e)}M.observe(L.target)})),L.scrollUpBtn.addEventListener("click",(function(){q(),window.scrollTo({top:0,behavior:"smooth"})})),window.addEventListener("scroll",l((function(){if(window.scrollY>window.innerHeight)return void L.scrollUpBtn.classList.remove("hidden");q()}),500));let M=new IntersectionObserver((async function(e){e.forEach((async e=>{if(e.isIntersecting){O.increasePage(),O.canLoadMoreImages()||M.unobserve(L.target);try{const{hits:e}=await O.fetchImages();U(S(e)),E.refresh()}catch(e){console.log(e)}}}))}),{root:null,rootMargin:"40px",threshold:1});function S(e){return e.map((({webformatURL:e,largeImageURL:n,tags:t,likes:r,views:o,downloads:i,comments:a})=>`<div class="photo-card">\n                <a class='card-link' href="${e}">\n                <img src="${n}" alt="${t}" loading="lazy" />\n                </a>\n                <div class="info">\n                <p class="info-item">\n    ${c.svgLikes}\n    <span> ${r} </span>  \n    </p>\n    <p class="info-item">\n    ${c.svgViews}\n    <span> ${o} </span>  \n    </p>\n    <p class="info-item">\n    ${c.svgComments}\n    <span> ${a} </span>  \n    </p>\n    <p class="info-item">\n    ${c.svgDownloads}\n    <span> ${i} </span>  \n    </p>\n    </div>\n    </div>`)).join("")}function U(e){L.gallery.insertAdjacentHTML("beforeend",e)}function q(){L.scrollUpBtn.classList.add("hidden")}
//# sourceMappingURL=02-with-infinite-scroll.60847f0a.js.map