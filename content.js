let isRegularCaptureSelectorEnabled = false;
let isDiscountedCaptureSelectorEnabled = false;
let isRegularSelectorChosen = false;
let isDiscountedSelectorChosen = false;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(request.greeting)
        if (request.greeting === "enable_selector_regular"){
          //check if the other is not enabled or if this one is not chosen
          if(!isDiscountedCaptureSelectorEnabled && !isRegularSelectorChosen){
              console.log("regular selector enabled")
              document.addEventListener('click',selectionClickListener)
              document.addEventListener('mouseover', addHoverEffect)
              document.addEventListener('mouseout', removeHoverEffect)
              isRegularCaptureSelectorEnabled = true;
          }
        }
        if (request.greeting === "enable_selector_discounted"){
          //check if the other is not enabled or if this one is not chosen
          if(!isRegularCaptureSelectorEnabled && !isDiscountedSelectorChosen){
            console.log("discounted selector enabled")
            document.addEventListener('click',selectionClickListener)
            document.addEventListener('mouseover', addHoverEffect)
            document.addEventListener('mouseout', removeHoverEffect)
            isDiscountedCaptureSelectorEnabled = true;
          }
        }
        if (request.greeting === "new_product"){
          if(isDiscountedSelectorChosen && isRegularSelectorChosen){
            console.log("valid new product request from popup in content")
            const regularSelector = getCSSSelector(document.getElementsByClassName("regular_price")[0])
            const discountedSelector = getCSSSelector(document.getElementsByClassName("discounted_price")[0])
            const linkToProduct = request.link
            chrome.runtime.sendMessage({greeting:"new_product", regular_price_selector : regularSelector, discounted_price_selector : discountedSelector, link: linkToProduct })
          }
          else{
            console.log('alert should show')
            alert("Please select both regular and discounted price, if it's the same element, choose it as both")
          }
        }
      }
)
function selectionClickListener(e) {
  if (isDiscountedCaptureSelectorEnabled || isRegularCaptureSelectorEnabled){
    
    if(isRegularCaptureSelectorEnabled){
      console.log("regular price chosen")
      e.target.classList.remove('hovered')
      e.target.classList.add('regular_price')
      isRegularSelectorChosen = true
    }
    if(isDiscountedCaptureSelectorEnabled) {
      console.log("discounted price chosen")
      e.target.classList.remove('hovered')
      e.target.classList.add('discounted_price')
      isDiscountedSelectorChosen = true
    }
    isRegularCaptureSelectorEnabled = false
    isDiscountedCaptureSelectorEnabled = false
    console.log("selector disabled")
    document.removeEventListener('mouseover', addHoverEffect)
    document.removeEventListener('mouseout', removeHoverEffect)
    document.removeEventListener('click',selectionClickListener)
  }
}


function addHoverEffect  (event) {
  event.target.classList.add('hovered')
}


function removeHoverEffect (event ){
  event.target.classList.remove('hovered')
}


function getCSSSelector(el){
  let selector = el.tagName.toLowerCase();
  const attrs = el.attributes
  for (var i = 0; i < attrs.length; i++) {
      let attr = attrs.item(i)
      if (attr.name === 'id') selector += `#${attr.value}`;
      if (attr.name === 'class') selector += attr.value.split(' ')
      .filter(c => c !== 'regular_price' && c !== 'discounted_price')
      .map((c) => `.${c}`).join('');
      if (attr.name === 'name') selector += `[${attr.name}=${attr.value}]`;
  }
  return selector
}