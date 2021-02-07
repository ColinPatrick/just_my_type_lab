let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentenceCount = 0;
let letCount = 0;
const letterSpace = 17;
let gameActive = true;
let startDate = new Date();
let startTime;
let errors = 0;
let timerActive = false;
// when the document is loaded, the upper case keyboard is hidden and the first sentence and target letter are displayed
$(document).ready(function () {
    $('#keyboard-upper-container').hide();    
    $('#sentence').html(sentences[sentenceCount]);
    $('#target-letter').html(sentences[sentenceCount][letCount]);
    // main function for when a key is pressed down
    $(document).on('keydown', function (e) { 
        // if the timer isn't active, it is started and then made active
        if (timerActive == false) {
            startTime = startDate.getTime();
            timerActive = true;
        };
        // if the key being pressed is the 'shift' key, the lower case keyboard is replaced with the upper case one                
        if (e.key == "Shift") {
            $('#keyboard-upper-container').show();
            $('#keyboard-lower-container').hide();           
        } else {
            // if the pressed key isn't 'shift', the corresponding key on the virtual board is highlighted
            $('#' + e.key.charCodeAt(0)).css('background-color', 'yellow');
        };
        // ensures the following code is only executed if the game is active
        if (gameActive == true) {
            // executes the following code if the pressed key is the same as the target letter            
            if (e.key == sentences[sentenceCount][letCount]) {
                // creates a green check mark
                $('#feedback').append('<span class="correct">&#10003</span>');
                $('.correct').css("color", "green");                
                // increases the 'letCount' value which will update the target letter
                letCount++
                // if the final 'target letter' of a sentence is pressed and there are more sentences, the next sentence is displayed and values are reset   
                if (letCount == sentences[sentenceCount].length) {
                    letCount = 0;
                    sentenceCount++;
                    if (sentenceCount < 5) {
                        $('#sentence').html(sentences[sentenceCount]);
                        $('#yellow-block').css("margin-left", "0");
                        $('#target-letter').html(sentences[sentenceCount][letCount]);
                        $('#feedback').html("");
                    } else {
                        // if there are no more sentences the timer is used to calculate the typing speed, the game is made inactive and the final messeges are displayed
                        gameActive = false;
                        let endDate = new Date();
                        let endTime = endDate.getTime();
                        let minutes = (endTime - startTime) / 60000;
                        let wpm = Math.round(54 / minutes - 2 * errors);
                        $('#yellow-block').hide();
                        $('#target-letter').remove();
                        $('#sentence').html("You have finished this exercise! Your typing speed was " + wpm + " words per minute!");
                        $('#feedback').remove();
                        $('#prompt-container').append('<div id="btn-area"></div>');
                        $('#btn-area').css("text-align", "center");
                        setTimeout(function() {
                            $('#btn-area').append('<button id="reset-btn">Try it again?</button>');
                            $('#reset-btn').click(function(){
                                location.reload();
                            });
                        }, 2000);                                                                                             
                    };                                    
                } else {
                    // if the pressed key is not the final letter of the sentence, the next target letter is displayed and highlighted
                    $('#yellow-block').css("margin-left", letterSpace * letCount);
                    $('#target-letter').html(sentences[sentenceCount][letCount]);;
                    if (sentences[sentenceCount].charCodeAt(letCount) == 32) {
                        $('#target-letter').html('space');
                    };
                };
            } else {
                // if the pressed key is NOT the target letter (and also isn't 'shift'), a red x is displayed
                if (e.key != "Shift") {
                    $('#feedback').append('<span class="incorrect">X</span>');
                    $('.incorrect').css("color", "red");
                    errors++;                    
                };
            };             
        };
        // function that executes code when a pressed key is released                                              
        $(document).keyup(function (e) {
            // if the 'shift' key is released, the lower case keyboard returns and replaces the upper case one
            if (e.key == "Shift") {
                $('#keyboard-upper-container').hide();
                $('#keyboard-lower-container').show();
            } else {
                // if the released key isn't 'shift', the corresponding 'virtual key' returns to its original shade
                $('#' + e.key.charCodeAt(0)).css('background-color', '#f5f5f5');
            };            
        });
    });
});

