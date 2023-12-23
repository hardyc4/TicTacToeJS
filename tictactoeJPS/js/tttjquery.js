$(document).ready(function(){
	var x 		=	'x';		//	x game piece
	var o 		=	'o';		//	o game pices		
	var turns		=	 0;			//	Turn # (1 - 9)
	var xOrO 	= 	 0;			//	Whose turn is it
	var oWins	=	 0;			//	Total "o" wins
	var xWins	=	 0;			//	Total "x" wins
	var catsGames =	 0;			//	Tie games
	
	// The places on the board
	var spot1		= $('#spot1');	//	Row 1 col 1
	var spot2 	= $('#spot2');	//	Row 1 col 2
	var spot3 	= $('#spot3');	//	Row 1 col 3
	var spot4 	= $('#spot4');	//	Row 2 col 1
	var spot5 	= $('#spot5');	//	Row 2 col 2
	var spot6 	= $('#spot6');	//	Row 2 col 3
	var spot7 	= $('#spot7');	//	Row 3 col 1
	var spot8 	= $('#spot8');	//	Row 3 col 2
	var spot9 	= $('#spot9');	//	Row 3 col 3

	$('#board li').on('click', function(){
		if($(this).hasClass('disable'))	//	Square filled
		{
			alert('This spot is already filled');
			return;
		}
		
		//	Valid square/valid move
		turns++;							//	Add 1 to number turns
		xOrO = turns % 2;
		if (xOrO == 1)					//	"o's" turn
		{
			$(this).text(o);				//	Put "o" in square
			$(this).addClass('disable o');//	Disable square
			checkForWinner(o);				//	Check did "o" win 
		}
		else if (xOrO == 0)				//	"x's" turn
		{
			$(this).text(x);				//	Put "x" in square
			$(this).addClass('disable x');//	Disable square
			checkForWinner(x);				//	Check did "o" win
		}

		//	If neither x nor o has won and all
		//	turns taken, it's a tie (cat's) game.
		if (turns == 9)
		{
			alert ("Cat's game!")
			++catsGames;					//	Increment tie counter
			turns = 0;					//	Reset turns to 0
		}
	});
	
	//	Check for all combos of either
	//	"o" winning or "x" winning.
	function checkForWinner(tc)
	{
		if((spot1.hasClass(tc) && spot2.hasClass(tc) && spot3.hasClass(tc)) ||
		   (spot4.hasClass(tc) && spot5.hasClass(tc) && spot6.hasClass(tc)) ||
		   (spot7.hasClass(tc) && spot8.hasClass(tc) && spot9.hasClass(tc)) ||
		   (spot1.hasClass(tc) && spot4.hasClass(tc) && spot7.hasClass(tc)) ||
		   (spot2.hasClass(tc) && spot5.hasClass(tc) && spot8.hasClass(tc)) ||
		   (spot3.hasClass(tc) && spot6.hasClass(tc) && spot9.hasClass(tc)) ||
		   (spot1.hasClass(tc) && spot5.hasClass(tc) && spot9.hasClass(tc)) ||
		   (spot3.hasClass(tc) && spot5.hasClass(tc) && spot7.hasClass(tc)))
		{
			alert('The Winner is ' + tc);
			
			//	Increment appropriate game counter
			if (tc == 'o')
			{
				++oWins;
			}
			else if (tc == 'x')
							{
				++xWins;
			}

			//	Reset board, get ready
			//	to start a new game.
			planForANewGame();
		}		
	}

	// Reset Handler
	$("#reset").click(function(){
		planForANewGame();
	});
	
	function planForANewGame()
	{
		//	Write to <div> at top of the
		//	page using .html() method.
		$('#stats').html("Total 'O' wins: " 	+ oWins + "<br>" +
						 "Total 'X' wins: "	+ xWins + "<br>" +
						 "Total tie games: "+ catsGames);
						
		$("#board li").text("+");		//	Set all squares to "+"
		$("#board li").removeClass('disable');
		$("#board li").removeClass('o');
		$("#board li").removeClass('x');
		turns		= 0;
		xOrO		= 0;
	}
});