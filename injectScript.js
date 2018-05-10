var s = document.createElement('script');
s.setAttribute('type', 'text/javascript');
s.setAttribute('src', chrome.extension.getURL('cookieclicker.js'));
(document.head||document.documentElement).appendChild(s);
s.parentNode.removeChild(s);