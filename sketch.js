const ledSound = new Audio('audios/ledOn.wav');
const errorSound = new Audio('audios/error.wav');

let nbrErrors = 0;
let nbrWins = 0;
let gameEnded = false; // Variable pour indiquer si le jeu est terminé ou non

document.addEventListener("DOMContentLoaded", function () {
  resetGame();
});

function ledOnClickSound () {
  ledSound.currentTime = 0;
  ledSound.play(); 
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
        if (!gameEnded) { // Vérifier si le jeu est terminé
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
            gameEnded = true; // Marquer le jeu comme terminé
          }
          resetGame();
        }
      });

      const otherWords = document.querySelectorAll("td:not(.result)");

      otherWords.forEach(function (word) {
        word.addEventListener("click", function () {
          if (!gameEnded && nbrErrors < 1) { // Vérifier si le jeu est terminé et le nombre d'erreurs
            console.log("Une chance restante...");
            console.warn("Erreur, appeller en ajax la function IncrementError de johnny");
            nbrErrors++;
            errorOnClickSound();
            //incrementError(); (Pour Johnny)
          } else {
            console.warn("Perdu, fin du Jeu!");
          }
        });
      });
    }
  });
};
