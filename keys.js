function keyDown(evt){
    switch (evt.keyCode) {
        case 38:  /* Up arrow was pressed */
            upPressed = true;
            break;
        case 40:  /* Down arrow was pressed */
            downPressed = true;
            break;
        case 37:  /* Left arrow was pressed */
            leftPressed = true;
            break;
        case 39:  /* Right arrow was pressed */
            rightPressed = true;
            break;
        case 32: /* Space Bar */
            if (gameover) {
                restart();
            }
            break;
        }
}

function keyUp(evt) {
    switch (evt.keyCode) {
        case 38:  /* Up arrow was pressed */
            upPressed = false;
            break;
        case 40:  /* Down arrow was pressed */
            downPressed = false;
            break;
        case 37:  /* Left arrow was pressed */
            leftPressed = false;
            break;
        case 39:  /* Right arrow was pressed */
            rightPressed = false;
            break;
        }
}
