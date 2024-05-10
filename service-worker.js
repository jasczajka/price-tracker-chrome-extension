chrome.runtime.onInstalled.addListener((details) => {
    if(details.reason !== "install" && details.reason !== "update") return;
    chrome.storage.local.set({'test':['https://www.zalando.pl/vans-authentic-tenisowki-niskie-czarny-va212z002-802.html?size=43','#product-module-price > div.product-price > div','#main-content > div.I7OI1O.C3wGFf > div > div._5qdMrS.VHXqc_.rceRmQ._4NtqZU.mIlIve.ypPCAR.KwRvru.DgFgr2 > x-wrapper-re-1-3 > div.hD5J5m > div > div > p > span.sDq_FX._4sa1cA.dgII7d.Km7l2y']})
  });

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if(message.greeting === 'fetch_prices'){
    await chrome.storage.local.set({'test1':'test2'})
    await chrome.storage.local.set({'test2':'test3'})
    const all = await chrome.storage.local.get()
    for (const [key, val] of Object.entries(all)) {
      console.log(key,' ',val)
    }
  }
  if(message.greeting === 'new_product'){
    console.log('received a product to track')
    console.log('regular price selector: ' ,message.regular_price_selector)
    console.log('discounted price selector: ' ,message.discounted_price_selector)
    console.log('link: ', message.link)
  }
})
