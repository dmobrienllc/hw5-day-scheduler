$(function() {

    function appendToStorage(key, data){
       
        let currText = localStorage.getItem(key);

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

    function getRowStylingClass(today,oldTime,tmpTime){
        let tmp;
    
        if(today.isBetween(oldTime,tmpTime)){ 
          return "present";
        }else if(today.isBefore(tmpTime)){
          return "future";
        }else{
          return "past";
        }
      }
    
    function init(){
      buildScheduler();
    }

    function buildScheduler(){
        let containerDiv = $("<div>").addClass("container my-container");
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

        //this would be more elegant as a .json.each(function)
        for (var i = 0; i < 10; i++) {

            let rowDiv = $("<div>").addClass("row my-row pl-0");
            containerDiv.append(rowDiv);

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

            //BUILD MESSAGE DIV
            let msgDiv = $("<div>").addClass("col-9 my-col");
            msgDiv.addClass(getRowStylingClass(today,oldTime,tmpTime));

            let txtAreaEl = $("<textarea>").attr("placeholder","Text Here").attr("data-text",i);
            txtAreaEl.addClass("schedule-item");
            
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

            //BUTTON DIV
            let buttonDiv = $("<div>").addClass("col-2 my-col");
            let saveBtnEl = $("<button>").attr("type","button").attr("class","save-button");
            saveBtnEl.attr("data-time", i);
            saveBtnEl.text("Save");
            buttonDiv.append(saveBtnEl);
            rowDiv.append(buttonDiv);
      }
    }

    init();
  });


  //debugging
  // console.log("Today: " + today.format())
  // console.log("Seed Time: " + seedTime.format())
  // console.log("Between: " + today.isBetween(oldTime,tmpTime));
  // console.log("BEFORE: " + today.isBefore(tmpTime));
  // console.log("AFTER: " + today.isAfter(tmpTime));
  // console.log("Tmp hours: " + tmpTime.format());
  // console.log("old hours: " + oldTime.format());




 