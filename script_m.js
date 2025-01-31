//Variables
var plus = document.getElementById('add-movie');
var helperDiv = document.getElementById('helper-div');
var input = document.getElementById('inp');
var add = document.getElementById('add');
var ul = document.querySelector("ul");

//Events
plus.addEventListener("click" , addmovie);
add.addEventListener("click" , adding);
document.addEventListener("DOMContentLoaded" , showData)
document.addEventListener("DOMContentLoaded" , showCheck)
//Functions

//for show adding input
function addmovie(){
    if(plus.innerHTML === "+"){
    helperDiv.attributes.style.value = "display:block;";
    plus.innerHTML = "X";
    plus.setAttribute("style" , "background-color: red;");
    }
    else {
    helperDiv.attributes.style.value = "display:none;";
    plus.innerHTML = "+";
    plus.setAttribute("style" , "background-color: white;");
    }              }

//for add li to list
function adding(){
    if(input.value !== ""){
    //creat li tag with new content
    var li = document.createElement("li");
    ul.append(li);
    li.append(input.value);
    //save new li to Local Storage
    setData(input.value);
    //clear input
    input.value = "";


    //create remove button
    var rem = document.createElement("img");
    li.append(rem);
    rem.classList.add("rem" , "hidden");
    rem.classList.toggle("hidden");
    rem.setAttribute("src", "icon/bin.png")
    //delete li after click on remove button
    rem.addEventListener("click", removeLi);


    //create check button
    var check = document.createElement("img");
    li.append(check);
    check.classList.add("check" , "hidden");
    check.classList.toggle("hidden");
    check.setAttribute("src", "icon/check.png")
    //check li after click on check button
    check.addEventListener("click", checkLi);


    //show cheek and remove button after click on li
    li.addEventListener("click", function hidden(){
    check.classList.toggle("hidden");
    rem.classList.toggle("hidden");
    li.classList.toggle("li-display");} )
 }}

//for remove li
function removeLi(e){
    var sure = confirm(" آیا میخواهید این گزینه را حذف کنید؟ ");
    if(sure === true){
    e.target.parentElement.remove();
    dataArray = getData();
    var index = dataArray.indexOf(e.target.parentElement.textContent);
    dataArray.splice(index , 1);
    localStorage.setItem("movieList" , JSON.stringify(dataArray));
}}

//for check li
function checkLi(e){
    e.target.parentElement.classList.toggle("checkLi");
    dataArray = getData();
    var index = dataArray.indexOf(e.target.parentElement.textContent);
    checkArray = getCheck();
    checkArray.push(index);
    localStorage.setItem("movieCheck" , JSON.stringify(checkArray));
    checkOut(e)

}
//for check out li
function checkOut(e){
    //create new button in li for check out
    var li = e.target.parentElement;
    var xcheck = document.createElement("img");
    xcheck.setAttribute("src", "icon/x.png");
    xcheck.classList.add("check" , "hidden");
    li.append(xcheck)
    //show check out button after click on li
    li.addEventListener("click", function hidden(){xcheck.classList.toggle("hidden");})

    li.children[0].removeEventListener("click", removeLi);
    li.children[0].addEventListener("click" , bagg);
    
    //remove check button
    e.target.remove()
    xcheck.addEventListener("click" , removeCheck)
}

//for remove check
function removeCheck(e){
    var li = e.target.parentElement;

    li.children[0].removeEventListener("click" , bagg);
    li.children[0].addEventListener("click", removeLi);

    li.classList.toggle("checkLi");
    checkArray = getCheck();
    dataArray = getData();
    var index = dataArray.indexOf(e.target.parentElement.textContent);
    var index2 = checkArray.indexOf(index);
    checkArray.splice(index2 , 1);
    localStorage.setItem("movieCheck" , JSON.stringify(checkArray));

    //create check button
    var check = document.createElement("img");
    li.append(check);
    check.classList.add("check" , "hidden");
    
    check.setAttribute("src", "icon/check.png")

    li.addEventListener("click", function hidden(){check.classList.toggle("hidden");})
    //check li after click on check button

    check.addEventListener("click", checkLi);
    e.target.remove();
    
}

//for get old data from Local Storage
function getData(){
    var dataArray;
    var dataString = localStorage.getItem("movieList");
    if(dataString === null){dataArray = []}
    else{dataArray = JSON.parse(dataString)};
    return dataArray;
}
//for get checks data
function getCheck(){
    var checkArray;
    var checkString = localStorage.getItem("movieCheck");
    if(checkString === null){checkArray = []}
    else{checkArray = JSON.parse(checkString)};
    return checkArray;
}
//for set check data to Local Storage
function showCheck(){
    checkArray = getCheck();
    for(var i = 0; i < checkArray.length; i++){show()}
    function show(){
        var lis = document.querySelectorAll("li");
        var index = checkArray[i];
        lis[index].classList.toggle("checkLi");
        checkOut2(checkArray[i]);
    }
}
function checkOut2(e){
    var li = document.querySelectorAll("li")[e];
    var xcheck = document.createElement("img");
    xcheck.setAttribute("src", "icon/x.png");
    xcheck.classList.add("check" , "hidden");
    xcheck.classList.toggle("hidden");
    li.append(xcheck);
    li.addEventListener("click", function hidden(){xcheck.classList.toggle("hidden");})
    li.children[1].remove();
    li.children[0].removeEventListener("click" , removeLi)
    li.children[0].addEventListener("click" , bagg)
    xcheck.addEventListener("click" , removeCheck)
}
function bagg(){
    alert(" لطفا ابتدا تیک را بردارید ")
}
//for set new data to Local Storage
function setData(x){
    dataArray = getData();
    dataArray.push(x);
    localStorage.setItem("movieList" , JSON.stringify(dataArray));
}

//for show data on web site
function showData(){
    dataArray = getData()
    for(var i = 0 ; i < dataArray.length ; i++){show()};
    function show(){
        //create li tag with Local Storage content
        var li = document.createElement("li");
        ul.append(li);
        li.append(dataArray[i]);

        //create remove button
        var rem = document.createElement("img");
        li.append(rem);
        rem.classList.add("rem" , "hidden");
        rem.classList.toggle("hidden");
        rem.setAttribute("src", "icon/bin.png")
        //delete li after click on remove button
        rem.addEventListener("click", removeLi);
        
        //create check button
        var check = document.createElement("img");
        li.append(check);
        check.classList.add("check" , "hidden");
        check.classList.toggle("hidden");
        check.setAttribute("src", "icon/check.png")
        //check li after click on check button
        check.addEventListener("click", checkLi);


        //show cheek and remove button after click on li
        li.addEventListener("click", function hidden(){
        check.classList.toggle("hidden");
        rem.classList.toggle("hidden");
        li.classList.toggle("li-display");} ) }
}