// javascript for highscore page
  
// Retrieves scores from localStorage, creates a list of values/scores, and appends each item
// in the list to the ordered highscore list 
  
function printHighscores() { 
    let highscores = 
        JSON.parse( 
            window.localStorage.getItem( 
                "highscores"
            ) 
        ) || []; 
    highscores.sort(function (a, b) { 
        return b.score - a.score; 
    }); 
    highscores.forEach(function ( 
        score 
    ) { 
        let liTag = 
            document.createElement( 
                "li"
            ); 
        liTag.textContent = 
            score.name + 
            " - " + 
            score.score; 
        let olEl = 
            document.getElementById( 
                "highscores"
            ); 
        olEl.appendChild(liTag); 
    }); 
} 
  
// Function clears previous scores when user clicks 'clear highscores'
function clearHighscores() { 
    window.localStorage.removeItem( 
        "highscores"
    ); 
    window.location.reload(); 
} 
document.getElementById( 
    "clear"
).onclick = clearHighscores; 
  
printHighscores();