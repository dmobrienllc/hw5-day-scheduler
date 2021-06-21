$(function() {

    function appendToStorage(key, data){
       
        let currText = localStorage.getItem(key);

        //instead of this maybe blow it away and just enter whatever comes
        //in? 
        if(currText === null) {
          currText = "";
          localStorage.setItem(key,currText);
        }
        else if(currText===data){
          console.log("Data === currText, not appending.");
        }
        else{
          console.log("appended: " + data + "To currData: " + currText) ;
          currText += data;
          localStorage.setItem(key,data);
        }
      }
    
    function init(){
      buildScheduler();
    }

    function buildScheduler(){
        let containerDiv = $("<div>").addClass("container my-container");
        //BEGIN BUILD CALLBACK
        containerDiv.on('click', '.save-button', function (event) {

         let index = $(this).attr("data-time");
         let text = $(".schedule-item").filter("[data-text='" + index + "']").val();

         appendToStorage(("data-text-index:" + index),text);
 
        });
        //END BUILD CALLBACK

        $("body").append(containerDiv);

        //our seed date today at start of business hours
        let today = moment();
        let seedTime = moment({ y: today.year(), M: today.month(), d: today.date(), h: 8, m: 0, s: 0, ms: 0}); 
        let tmpTime;
        let oldTime;

        for (var i = 0; i < 10; i++) {

            let rowDiv = $("<div>").addClass("row my-row pl-0");

            let timeDiv = $("<div>").addClass("col-1 my-col my-col-left time-block");
            let pTimeEl = $("<p>").attr("id",(i));

            if(i===0){
              tmpTime = seedTime.clone();
              oldTime = tmpTime.clone();;
            }            
            else{
              oldTime = tmpTime.clone();
              tmpTime = tmpTime.add(1,'hours');
            }

            pTimeEl.text(tmpTime.format("HH:mm"));
            timeDiv.append(pTimeEl);
            rowDiv.append(timeDiv);

            let msgDiv = $("<div>").addClass("col-9 my-col");

            // console.log("Today: " + today.format())
            // console.log("Seed Time: " + seedTime.format())
            // console.log("Between: " + today.isBetween(oldTime,tmpTime));
            // console.log("BEFORE: " + today.isBefore(tmpTime));
            // console.log("AFTER: " + today.isAfter(tmpTime));
            // console.log("Tmp hours: " + tmpTime.format());
            // console.log("old hours: " + oldTime.format());

            if(today.isBetween(oldTime,tmpTime)){ 
              console.log("present");
              msgDiv.addClass("present");
            }else if(today.isBefore(tmpTime)){
              console.log("future");
              msgDiv.addClass("future");
            }
            else{
              console.log("past");
              msgDiv.addClass("past");
            }

            //If local storage exists for this item, also append that text
            let txtAreaEl = $("<textarea>").attr("placeholder","Text Here").attr("data-text",i);
            txtAreaEl.addClass("schedule-item");
            
            //TODO: Make sure these aren't duplicated
            let storageKey = "data-text-index:" + i;
            if(localStorage.getItem(storageKey)===null){
              localStorage.setItem(storageKey,"");
              txtAreaEl.text("");
            }
            else{
              txtAreaEl.text(localStorage.getItem(storageKey));
            }

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




 