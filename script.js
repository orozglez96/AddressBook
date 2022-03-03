var fnames = [];
var lnames = [];
var phones = [];
var addresses = [];

$("#addC").on("click", function(){
    $("#dataTable tbody").text("");
    $("#warning").text("");
    $("div").addClass("hidden");
    $("#submission").removeClass("hidden");
 });

$("#searchTab").on("click", function(){
    $("#dataTable tbody").text("");
    $("#warning").text("");
    $("div").addClass("hidden");
    $("#searchC").removeClass("hidden");
 });

$("#cList").on("click", function(){
    $("#dataTable tbody").text("");
    $("#warning").text("");
    $("div").addClass("hidden");
    $("#contactList").removeClass("hidden");
    for (var i=0; i<fnames.length; i++){
      $("#dataTable tbody").append("<tr><td>"+ fnames[i] + " " + lnames[i] + "</td><td>" + phones[i] + "</td><td>" + addresses[i] + "</td></tr>");
    };
 });

$("#subForm").on("submit", function(event){
  event.preventDefault();
  var $fname = $(this).find("[name=fname]");
  var fname = $fname.val();
  var $lname = $(this).find("[name=lname]");
  var lname = $lname.val();
  var $phone = $(this).find("[name=phone]");
  var phone = $phone.val();
  var $address = $(this).find("[name=address]");
  var address = $address.val();
  if(fname && lname && phone && address){
    fnames.push(fname);
    lnames.push(lname);
    phones.push(phone);
    addresses.push(address);
    $fname.val("");
    $lname.val("");
    $phone.val("");
    $address.val("");
  }else{
    $("#warning").removeClass("hidden").text("Please enter all the requested data");
  }
});

$("#lookUpTool").on("submit", function(event){
  event.preventDefault();
  $("#warning").text("");
  var $fullname = $(this).find("[name=contactos]");
  var fullname = $fullname.val().toLowerCase();
  var namesArr = fullname.split(" ");
  if (namesArr.length === 2){
    var fname = namesArr[0];
    var lname =namesArr[1];
    var flag = 0;
    for (var i=0; i<fnames.length; i++){
      if(fname === fnames[i].toLowerCase() && lname === lnames[i].toLowerCase()){
        flag ++;
        $("#contactCard").removeClass("hidden");
        $("#eliminar").removeClass("hidden");
        $("#result").text(fnames[i] + " " + lnames[i]);
        $("#contactInfo").html("Phone number: " + phones[i] + "<br>" + "Address: " + addresses[i]);
      }
    }
    $fullname.val("");
    if (flag === 0){
    $("#contactInfo").text("");
    $("#contactCard").removeClass("hidden");
    $("#result").text("Not found");
  }
  }else{
    $("#warning").removeClass("hidden").text("Please type first and last name");
  }
});

$("#eliminar").on("click",function(){
  $("#warning").text("");
  fullname = $("#result").text();
  fullname = fullname.split(" ");
  lname = fullname.pop();
  fname = fullname.join(" ");
  for (var i=0; i<fnames.length; i++){
    if(fname === fnames[i] && lname === lnames[i]){
      fnames.splice(i,1);
      lnames.splice(i,1);
      phones.splice(i,1);
      addresses.splice(i,1);
      $("#contactInfo").text("");
      $("#result").text("Not found");
      $("#eliminar").addClass("hidden");
    }
  }
});
/*

CITATION: The next lines of code (111-119) were taken from the tutorial
"Restrict Form Text input Characters Using HTML5 + JAVASCRIPT"
https://www.youtube.com/watch?v=EduFuZzvWP8
uploaded by the user Oston Code Cypher

*/

function lettersOnly(input){
  var regex = /[^a-z]/gi;
  input.value = input.value.replace(regex, "");
};

function numbersOnly(input){
  var regex = /[^0-9]/g;
  input.value = input.value.replace(regex, "");
};