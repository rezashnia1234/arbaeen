

$( document ).ready(function() {
	var expireDateStr = "07/15/2017";//mm/dd/yyyy
	// var expireDateStr = "04/15/2017";//mm/dd/yyyy
	var expireDateArr = expireDateStr.split("/");
	var expireDate = new Date(expireDateArr[2], expireDateArr[0], expireDateArr[1]);
	var todayDate = new Date();

	if (todayDate > expireDate) {
	   $("body").html("");
	   $("body").css("background","#000000");
	};
});
