
/////////////////////////////
//////////VARIABLES//////////
/////////////////////////////

let nbrErrors = 0;
let nbrWins = 0;

/////////////////////////////
//////////DOCUMENT///////////
/////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  resetGame();
});

/////////////////////////////
//////////FUNCTION///////////
/////////////////////////////



/* Pour johnny
function resolve() {
  console.log("resolve");
      $.ajax({
          url: `functions/functionsDatabase.php?action=resolve&idPartie=${idPartie}&idModule=${idModule}`,
          success: function(data) {
              $('#result').html(data);
          }
      });
  }
function incrementError() {
  $.ajax({
          url: `functions/functionsDatabase.php?action=incrementError&idPartie=${idPartie}&idModule=${idModule}`,
          success: function(data) {
              $('#result').html(data);
          }
      });
  }
  */

function resetGame() {
  $.ajax({
    url: 'module_3-data.php',
    success: function (data) {
      $('#table').html(data);

      const resultButton = document.querySelector(".result");

      resultButton.addEventListener("click", function () {
        nbrWins++
        if (nbrWins === 1) {
          console.log("Encore 2 fois pour gagner");
        };

        if (nbrWins === 2) {
          console.log("Encore 1 fois pour gagner");
        };

        if (nbrWins === 3) {
          console.warn("Gagner fin du module!, appeller en ajax la fonction Resolve de johnny");
          //resolve(); Pour Johnny
        };
        resetGame();
      });

      const otherWords = document.querySelectorAll("td:not(.result)");

      otherWords.forEach(function (word) {
        word.addEventListener("click", function () {
          if (nbrErrors < 1) {
            console.log("Une chance restante...");
            console.warn("Erreur, appeller en ajax la function IncrementError de johnny");
            nbrErrors++;
            //incrementError(); (Pour Johnny)
          } else {
            console.warn("Perdu, fin du Jeu!");
          }
        });
      });
    }
  });
};
