var play     = false,
    $start   = $("#start"),
    $pause   = $("#pause"),
    $message = $("#message"),
    $card    = $("#card"),
    audio    = document.getElementsByTagName("audio")[0],
    count    = 0,
    minutes  = 0,
    seconds  = 0,
    tomatos  = 0;

$pause.on("click", function() {
    play = false;
});

$start.on("click", function() {
    play = true;
});

setInterval(function () {
    clockWork($card);
}, 1000);

function warning(minutes) {
    $message.html(minutes + " min");
}

function releasePause() {
    $message.empty();
    $pause.on("click", function() {
        play = false;
    });

    $start.on("click", function() {
        play = true;
    });

    $start.click();
}

function partialPause() {
    $start.unbind("click");
    $pause.unbind("click");
    warning(5);

    setTimeout(releasePause, 300000);
}

function tomatoPause() {
    $start.unbind("click");
    $pause.unbind("click");
    warning(15);

    setTimeout(releasePause, 900000);
}


function checkPause() {
    if (count == 3300000 && tomatos < 4) {
        $pause.click();

        count = 0;

        tomatos++;

        partialPause();
        audio.play();

        return true;
    }

    if (tomatos == 4) {
        $stop.click();

        tomatos = 0;
        count   = 0;

        tomatoPause();
        audio.play();

        return true;
    }

    return false;
}

function clockWork(selector) {
    var presentationM,
        presentationS;

    if (!play) {
        return;
    }

    if(checkPause()) {
        return;
    }

    count++;
    seconds++;

    if (seconds == 60) {
        seconds = 0;

        minutes++;
    }

    presentationM = minutes;
    presentationS = seconds;

    if (minutes < 10) {
        presentationM = "0" + presentationM;
    }

    if (seconds < 10) {
        presentationS = "0" + presentationS;
    }

    selector.html(presentationM + ":" + presentationS);
}
