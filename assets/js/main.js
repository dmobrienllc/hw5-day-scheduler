$(function() {
    ///let timeDiv = $('#timer');
    // timerDiv.textContent = moment().format("MMM Do YY");

    let today = moment();
    // $("#9a").text(today.format("MMM Do, YYYY"));
    // today('12:16','HH:mm').minutes();

    let hoursMins = today.set({"hour": 9, "minute": 00});
    $("#9a").text(hoursMins.format("HH:mm"));

    console.log(hoursMins);

    let am10 = today.set({"hour": 10, "minute": 00});
    $("#10a").text(am10.format("HH:mm"));

    let am11 = today.set({"hour": 11, "minute": 00});
    $("#11a").text(am11.format("HH:mm"));



    functino buildRows()
    {
        let x = 0;
    }
  });