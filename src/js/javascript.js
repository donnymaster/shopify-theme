(
    function(){
        var butMobile = document.querySelector('.mobile-but');
        var menuMobile = document.querySelector('.right-menu');

        butMobile.addEventListener('click', function(){
            menuMobile.classList.toggle('show-menu');
        });
    }
)(); 


window.onload = function(){
    var getSort = window.location.search.substr(1);
    if(getSort.indexOf('sort_by')+1){  
        if(getSort.indexOf('&')){
            getSort = getSort.substring(0,getSort.indexOf('&'));
            console.log(getSort);
        }
        var links = document.querySelectorAll('.pag-arrow-tt a');
        for (var i = 1; i < links.length - 1; ++i) {
            links[i].href += '&' + getSort;
          }
    } 
    if(location.pathname == '/cart'){
        generateOperationProduct();
    }
    soldProduct();
}   

function enumObj(mass, num){
    mass.forEach(function(item){
        if(num == item.id){
            item.el.classList.remove('hide-img');
            item.el.classList.add('show-img');
        }else{
            item.el.classList.remove('show-img');
            item.el.classList.add('hide-img');
        }
    });
}

function clearClassImg(imgs, num){
    imgs.forEach(function(item){
        if(item.classList.contains('click-fo')){
            item.classList.remove('click-fo');
        }
    });
}
 
function enumElement(elements){
    var massEll = [];
    for(var i = 0; i < elements.length; i++){ 
        massEll.push({
            el: elements[i],
            id: elements[i].classList[0]
        })
    } 
    return massEll;
}  
   
function slideFun(){
    var arrImgShow = document.querySelectorAll('.abs-img-prod'); 

    if(arrImgShow.length > 1){  
        var objMass = enumElement(arrImgShow);
        var arrayButImg = document.querySelectorAll('.click-mini-img div.mini-img-item');  
        arrayButImg.forEach(function(item){
          item.addEventListener('click',function(target){
              var thisL = '';
              var buffPath = event.path || (event.composedPath && event.composedPath());
              var clickItem = buffPath[1];
              if(buffPath[0].tagName == 'IMG'){
                thisL = buffPath[1];
              }else{
                thisL = buffPath[0];
              } 
              if(!thisL.classList.contains('click-fo')){
                clearClassImg(arrayButImg); 
                thisL.classList.add('click-fo');
                enumObj(objMass, thisL.classList.item(0));
              } 
          }); 
        });
    }
}
slideFun();

function newEventProdduct(objPlus, objMinus, target, nextElement){
         
        if(window.innerWidth < 749){
            var nextEl = nextElement.nextSibling;

            nextEl.querySelector('.plus-count-pro').addEventListener('click', function(event){
                event.preventDefault(); 
                var elInput = nextEl.querySelector('input');
                elInput.setAttribute('value', parseFloat(nextEl.querySelector('input').value) + 1);
                target[0].value = parseFloat(target[0].value) + 1;  
            });

            nextEl.querySelector('.minus-count-pro').addEventListener('click', function(event){
                event.preventDefault(); 
                var elInput = nextEl.querySelector('input');
                if(nextEl.querySelector('input').value != 1){
                elInput.setAttribute('value', parseFloat(nextEl.querySelector('input').value) - 1);
                target[0].value = parseFloat(target[0].value) - 1;  
                }
            }); 
        }else{
  
            objPlus[0].addEventListener('click', function(event){
                event.preventDefault();
                target[0].value = parseFloat(target[0].value) + 1;  
            }); 

            objMinus[0].addEventListener('click', function(event){
                event.preventDefault();
                if(target[0].value != 1){
                    target[0].value = parseFloat(target[0].value) - 1; 
                } 
            });
        }

}

function generateOperationProduct(){
    // all elements
    var products = document.querySelectorAll('.cart__row.border-bottom');
    for(var i = 0; i < products.length; i++){
        newEventProdduct(products[i].querySelectorAll('.plus-count-pro'), 
                         products[i].querySelectorAll('.minus-count-pro'),  
                         products[i].querySelectorAll('input'),
                         products[i].nextSibling);
    }  
} 

  
function soldProduct(){
    var butsBuy = document.querySelectorAll('.wrapped-button-cart button');
    if(butsBuy.length > 0){
        for(var i = 0; i < butsBuy.length; i++){ 
            if(butsBuy[i].innerText == 'SOLD OUT'){
                butsBuy[i].addEventListener('click', function(event){event.preventDefault()}); 
            }
        }
    }else{

    } 
}