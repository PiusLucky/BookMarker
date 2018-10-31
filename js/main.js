// listen for form submit

document.getElementById("myForm").addEventListener('submit',saveBookmark);

function saveBookmark(e){
   //Get Frm Values 
   //This grabs the entire element and not the value
   // var  sitename = document.getElementById("siteName");
   //To Grab the value, just add .value
   var  sitename = document.getElementById("siteName").value;
   var  siteurl = document.getElementById("siteUrl").value;
   var  sitenameLength = sitename.length<=4


   if(!sitename  && !siteurl){
   	alert("Please Type Something!!!");
   	return false;
   }

   switch(sitename)

   {     
      
   		case '':
   		alert("You cannot leave the site name empty");
   		return false;

   		// case sitename.length<=1:
   		// alert("You need to input more than one digits!");
   		// return false;
   }


   switch(siteurl)
   {
   		case '':
   		alert("You cannot leave the site Url empty")
   		return false;
   }



   // if(!siteName  || !siteurl){
   // 	alert("Please fill the form");
   // 	return false;
   // }

   var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
   var regex = new RegExp(expression)
   if(!siteurl.match(regex)){
   	alert("Please use a valid url");
   	return false;

   }
   // Preventing Numbers
   if(sitename.match(/[0-9]/)){
   	alert("You must not include numerics in your website name!");
   	return false;
   }
   if(sitename.length<=1){
   	alert("Website name must be at least 2 characters! USER INPUT("+sitename.length+") Character(s) !");
   	return false;
   }





   var bookmark = {
   	name : sitename,
   	url : siteurl
   }
   // Local storage only store strings
   // Local Storage uses setItem, getItem, removeItem
   // You can also consolelog your output like so
   // console.log(localStorage.setItem("test", "Hello World"))
   // localStorage.setItem("test", "Hello World")
   if(localStorage.getItem("SITESAVED") === null){
   	// init array
   	var bookmarks = [];
   	// Add to Array
   	bookmarks.push(bookmark);
   	// Set to local storage
   	//SetItem takes two arguments, KEY and VALUE...IN OUR EXAMPLE ....--- 
   	          //KEY = "SITE SAVED" and 
   	          //VALUE =JSON.stringify(bookmarks)
   	localStorage.setItem("SITESAVED",JSON.stringify(bookmarks));

   }else{
   	// Get bookmarks from localstorage
   	 var bookmarks = JSON.parse(localStorage.getItem("SITESAVED"));
   	 // Add bookmark to array
   	 bookmarks.push(bookmark);
     // Re-set back to localStorage
   	 localStorage.setItem("SITESAVED",JSON.stringify(bookmarks));

   }
   // console.log(sitename)
   // console.log(siteurl)
   // console.log(bookmark)

   // console.log("You clicked Submit");
    // Re-Fetch bookmarks
    fetchBookmarks();
    //Reset the form after every save.
    document.getElementById("myForm").reset();

   e.preventDefault();
}
// Fetch Bookmarks 

// function fetchBookmarks(){
// 	var bookmarks = JSON.parse(localStorage.getItem("SITESAVED"));
// 	console.log(bookmarks)
// }
// NB:: This function does nothing until being invoked.
// NB:: You can use the onload event to call it from your index.html

//Fetch Bookmarks 
function deleteBookmark(url){
	// Get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem("SITESAVED"));
	// Loop through bookmarks
	for( var i=0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
		//Remove from array
		bookmarks.splice(i, 1);
	}
}
// Re-set back to local storage
localStorage.setItem("SITESAVED",JSON.stringify(bookmarks));
fetchBookmarks();
}

// function wait(){
//    alert("Hello please wait")
// }





function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem("SITESAVED"));
	// console.log(bookmarks)
	bookmarksResults.innerHTML= '';
	for( var i=0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;


		// MY OWN FREE STYLLING
		// bookmarksResults.innerHTML += name;
		// bookmarksResults.innerHTML +=  '<br>'
		// bookmarksResults.innerHTML += url;
		// bookmarksResults.innerHTML +=  '<br>'
		// bookmarksResults.innerHTML +=  '<hr>'
      // += means adding to bookmarksResults.innerHTML set above as empty
		bookmarksResults.innerHTML += ' <div class="well" > <h4> '+"<span>&nbsp;</span>"+name+ '<a class="btn btn-xs btn-primary"  href="'+url+'">Visit</a> <a  onclick="deleteBookmark(\''+url+'\')" class="btn btn-xs btn-danger" href="#">Delete</a></h4>'+'</div>';
	}

} 
