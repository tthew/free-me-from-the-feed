;(function () {
  var LEFT_NAV_ITEM_SELECTOR = '[data-testid="left_nav_item_News Feed"]'
  var NEWS_FEED_SELECTOR = '.home #contentArea'
  var FEED_REPLACEMENT_HTML = '<h1>Nothing to see here!</h1>'
  var LOCATION_WATCHER_INTERVAL = 1000
  var ELEMENT_WAIT_TIMEOUT = 100

  function waitForElement (selector) {
    return new Promise(function (resolve, reject) {
      var intervalId = setInterval(function () {
        var el = document.querySelector(selector)
        if (el) {
          clearInterval(intervalId)
          return resolve(el)
        }
      }, ELEMENT_WAIT_TIMEOUT)
    })
  }

  function waitForLeftNavAndHide () {
    waitForElement(LEFT_NAV_ITEM_SELECTOR)
    .then(function (el) {
      var li = el.parentNode
      li.parentNode.removeChild(li)
    })
  }

  function waitForNewsFeedAndHide () {
    waitForElement(NEWS_FEED_SELECTOR)
    .then(function (el) {
      el.setAttribute('style', 'display: block !important')
      el.innerHTML = FEED_REPLACEMENT_HTML
    })
  }

  function showContentArea () {
    var el = document.querySelector(NEWS_FEED_SELECTOR)
    el.setAttribute('style', 'display: block !important')
  }

  function watchLocation () {
    var old = {}
    var cur
    return function () {
      cur = window.location
      if (cur.pathname !== old.pathname ||
          cur.hash !== old.hash) {
        if (cur.pathname !== '/') return showContentArea()
        waitForLeftNavAndHide()
        waitForNewsFeedAndHide()
      }
      old = Object.assign({}, window.location)
    }
  }

  console.log('FreeMeFromTheFeed News Feed Blocker is enabled. To disable visit \'extensions\'.')
  watchLocation()
  setInterval(watchLocation(), LOCATION_WATCHER_INTERVAL)
})()
