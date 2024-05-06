
document.addEventListener('DOMContentLoaded', async function() {
  // Add event listener for click on the fetch button
  document.getElementById('fetchButton').addEventListener('click', function() {
    fetchData();
  });
});


document.addEventListener('DOMContentLoaded', ()=> {
  document.getElementById('getSelectorButton').addEventListener('click',  () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true,},  (tabs) => {
      const tabId = tabs[0].id
      console.log(tabId)
      chrome.tabs.sendMessage(tabId,{greeting:"enable_selector"})
    })
  });
});



async function fetchData(){
  await chrome.runtime.sendMessage({greeting:'fetch_prices'})
}
