// testing if external page connected
// alert("hello World");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCFsxs3i9dBEpCp6Odv0L9EzKEH5fM8FkM",
    authDomain: "trainschedule-3a4b1.firebaseapp.com",
    databaseURL: "https://trainschedule-3a4b1.firebaseio.com",
    projectId: "trainschedule-3a4b1",
    storageBucket: "",
    messagingSenderId: "745447709120"
  };// close firebase confige
  firebase.initializeApp(config);

  
  var database = firebase.database();


  // capture the button click
  $("#add_train_btn").on("click", function(event){
    event.preventDefault();

    // varibles for user inputs
    var trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#firstTrain-input").val().trim(),"HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();

    // add train object
    var addTrain ={
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  };// close addTrain object

    // Code for handling the push
    database.ref().push(addTrain);

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
    console.log(trainName);

});// close event function


    database.ref().on("child_added", function(childSnapshot, prevChildKey){
      var trainName = childSnapshot.val().trainName;
      var destination = childSnapshot.val().destination;
      var firstTrain = childSnapshot.val().firstTrain;
      var frequency = childSnapshot.val().frequency;
      var nextTrain = childSnapshot.val().nextTrain;



      // Time calculations
      trainFrequency=frequency;
      firstTrainTime=firstTrain;

      // First Time
      firstTrainTimeConverted=moment(firstTrainTime, "hh:mm").subtract(1, "years");

      // current time
      currentTime=moment();

      // time difference
      timeDifference = moment().diff(moment(firstTrainTimeConverted), "minutes");

      // time apart
      timeApart=timeDifference%trainFrequency;

      // minutes until next train
      minutesToNextTrain=trainFrequency-timeApart;

      // next train
      nextTrain=moment().add(minutesToNextTrain, "minutes");
      console.log(moment(nextTrain).format("hh:mm"));

      // display the stored inputs into a row, not working how I want it to, is putting everything into first col, need to change this code so they are being pushed specifc column.
      $("#TrainSchedule").append("<div class= 'well<span class='train-display'>" +"<tr><td>" + childSnapshot.val().trainName + "</span><span class='destination-display'> " + childSnapshot.val().destination + "</span><span class= 'frequency-display'> " + childSnapshot.val().frequency + "</span><span class='nextArrival-display' " + nextTrain  + "</span><span class='minutesAway'> " + minutesToNextTrain);


});//close childeSnapshot, prevChildKey function
