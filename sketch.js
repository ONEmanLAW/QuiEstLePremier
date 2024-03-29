const ledSound2 = new Audio('audios/ledOn.wav');
const errorSound = new Audio('audios/error.wav');

let nbrErrors = 0;
let nbrWins = 0;


document.addEventListener("DOMContentLoaded", function () {
  resetGame();
});

// function resolve() {
//   console.log(idPartie);
//   console.log(idModule);
//       $.ajax({
//           url: `../functions/functionsDatabase.php?action=resolve&idPartie=${idPartie}&idModule=${idModule}`,
//           success: function(data) {
//               $('#result').html(data);
//           }
//       });
//   }
// function incrementError() {
//   $.ajax({
//           url: `../functions/functionsDatabase.php?action=incrementError&idPartie=${idPartie}&idModule=${idModule}`,
//           success: function(data) {
//               $('#result').html(data);
//           }
//       });
//   }


function ledOnClickSound () {
  ledSound2.currentTime = 0;
  ledSound2.play(); 
};

function errorOnClickSound () {
  errorSound.currentTime = 0;
  errorSound.play(); 
};

function resetGame() {
  $.ajax({
    url: 'module_3-data.php',
    success: function (data) {
      $('#table').html(data);

      const resultButton = document.querySelector(".result");

      resultButton.addEventListener("click", function () {
       
          nbrWins++;
          if (nbrWins === 1) {
            console.log("Encore 2 fois pour gagner");
            document.querySelector('.led-etape-1').src = 'assets/ledVerteEtape.png';
            ledOnClickSound();
          } else if (nbrWins === 2) {
            console.log("Encore 1 fois pour gagner");
            document.querySelector('.led-etape-2').src = 'assets/ledVerteEtape.png';
            ledOnClickSound();
          } else if (nbrWins === 3) {
            console.warn("Gagner fin du module!, appeller en ajax la fonction Resolve de johnny");
            document.querySelector('.led-etape-3').src = 'assets/ledVerteEtape.png';
            document.querySelector('.led img').src = 'assets/ledVerte.png';
            ledOnClickSound();
          }
          resetGame();
      });

      const otherWords = document.querySelectorAll("td:not(.result)");

      otherWords.forEach(function (word) {
        word.addEventListener("click", function () {
          if (nbrErrors < 1) { // Vérifier si le jeu est terminé et le nombre d'erreurs
            console.log("Une chance restante...");
            console.warn("Erreur, appeller en ajax la function IncrementError de johnny");
            nbrErrors++;
            errorOnClickSound();
            //incrementError(); (Pour Johnny)
          } else {
            console.warn("Perdu, fin du Jeu!");
            errorOnClickSound();
          }
        });
      });
    }
  });
};
