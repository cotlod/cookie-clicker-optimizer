
var cookieClickerTab;

function runScript(){    
    chrome.tabs.executeScript(cookieClickerTab.id, {file: 'injectScript.js'});
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("checkPage").addEventListener("click", runScript);
});

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
   for(var i = 0; i < tabs.length; i++){
        if(tabs[i].url == "http://orteil.dashnet.org/cookieclicker/"){
            cookieClickerTab = tabs[i];
            break;
        }
   }
});