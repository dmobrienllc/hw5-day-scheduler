$(function() {
    ///let timeDiv = $('#timer');
    // timerDiv.textContent = moment().format("MMM Do YY");

    // let today = moment();
    // // $("#9a").text(today.format("MMM Do, YYYY"));
    // // today('12:16','HH:mm').minutes();

    // let hoursMins = today.set({"hour": 9, "minute": 00});
    // $("#9a").text(hoursMins.format("HH:mm"));

    // console.log(hoursMins);

    // let am10 = today.set({"hour": 10, "minute": 00});
    // $("#10a").text(am10.format("HH:mm"));

    // let am11 = today.set({"hour": 11, "minute": 00});
    // $("#11a").text(am11.format("HH:mm"));
    function appendToStorage(name, data){
      var old = localStorage.getItem(name);
      if(old === null) {
        old = "";
      }
      localStorage.setItem(name, old + data);
    }

    function init(){
      buildScheduler();

      refreshValues();
    }
    
    //loop through all my textarea divs and refresh data
    function refreshValues(){
      let textarea = $(".schedule-item").filter("[data-text='9']");
      textarea.text(localStorage.getItem("data-text-index:9"));
    }

    function buildScheduler()
    {
        let containerDiv = $("<div>").addClass("container my-container");
        // Delegate event listener to the parent element, <div id="buttons">
        containerDiv.on('click', '.save-button', function (event) {

          //displayLetterEl.addClass('letter');
          if ($(this).attr("id") == "something") {
            //var html  = $(this).html(); //here you can use any of the above method as per requirement.
         }
         let index = $(this).attr("data-time");
         let text = $(".schedule-item").filter("[data-text='" + index + "']").val();

         alert($(event.target).attr('data-time'));
         alert("Textarea value: " + text)

         //if local storage for this item doesn't exist, create,
         //otherwise append it. If the text field comes back empty
         //assume user wants to clear all. Delete the iterm.
         appendToStorage(("data-text-index:" + index),text);

         alert("From local storage: " + localStorage.getItem("data-text-index:" + index));
          
        //  $('.address').filter(':not([data-address-type]), [data-address-type="to"]').html('')
 
        });//container event listener add

        $("body").append(containerDiv);
        let today = moment();
        console.log("Parent Row: " + containerDiv);
        let hoursMins;

        for (var i = 9; i < 18; i++) {

            let rowDiv = $("<div>").addClass("row my-row pl-0");

            //TODO: Dyanmically add time
            let timeDiv = $("<div>").addClass("col-1 my-col my-col-left time-block");
            let pTimeEl = $("<p>").attr("id",(i));
            
            hoursMins = today.set({"hour": i, "minute": 00});
            pTimeEl.text(hoursMins.format("HH:mm"));
            timeDiv.append(pTimeEl);
            rowDiv.append(timeDiv);

            let msgDiv = $("<div>").addClass("col-9 my-col");
            if(hoursMins.isBefore(today))
            {
              msgDiv.addClass("past");
            }else if(hoursMins.isAfter(today)){
              msgDiv.addClass("future");
            }else{
              msgDiv.addClass("present");
            }
            let txtAreaEl = $("<textarea>").attr("placeholder","Text Here").attr("data-text",i);
            txtAreaEl.addClass("schedule-item");
            msgDiv.append(txtAreaEl);
            rowDiv.append(msgDiv);

            let buttonDiv = $("<div>").addClass("col-2 my-col");
            let saveBtnEl = $("<button>").attr("type","button").attr("class","save-button");
            saveBtnEl.attr("data-time", i);
            saveBtnEl.text("Save");
            buttonDiv.append(saveBtnEl);
            rowDiv.append(buttonDiv);

            containerDiv.append(rowDiv);

      }//for loop
    }

    init();
  });

  //             <script>
  // $( ".myClass" ).css( "border", "3px solid red" );
  // </script>
            
            // let hoursMins = today.set({"hour": 9, "minute": 00});
            // $("#9a").text(hoursMins.format("HH:mm"));
  

            // <div class="row my-row pl-0">
            //   <div class="col-1 my-col my-col-left time-block">
            //     <p id="9a"></p>
            //   </div>
            // <div class="col-9 my-col past">
            //   <textarea placeholder="Text here" aria-placeholder="Your text here"></textarea>
            // </div>
            // <div class="col-2 my-col">
            //   <button type="button" class="saveBtn">Sv img</button>
            // </div>
            // </div>    