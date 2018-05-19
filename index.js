var tictactoe = (function(){
    var players         = [ { simbol : "👽", color : "white"}, { simbol : "👾", color : "gray"} ],
        table           = document.getElementById('table'),
        turnSimbol      = players[0].simbol,
        currentPlayer   = players[0],
        selecteds       = 0,
        player_simbol   = document.getElementById('player_simbol'),
        popup           = document.getElementById('popup'),
        winner          = document.getElementById('winner'),
        recargar        = document.getElementById('recargar'),
        tableState      = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
        ];
    
    
    function markCell (cell, simbol) {
        cell.textContent = simbol;
        cell.classList.add("animated");    
        cell.classList.add("bounceIn");
        cell.style.color = currentPlayer.color;
        selecteds++;
    }
    
    function nextTurn(){
        if (turnSimbol == players[0].simbol){
            turnSimbol     = players[1].simbol;
            currentPlayer  = players[1];
            player_simbol.textContent = players[1].simbol;
        } else {
            turnSimbol     = players[0].simbol;
            currentPlayer  = players[0];
            currentPlayer = players[0]
            player_simbol.textContent = players[0].simbol;
        };
    }
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
      
    function computerSelect(){
        do {
            var row  = getRandomInt(0, 2);
            var cell = getRandomInt(0, 2);
            var istaken = false;

            if(tableState[row][cell] === players[0].simbol || tableState[row][cell] == players[1].simbol){
                istaken = true;
            }

        } while (istaken && selecteds < 9);

        return {
            row : row,
            cell : cell
        }
    }

    function checkStatus (){
        if ((tableState[0][0] == players[0].simbol && tableState[0][1] == players[0].simbol && tableState[0][2] == players[0].simbol ||
             tableState[1][0] == players[0].simbol && tableState[1][1] == players[0].simbol && tableState[1][2] == players[0].simbol ||
             tableState[2][0] == players[0].simbol && tableState[2][1] == players[0].simbol && tableState[2][2] == players[0].simbol
             ) 
             ||
             (tableState[0][0] == players[0].simbol && tableState[1][1] == players[0].simbol && tableState[2][2] == players[0].simbol ||
              tableState[0][2] == players[0].simbol && tableState[1][1] == players[0].simbol && tableState[2][0] == players[0].simbol 
             ) 
             ||
             (tableState[0][0] == players[0].simbol && tableState[1][0] == players[0].simbol && tableState[2][0] == players[0].simbol ||
              tableState[0][1] == players[0].simbol && tableState[1][1] == players[0].simbol && tableState[2][1] == players[0].simbol ||
              tableState[0][2] == players[0].simbol && tableState[1][2] == players[0].simbol && tableState[2][2] == players[0].simbol
             )
        ){
            // alert("gano "+ players[0].simbol);
            popup.classList.remove('hide');
            winner.textContent = players[0].simbol;
        }
        else if (
            (tableState[0][0] == players[1].simbol && tableState[0][1] == players[1].simbol && tableState[0][2] == players[1].simbol ||
             tableState[1][0] == players[1].simbol && tableState[1][1] == players[1].simbol && tableState[1][2] == players[1].simbol ||
             tableState[2][0] == players[1].simbol && tableState[2][1] == players[1].simbol && tableState[2][2] == players[1].simbol
             ) 
             ||
             (tableState[0][0] == players[1].simbol && tableState[1][1] == players[1].simbol && tableState[2][2] == players[1].simbol ||
              tableState[0][2] == players[1].simbol && tableState[1][1] == players[1].simbol && tableState[2][0] == players[1].simbol 
             ) 
             ||
             (tableState[0][0] == players[1].simbol && tableState[1][0] == players[1].simbol && tableState[2][0] == players[1].simbol ||
              tableState[0][1] == players[1].simbol && tableState[1][1] == players[1].simbol && tableState[2][1] == players[1].simbol ||
              tableState[0][2] == players[1].simbol && tableState[1][2] == players[1].simbol && tableState[2][2] == players[1].simbol
            )
        )
        {
            popup.classList.remove('hide');
            winner.textContent = players[1].simbol;
        }else if (selecteds === 9) {
            popup.classList.remove('hide');
            winner.textContent = "... Nadie, Esto fue un empate :("
        }
    }
    
    table.addEventListener('click', function(e){
        var targetClick = e.target;
        var row         = targetClick.parentNode.attributes['data-rowName'].value;
        var td          = targetClick.attributes['data-Cell'].value;
        var cellValue   = e.target.innerText.length;
        
        if (targetClick.nodeName !== "TD" || cellValue > 0) return;

        markCell(targetClick, turnSimbol);
        tableState[row][td] = turnSimbol;
        nextTurn();
        checkStatus();

        setTimeout(() => {
            var coord = computerSelect();
            markCell(table.childNodes[1].children[coord.row].children[coord.cell], turnSimbol)
            tableState[coord.row][coord.cell] = players[1].simbol;
            nextTurn();            
            checkStatus();        
        }, 1000);
    });
    
    recargar.addEventListener('click', function(){
        location.reload();
    })
})();






















