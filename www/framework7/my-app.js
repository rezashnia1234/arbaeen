
if(true)
{
	winW = 0;
	winH = 0;
	app = {};
	FileTransfer_OBJ = "";

	if(window.localStorage.getItem('language') == null)
	{
		text_direction = "english_text";
		lang = lang_en;
	}
	else
	{
		text_direction = window.localStorage.getItem('text_direction');
		lang = window[window.localStorage.getItem('language')];
	}

	function init() {
		console.log('SMGROUP ::::::::::::::::::::::::::::::::::::	start init()');
		document.addEventListener("deviceready", onDeviceReady, false);
		set_body_language();
		
		if(window.localStorage.getItem('winH') != null)
			winH = window.localStorage.getItem("winH");
			
		setTimeout(function(){
			winW_temp = jQuery(window).width();
			winH_temp = jQuery(window).height();
			if(winH_temp != "" || winH_temp!=0)
			{
				winW = winW_temp;
				winH = winH_temp;
				window.localStorage.setItem("winH", winH);
			}
		}, 200);
		setTimeout(function(){
			winW_temp = jQuery(window).width();
			winH_temp = jQuery(window).height();
			if(winH_temp != "" || winH_temp!=0)
			{
				winW = winW_temp;
				winH = winH_temp;
				window.localStorage.setItem("winH", winH);
			}
		}, 300);
		setTimeout(function(){
			winW_temp = jQuery(window).width();
			winH_temp = jQuery(window).height();
			if(winH_temp != "" || winH_temp!=0)
			{
				winW = winW_temp;
				winH = winH_temp;
				window.localStorage.setItem("winH", winH);
			}
		}, 400);

		
	}
	function onDeviceReady() {
		if(window.localStorage.getItem('udid') == null)
			window.plugins.uniqueDeviceID.get(uniqueDeviceIDsuccess_index, alertDismissed);
			
		register_notification_home();

	}
	function go_back_index() {
		//StartScan();
		navigator.notification.confirm(
			multilang.get('do_you_want_to_exit_the_application'),	// message
			onExitConfirm,											// callback
			multilang.get('notice'),								// title
			[multilang.get('yes'),multilang.get('no')]				// buttonName
		);
	}
	
	
	function onExitConfirm(buttonIndex) {
		if(buttonIndex==1)
			navigator.app.exitApp();
	}
	function need_internet() {
		navigator.notification.alert(
			multilang.get('you_must_connect_to_the_internet'),  // message
			alertDismissed,		 // callback
			multilang.get('warning'),			// title
			multilang.get('ok')		// buttonName
		);
	}
	function alertDismissed() {}
	
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Initialize app
	Template7.registerHelper('json_stringify', function(context) {
		return JSON.stringify(context);
	});
	/*
	var myApp = new Framework7({
		animateNavBackIcon: true,
		precompileTemplates: true,
		template7Pages: true,
		template7Data: {
			'url:index.html': {

			},
		}
	});
	*/
	var myApp = new Framework7();
	var $$ = Dom7;
	var mainView = myApp.addView('.view-main', {
		dynamicNavbar: true,
	});
	/*
	myApp.onPageInit('about', function (page) {
		//css_placeholder
		$(".navbar").css("display","block");
	});
	*/
	myApp.onPageInit('index', function (page) {
		$(".navbar").css("display","none");
	});
	myApp.onPageInit('about', function (page) {
		//css_placeholder
		// alert();
		// console.log("1");
		// $(".navbar").css("display","block");
		myApp.alert('Here comes About page');
	});

}









