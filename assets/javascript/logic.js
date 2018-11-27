$(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC26sCinQiP7K8Er8yjzvLBa2aZOf6yQsk",
    authDomain: "train-schedule-6b7f2.firebaseapp.com",
    databaseURL: "https://train-schedule-6b7f2.firebaseio.com",
    projectId: "train-schedule-6b7f2",
    storageBucket: "train-schedule-6b7f2.appspot.com",
    messagingSenderId: "652688892450"
  };
  firebase.initializeApp(config);

  	var trainData = firebase.database();

  	$('#newTrain').click(function(){
		var trainName = $('#trainName-input').val().trim();
		var destination = $('#destination-input').val().trim();
		var startTime = moment($('#startTime-input').val().trim(), 'HH:mm').subtract(10,'years').format('X');
		var frequency = $('#frequency-input').val();

			

		var newTrain = {
			name: trainName,
			destination: destination,
			startTime: startTime,
			frequency: frequency
		}

		trainData.ref().push(newTrain);

			alert('Train Added!!!');

			$('#trainName-input').val("");
			$('#destination-input').val("");
			$('#startTime-input').val("");
			$('#frequency-input').val("");
	})

		trainData.ref().on('child_added', function(snapshot){
			var trainName = snapshot.val().name; 
			var destination = snapshot.val().destination; 
			var frequency = snapshot.val().frequency; 
			var startTime = snapshot.val().startTime; 

			var remainder = moment().diff(moment.unix(startTime),"minutes")%frequency;
			var minutes = frequency - remainder;
			var arrival = moment().add(minutes,'m').format('hh:mm A');

			console.log('Start Time: ', startTime);
			console.log('Remainder: ', remainder);
			console.log('Minutes: ', minutes);
			console.log('Arrival: ',arrival);

			$('#schedule').append(`<tr><td>${trainName}</td><td>${destination}</td><td>${frequency}</td><td>${arrival}</td><td>${minutes}</td>`)
		})	
// Click '+' to Open Add Train and "x" to Close window

	$('#add').click(function(){
		if($('#newTrainSchedule').attr('data-status') === 'hide') {
			$('#newTrainSchedule').attr('data-status', 'show').css({'visibility': 'visible', 'height': '480px'});
			$('#symbol').removeClass('fa fa-plus').addClass('fa fa-close');
		} else {
			$('#newTrainSchedule').attr('data-status', 'hide').css({'visibility': 'hidden', 'height': '0px'});
			$('#symbol').removeClass('fa fa-close').addClass('fa fa-plus');
		}
	});
// Clock showing on the right side of schedule 
	function currentTime() {
		var sec = 1;	
		time = moment().format('HH:mm:ss');
		searchTime = moment().format('HH:mm');
			$('#currentTime').html(time);

			t = setTimeout(function() {
				currentTime();
			}, sec * 1000);	
	}
	currentTime(); 
});