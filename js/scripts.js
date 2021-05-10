$(document).ready(function() {
  window.fails = 1;
  window.max_fails = 7;
  window.possible_words = [
    ["adam", "primul om"],
    ["eva", "prima femeie"],
    ["avraam", "părintele credincioșilor"],
    ["moise", "a scris Geneza"],
    ["pavel", "a scris epistole"],
    ["zacheu", "s-a urcat într-un copac"],
    ["estera", "împărăteasă frumoasă"],
    ["mardoheu", "apare în cartea Estera"],
  ];
  window.secret_word = "hangman";
  window.public_word = "_______";
  window.game_is_finished = false;
  window.wrong_letters = [];
  window.hint = "";


  function replace_str(str, pos, value){
    var arr = str.split('');
    arr[pos]=value;
    return arr.join('');
  }


  function choose_word() {
    var random_number = Math.floor(Math.random() * possible_words.length);
    selected_word = possible_words[random_number];
    secret_word = selected_word[0];
    window.hint = selected_word[1];
    public_word = Array(secret_word.length + 1).join("_");

    for(var i = 0; i <= secret_word.length; i++) {
      if(secret_word[i] == " ") {
        public_word = replace_str(public_word, i, " ");
      }
    }
  }


  function game_over() {
    $("p#status").text("Ai pierdut. Cuvântul era: " + secret_word.toUpperCase());
    game_is_finished = true;
  }


  function fail() {
    $("img#main-image").attr("src", "./assets/" + fails.toString() + ".png");
    $("p#status").text("Litere greșite: " + wrong_letters);

    if(fails > max_fails) {
      game_over();
    } else {
      fails++;
    }
  }


  function win() {
    $("p#status").text("Felicitări!");
    $("p#status").css({"background": "#2ecc71"});
    $("img#main-image").attr("src", "./assets/win.gif");
    game_is_finished = true;
  }


  function test_letter(letter) {
    return secret_word.indexOf(letter);
  }


  function refresh_public_word() {
    $("p#public-word").text(public_word);
  }


  function add_wrong_letter(letter) {
    if (wrong_letters.indexOf(letter) > -1)
      return false;
    else {
      wrong_letters.push(letter);
      return true;
    }
  }

  function init_letters() {
    var letters = ["a", "ă", "â", "î", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "ș", "t", "ț", "u", "v", "w", "x", "y", "z"];
    for (var i = 0; i < letters.length; i++) {
      $("p#letters").append(
        "<a href='' class='btn btn-warning btn-sm btn-letter'>" + letters[i].toUpperCase() + "</a>"
      );
    }
  }

  function start_game() {
    choose_word();
    init_letters();
    refresh_public_word();
    $("p#status").text("Cine a fost? Ajutor: " + window.hint);

    $("a.btn-letter").on("click", function(evt) {
      evt.preventDefault();

      if(!game_is_finished) {
        var key = $(this).text().toLowerCase();

        if (key.match(/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/g)) {
          var test = test_letter(key);
          if(test != -1) {
            for(var i = 0; i <= secret_word.length; i++) {
              if(secret_word[i] == key) {
                public_word = replace_str(public_word, i, key);
              }
            }

            refresh_public_word();

            if(public_word == secret_word) {
              win();
            }
          } else if (add_wrong_letter(key)){
            fail();
          }
        }
      }
    });

    $(document).keypress(function(event) {
      if(!game_is_finished) {
        var key = String.fromCharCode(event.which).toLowerCase();
        if (key.match(/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/g)) {
          var test = test_letter(key);
          if(test != -1) {
            for(var i = 0; i <= secret_word.length; i++) {
              if(secret_word[i] == key) {
                public_word = replace_str(public_word, i, key);
              }
            }

            refresh_public_word();

            if(public_word == secret_word) {
              win();
            }
          } else if (add_wrong_letter(key)){
            fail();
          }
        }
      }
    });
  }

  start_game();
});
