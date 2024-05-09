
document.addEventListener('DOMContentLoaded', async function() {
  document.getElementById('fetchButton').addEventListener('click', function() {
    fetchData();
  });
});


document.addEventListener('DOMContentLoaded', ()=> {
  document.getElementById('indicateRegularPriceButton').addEventListener('click',  () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true,},  (tabs) => {
      const tabId = tabs[0].id
      console.log(tabId)
      chrome.tabs.sendMessage(tabId,{greeting:"enable_selector_regular"})
    })
  });
});
document.addEventListener('DOMContentLoaded', ()=> {
  document.getElementById('indicateDiscountedPriceButton').addEventListener('click',  () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true,},  (tabs) => {
      const tabId = tabs[0].id
      console.log(tabId)
      chrome.tabs.sendMessage(tabId,{greeting:"enable_selector_discounted"})
    })
  });
});


async function fetchData(){
  await chrome.runtime.sendMessage({greeting:'fetch_prices'})
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