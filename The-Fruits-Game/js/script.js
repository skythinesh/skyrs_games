var playing = false;
var score;
var trialsLeft;
var step;
var action;
var fruits = ['sky-logo', 'sky-stream', 'sky-tv', 'sky-wifi', 'sky-logo', 'sky-stream', 'sky-tv', 'sky-wifi'];

$(() => {
    //click on start/reset button
    $("#startreset").click(() => {
        //if we are playing
        if (playing) {
            //reload page
            location.reload();
            playing = false;
        }
        //if we are not playing
        else {
            //hide game over box
            $("#gameOver").hide();
            //change button text to "Reset Game"
            $("#startreset").html("Reset Game");
            //started playing
            playing = true;
            //score is 0 initially
            score = 0;
            $("#scorevalue").html(score);
            //show trial-left box
            $("#trialsleft").show();
            //setting initial trial value 
            trialsLeft = 3;
            //adding trial hearts 
            addHearts();
            //start sending fruits
            startAction();
        }
    });

    //slice a fruit
    $("#fruit1").mouseover(() => {
        //increase score by one
        score++;
        //update score value
        $("#scorevalue").html(score);
        //play sound
        $("#slicesound")[0].play();
        //stop fruit
        clearInterval(action);
        //hide fruit and explode fruit
        $("#fruit1").hide("explode", 200);
        //send new fruit
        setTimeout(startAction, 400);
    })

    $("#fruit1").on("touchstart", function(event) {
        event.preventDefault();
        //increase score by one
        score++;
        //update score value
        $("#scorevalue").html(score);
        //play sound
        $("#slicesound")[0].play();
        //stop fruit
        clearInterval(action);
        //hide fruit and explode fruit
        $("#fruit1").hide("explode", 200);
        //send new fruit
        setTimeout(startAction, 400);
    });

    function addHearts() {
        //clear hearts
        $("#trialsleft").empty();
        //fill up the hearts
        for (let i = 0; i < trialsLeft; i++) {
            $("#trialsleft").append('<img src="img/heart.gif" class="hearts">');
        }
    }

    //start sending fruits
    function startAction() {
        //generate a fruit
        $("#fruit1").show();
        //generate random fruit
        chooseFruit();
        //check for different screen size
        if ($("#fruitContainer").width() <= 450) {
            //random position
            $("#fruit1").css({
                'left': Math.round(240 * Math.random()),
                'top': -50
            });
        } else {
            //random position
            $("#fruit1").css({
                'left': Math.round(450 * Math.random()),
                'top': -50
            });
        }
        //random steps
        step = 1 + Math.round(13 * Math.random());
        //move fruit down by one step every 10ms
        action = setInterval(() => {
            $("#fruit1").css(
                'top',
                $("#fruit1").position().top + step
            );
            //check if the fruit is too fruit
            if ($("#fruit1").position().top > $("#fruitContainer").height()) {
                if (trialsLeft > 1) {
                    //generate a fruit
                    $("#fruit1").show();
                    chooseFruit();
                    //check for different screen size
                    if ($("#fruitContainer").width() <= 450) {
                        //random position
                        $("#fruit1").css({
                            'left': Math.round(240 * Math.random()),
                            'top': -50
                        });
                    }
                    //screen width > 420px
                    else {
                        //random position
                        $("#fruit1").css({
                            'left': Math.round(450 * Math.random()),
                            'top': -50
                        });
                    }
                    //random steps
                    step = 1 + Math.round(5 * Math.random());
                    //reduce trials by 1
                    trialsLeft--;
                    //populated trialsleft box
                    addHearts();
                }
                //no trials left
                else {
                    //game over
                    playing = false;
                    //change button to Start Game
                    $("#startreset").html("Start Game");
                    //showing game over box
                    $("#gameOver").show();
                    //setting game over message and score to gameOver box
                    $("#gameOver").html('<p>Game Over!</p><p>Your score : ' + score + '</p>');
                    //hiding trialsLeft box
                    $("#trialsleft").hide();
                    //stop dropping fruits
                    stopAction();
                }
            }
        }, 10);
    }

    //generate a random fruit
    function chooseFruit() {
        let rand = fruits[Math.round(7 * Math.random())];
        console.log(rand);
        $("#fruit1").attr('src', 'img/' + rand + '.png');
    }

    //stop dropping fruits
    function stopAction() {
        clearInterval(action);
        //hide fruits
        $("#fruit1").hide();
    }

});