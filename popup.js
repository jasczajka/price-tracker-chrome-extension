
document.addEventListener('DOMContentLoaded', async function() {
  document.getElementById('fetchButton').addEventListener('click', function() {
    fetchData();
  });
});


document.addEventListener('DOMContentLoaded', (e)=> {
  document.getElementById('indicateRegularPriceButton').addEventListener('click',  () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true,},  (tabs) => {
      const tabId = tabs[0].id
      console.log(tabId)
      chrome.tabs.sendMessage(tabId,{greeting:"enable_selector_regular"})
    })
  });
});
document.addEventListener('DOMContentLoaded', ()=> {
  document.getElementById('indicateDiscountedPriceButton').addEventListener('click',  (e) => {
    chrome.tabs.query({active: true, lastFocusedWindow: true,},  (tabs) => {
      const tabId = tabs[0].id
      console.log(tabId)
      chrome.tabs.sendMessage(tabId,{greeting:"enable_selector_discounted"})
    })
  });
});

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById("newProductButton").addEventListener('click', (e)=>{
    chrome.tabs.query({active: true, lastFocusedWindow: true,},  (tabs) => {
      const tabId = tabs[0].id
      const linkToProduct = document.getElementById("product_link").value
      console.log(linkToProduct)
      chrome.tabs.sendMessage(tabId,{greeting:"new_product",link: linkToProduct})
    })

  });
});


async function fetchData(){
  chrome.runtime.sendMessage({greeting:'fetch_prices'})
}

