(()=>{function e(){document.getElementById("popup").style.display="flex",sessionStorage.setItem("popupShown","true")}document.addEventListener("DOMContentLoaded",(()=>{const e={orderIcon:document.getElementById("order-icon"),popoutCart:document.getElementById("popout-cart"),closeCartButton:document.getElementById("close-cart"),addToCartButtons:document.querySelectorAll(".addcart"),menuIcon:document.getElementById("menu-icon"),popoutMenu:document.getElementById("popout-menu"),closeMenuIcon:document.getElementById("close-menu"),overlay:document.getElementById("overlay")},t=t=>{t.classList.toggle(".show"),e.overlay.classList.toggle(".show")};e.orderIcon.addEventListener("click",(()=>{t(e.popoutCart)})),e.closeCartButton.addEventListener("click",(()=>{e.popoutCart.classList.remove("show"),e.overlay.classList.remove("show")})),e.menuIcon.addEventListener("click",(()=>{t(e.popoutMenu)})),e.closeMenuIcon.addEventListener("click",(()=>{e.popoutMenu.classList.remove("show"),e.overlay.classList.remove("show")})),e.overlay.addEventListener("click",(()=>{e.popoutMenu.classList.remove("show"),e.popoutCart.classList.remove("show"),e.overlay.classList.remove("show")})),e.addToCartButtons.forEach((t=>{t.addEventListener("click",(()=>{e.popoutCart.classList.add("show"),e.overlay.classList.add("show")}))}))})),document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementById("navbar"),t=document.getElementById("nav-placeholder"),o=e.offsetTop;window.addEventListener("scroll",(()=>{t.style.height=window.scrollY>=o?e.offsetHeight+"px":"0px",e.classList.toggle("sticky",window.scrollY>=o)}))})),document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll(".faq-header").forEach((e=>{e.addEventListener("click",(()=>{const t=e.nextElementSibling,o=""!==t.style.maxHeight;document.querySelectorAll(".faq-content").forEach((e=>{e.style.maxHeight=""})),t.style.maxHeight=o?"":`${t.scrollHeight}px`}))}))})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("filter-button"),t=document.getElementById("sort-button"),o=document.querySelectorAll(".product-row .product");e.addEventListener("change",(()=>{return t=e.value,void o.forEach((e=>{const o=e.getAttribute("data-category");e.style.display="all"===t||t===o?"block":"none"}));var t})),t.addEventListener("change",(()=>{const e=t.value,o=document.querySelector(".product-row"),n=Array.from(o.querySelectorAll(".product"));n.sort(((t,o)=>{const n=parseFloat(t.querySelector("h4").innerText.replace("$","")),c=parseFloat(o.querySelector("h4").innerText.replace("$",""));return"low-high"===e?n-c:"high-low"===e?c-n:0})),o.innerHTML="",n.forEach((e=>o.appendChild(e)))}))})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector("#product-1 #type"),t=document.querySelector("#product-1 .unit-price");e.addEventListener("change",(e=>{const o=e.target.selectedOptions[0],n=parseFloat(o.getAttribute("data-price"));t.textContent=`$${n.toFixed(2)}`}))})),document.getElementById("close-button").addEventListener("click",(function(){document.getElementById("popup").style.display="none"})),window.onload=function(){sessionStorage.getItem("popupShown")||setTimeout(e,4e3)}})();