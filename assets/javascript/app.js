var triviaQuestions = [{
	question: "Who was the first Disney princess?",
	answerList: ["Mulan", "Snow White", "Cinderella", "Ariel"],
	answer: 1
},{
	question: "What do Aladdin and his monkey Abu steal from the marketplace when you’re first introduced to them in the movie?",
	answerList: ["Apple", "Banana", "Cheese", "A Loaf of Bread"],
	answer: 3
},{
	question: "Which princess is based on a real person?",
	answerList: ["Pochahontas", "Elsa", "Cinderella", "Mulan"],
	answer: 0
},{
	question: "What is the name of Mulan’s pet dragon??",
	answerList: ["Jessie", "Repunzel", "Mushu", "Merida"],
	answer: 2
},{
	question: "In Peter Pan, Captain Hook had a hook on which one of his hands?",
	answerList: ["right", "left", "neither", "his leg"],
	answer: 1
},{
	question: "How many sisters does Ariel have?",
	answerList: ["5", "3", "6", "7"],
	answer: 2
},{
	question: "Which Disney movie features a song called, 'I Just Can't Wait to be King'?",
	answerList: ["Toy Story", "Finding Nemo", "Up", "The Lion King"],
	answer: 3
},{
	question: "Through the Looking Glass is the sequel to which popular Disney movie?",
	answerList: ["Wall-E", "Alice in Wonderland", "Frozen", "Toy Story"],
	answer: 1
},{
	question: "Which Disney movie features a young girl with five emotions - Joy, Sadness, Anger, Fear and Disgust?",
	answerList: ["Inside Out", "Star Wars", "Mulan", "Finding Nemo"],
    answer: 0
},{
	question: "In Disney's Finding Nemo, what was the name of the character who's famous quote is to Keep Swimming?",
	answerList: ["Belle", "Pinocchio", "Peter Pan", "Dory"],
	answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question 10' ];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not correct.",
	endTime: "Time's Up!",
	finished: "Here are your final Results."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}