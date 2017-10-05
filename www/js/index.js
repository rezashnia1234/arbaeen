	server_url = "http://dlsmgroup.ir/temp/arbaeen/check_net.php";
	upload_image_url = "http://dlsmgroup.ir/temp/arbaeen/submit_found_object.php";
	winW = 0;
	winH = 0;
	app = {};
	FileTransfer_OBJ = "";

	setTimeout(function(){
		if(window.cordova)
			FileTransfer_OBJ = new FileTransfer();
	}, 100);

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
	
	lost_category_list = [
		multilang.get("Passport_and_identification_documents"),
		multilang.get("Clothing"),
		multilang.get("Money"),
		multilang.get("Watch"),
		multilang.get("Ring"),
		multilang.get("Jewelry"),
		multilang.get("Others"),
		multilang.get("Cancel"),
	];

	function set_body_language(){
		body = $("body");
		body.removeClass("english_text");
		body.removeClass("arabic_text");
		body.removeClass("persian_text");
		body.addClass(text_direction);
	}

	function isHighDensity(){
		return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
	}
	function isRetina(){
		return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
	}
	function check_retina() {
		if(isHighDensity() || isRetina())
		{
			$('.retina').each( function(i) {
				$(this).removeClass("retina");
				if($(this).attr("src"))
				{
					var temp_src_image = $(this).attr("src");
					if(temp_src_image.indexOf('-xx.png') === -1 && temp_src_image.indexOf('-xx.png') === -1)
						$(this).attr('src', temp_src_image.replace('.png' , '-xx.png').replace('.jpg' , '-xx.jpg') );
				}
				else
				{
					var temp_baclground_image = $(this).css('background-image');
					if(temp_baclground_image!="" && temp_baclground_image!="none" && temp_baclground_image.indexOf('-xx.png') === -1 && temp_baclground_image.indexOf('-xx.png') === -1)
						$(this).css('background-image', temp_baclground_image.replace('.png' , '-xx.png').replace('.jpg' , '-xx.jpg'));
				}
			});
		}
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
	function go_back_index() {
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
	function uniqueDeviceIDsuccess_index(udid){window.localStorage.setItem('udid',udid);}



	$( document ).ready(function() {
		if(window.localStorage.getItem('winH') != null)
			winH = window.localStorage.getItem("winH");
		else
		{
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
		}
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
		
	});




































































	function goto_page(page_name) {
		document.querySelector('#myNavigator').pushPage(page_name, {animation: "slid",animationOptions:{delay: 0.4} });
	}
	function goto_page_zaer_service() {
		document.querySelector('#myNavigator').pushPage("zaer_services.html", {animation: "slid",animationOptions:{delay: 0.4} });
	}


	function fromTemplate(text) {
		var dialog = document.getElementById('dialog-alert');
		if (dialog) {
			$('#dialog-text-dialog-alert').html(text);
			need_translate();
			dialog.show();
		}
		else {
			ons.createDialog('dialog.html')
				.then(function (dialog) {
				$('#dialog-text-dialog-alert').html(text);
				need_translate();
				dialog.show();
			});
		}
	};
	function show_progress_bar(cancel_btn) {
		var dialog = document.getElementById('dialog_progress_bar');
		if (dialog) {
			need_translate();
			if(cancel_btn=="without_cancel_btn")
				$("#progress_bar_cancel_btn").css("display","none");
			else if(cancel_btn=="with_cancel_btn")
				$("#progress_bar_cancel_btn").css("display","block");
			dialog.show();
		}
		else {
			ons.createDialog('dialog_progress_bar.html')
				.then(function (dialog) {
				need_translate();
				if(cancel_btn=="without_cancel_btn")
					$("#progress_bar_cancel_btn").css("display","none");
				else if(cancel_btn=="with_cancel_btn")
					$("#progress_bar_cancel_btn").css("display","block");
				dialog.show();
			});
		}
	};
	function hideDialog(id) {
		document.getElementById(id).hide();
	};

	function check_server(handle_check_server) {
		var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
		$.ajax({
				url: server_url,
				type: "POST",
				data: {
					act: "check_net",//timeStampInMs
				},
				//async: true,
				success : function(text)
				{
					modal.hide({animation: "fade"});
					handle_check_server(text);
				},
				error: function(jqXHR, exception) {
					$('#modal-text').html('<ons-icon icon="fa-wifi" size="28px"></ons-icon> <span>' + multilang.get('you_must_connect_to_the_internet') + '</span>');
					modal.show({animation: "fade"});
					setTimeout(function(){ modal.hide({animation: "fade"}); }, 2000);
				},
		});
	}

	function show_get_found_location_popup() {
		var dialog = document.getElementById('found_get_location_dialog');
		if (dialog) {
			//need_translate();
			dialog.show({animationOptions:{delay: 0.3}});
		}
		else {
			ons.createDialog('found_get_location_dialog.html')
				.then(function (dialog) {
				need_translate();
				if(window.localStorage.getItem('found_City_Name') != null)
					document.getElementById('found_City_Name').value = window.localStorage.getItem("found_City_Name");
				if(window.localStorage.getItem('found_Pillar_Number') != null)
					document.getElementById('found_Pillar_Number').value = window.localStorage.getItem("found_Pillar_Number");
				if(window.localStorage.getItem('found_Tent_Name') != null)
					document.getElementById('found_Tent_Name').value = window.localStorage.getItem("found_Tent_Name");
				dialog.show({animationOptions:{delay: 0.3}});
			});
		}
	};
	function show_get_found_Contacts_popup() {
		var dialog = document.getElementById('found_get_Contacts_dialog');
		if (dialog) {
			//need_translate();
			dialog.show({animationOptions:{delay: 0.3}});
		}
		else {
			ons.createDialog('found_get_Contacts_dialog.html')
				.then(function (dialog) {
				need_translate();

				if(window.localStorage.getItem('found_Phone_number') != null)
					document.getElementById('found_Phone_number').value = window.localStorage.getItem("found_Phone_number");
				if(window.localStorage.getItem('found_Telegram_ID') != null)
					document.getElementById('found_Telegram_ID').value = window.localStorage.getItem("found_Telegram_ID");
				if(window.localStorage.getItem('found_WhatsApp_ID') != null)
					document.getElementById('found_WhatsApp_ID').value = window.localStorage.getItem("found_WhatsApp_ID");
				if(window.localStorage.getItem('found_Line_ID') != null)
					document.getElementById('found_Line_ID').value = window.localStorage.getItem("found_Line_ID");
				if(window.localStorage.getItem('found_Imo_ID') != null)
					document.getElementById('found_Imo_ID').value = window.localStorage.getItem("found_Imo_ID");
					
				dialog.show({animationOptions:{delay: 0.3}});
			});
		}
	};

	function get_image() {
		window.imagePicker.getPictures(
			function(results) {
				for (var i = 0; i < results.length; i++) {
					console.log('Image URI: ' + results[i]);
					//alert('Image URI: ' + results[i]);
					window.sessionStorage.setItem('send_image_path',results[i]);
					/*
					//send_image(results[i]);
					setTimeout(function(){
						onConfirm();
					}, 600);
					function onConfirm(buttonIndex) {
						if(window.sessionStorage.getItem('send_image_path') != "")
						{
							//alert("2" + window.sessionStorage.getItem('send_image_path'));
							send_image(window.sessionStorage.getItem('send_image_path'));
						}
					}
					*/
				}
			}, function (error) {
				console.log('Error: ' + error);
				//alert('Error: ' + error);
			}, {
				maximumImagesCount: 1,
				width: 800,
				quality:75
			}
		);
	}
	function progress_bar_cancel_btn(){
		FileTransfer_OBJ.abort();
		$(".progress-bar__primary").css("width","");
		hideDialog('dialog_progress_bar');
		goto_page_zaer_service();
	}
	function submit_missing_data_by_ajax(){
		networkState = navigator.connection.type;
		if (networkState == Connection.NONE) {
			console.log("start_download : NO internet");
			navigator.notification.alert(
				multilang.get("you_must_connect_to_the_internet"),	// message
				alertDismissed,										// callback
				multilang.get("warning"),							// title
				multilang.get("ok"),								// buttonName
			);
		}
		else{
			var params = {};
			params.udid = window.localStorage.getItem('udid');
			
			if(window.localStorage.getItem('found_City_Name') != null)
				params.found_City_Name		= window.localStorage.getItem("found_City_Name");
			if(window.localStorage.getItem('found_Pillar_Number') != null)
				params.found_Pillar_Number	= window.localStorage.getItem("found_Pillar_Number");
			if(window.localStorage.getItem('found_Tent_Name') != null)
				params.found_Tent_Name		= window.localStorage.getItem("found_Tent_Name");
			if(window.localStorage.getItem('found_Phone_number') != null)
				params.found_Phone_number	= window.localStorage.getItem("found_Phone_number");
			if(window.localStorage.getItem('found_Telegram_ID') != null)
				params.found_Telegram_ID	= window.localStorage.getItem("found_Telegram_ID");
			if(window.localStorage.getItem('found_WhatsApp_ID') != null)
				params.found_WhatsApp_ID	= window.localStorage.getItem("found_WhatsApp_ID");
			if(window.localStorage.getItem('found_Line_ID') != null)
				params.found_Line_ID		= window.localStorage.getItem("found_Line_ID");
			if(window.localStorage.getItem('found_Imo_ID') != null)
				params.found_Imo_ID			= window.localStorage.getItem("found_Imo_ID");
			
			if(window.sessionStorage.getItem('user_longitude') != null)
				params.longitude			= window.sessionStorage.getItem('user_longitude');
			if(window.sessionStorage.getItem('user_latitude') != null)
				params.latitude				= window.sessionStorage.getItem('user_latitude');
			
			params.Select_a_category_id		= document.getElementById('Select_a_category_id').value;
			params.Name_of_the_device		= document.getElementById('Name_of_the_device').value;
			params.Description				= document.getElementById('Description').value;
			params.act						= "add_missing";
			params.type						= "1";
			console.log("params");
			console.log(params);
			$.ajax({
					url: upload_image_url,
					type: "POST",
					data: params,
					//async: true,
					success : function(text)
					{
						hideDialog('dialog_progress_bar');
						navigator.notification.alert(
							multilang.get("Your_Data_Submited_Successfully"),	// message
							goto_page_zaer_service,								// callback
							multilang.get("notice"),							// title
							multilang.get("ok")									// buttonName
						);
					},
					error: function(jqXHR, exception) {
						$('#modal-text').html('<ons-icon icon="fa-wifi" size="28px"></ons-icon> <span>' + multilang.get('you_must_connect_to_the_internet') + '</span>');
						modal.show({animation: "fade"});
						setTimeout(function(){ modal.hide({animation: "fade"}); }, 2000);
						hideDialog('dialog_progress_bar');
					},
			});
		}
	}
	function submit_missing_data_by_image(){
		file = window.sessionStorage.getItem('send_image_path');
	//alert('Image URI: ' + file);
		console.log("start_download check internet");
		networkState = navigator.connection.type;
		if (networkState == Connection.NONE) {
			console.log("start_download : NO internet");
			navigator.notification.alert(
				multilang.get("you_must_connect_to_the_internet"),	// message
				alertDismissed,										// callback
				multilang.get("warning"),							// title
				multilang.get("ok"),								// buttonName
			);
		}
		else{
			console.log("start_download : we have internet");

	//alert("start_download URL: " + file);
			console.log("start_download URL: " + file);
			
			FileTransfer_OBJ = new FileTransfer();
			
			$('.progress-bar-parent').css("display","block");
	//alert("1");
			FileTransfer_OBJ.onprogress = function(progressEvent) {
				if (progressEvent.lengthComputable) {
					var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
					//$('#status').html(perc + "% Uploading...");
					//$('.progress-bar-percent').css('width',perc + "%");
					$(".progress-bar__primary").css("width",perc + "%");
					$('#Uploading-text').html(perc + "% Uploading...");

					//progress_bar_element.css('width',perc);
				} else {
					//$('#status').html($('#status').html() + ".");
					//progress_bar_element.css('width',progress_bar_element.width()+1);
					//$('.progress-bar-percent').css('width',$('.progress-bar-parent').find('span').width()+1);
					//$(".progress-bar__primary").css("width",perc + "%");
				}
			};
	//alert("2");
			var uri = encodeURI(upload_image_url);
			function win(r) {
				console.log("Code = " + r.responseCode);
				console.log("Response = " + r.response);
				console.log("Sent = " + r.bytesSent);
	//alert("Response = " + r.response);
				
				//$('#status').html("");
				//$('.progress-bar-parent').find('span').css('width','2%');
				$('#Uploading-text').html("Upload is Finished");
				console.log("start_download : done");
				navigator.notification.alert(
					multilang.get("Your_Data_Submited_Successfully"),	// message
					goto_page_zaer_service,								// callback
					multilang.get("notice"),							// title
					multilang.get("ok")									// buttonName
				);
				//$('.progress-bar-parent').css("display","none");
				hideDialog('dialog_progress_bar');
				window.sessionStorage.setItem('send_image_path',null);
			}
	//alert("3");
			function fail(error) {
	alert("An error has occurred: Code = " + error.code);
				//console.log("upload error source " + error.source);
				//console.log("upload error target " + error.target);
	//alert(JSON.stringify(error));
				navigator.notification.alert(
					multilang.get("Error_in_uploading_file_please_try_again_later"),	// message
					alertDismissed,														// callback
					multilang.get("warning"),											// title
					multilang.get("ok")													// buttonName
				);
				$('.progress-bar-parent').find('span').css('width','2%');
				//$('.progress-bar-percent').css('width',"");
				//$('.progress-bar-parent').css("display","none");
				$(".progress-bar__primary").css("width","");
				hideDialog('dialog_progress_bar');
			}
	//alert("4");
			var options = new FileUploadOptions();
			var params = {};
			/*
			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////
			*/
			params.udid = window.localStorage.getItem('udid');
			
			if(window.localStorage.getItem('found_City_Name') != null)
				params.found_City_Name		= window.localStorage.getItem("found_City_Name");
			if(window.localStorage.getItem('found_Pillar_Number') != null)
				params.found_Pillar_Number	= window.localStorage.getItem("found_Pillar_Number");
			if(window.localStorage.getItem('found_Tent_Name') != null)
				params.found_Tent_Name		= window.localStorage.getItem("found_Tent_Name");
			if(window.localStorage.getItem('found_Phone_number') != null)
				params.found_Phone_number	= window.localStorage.getItem("found_Phone_number");
			if(window.localStorage.getItem('found_Telegram_ID') != null)
				params.found_Telegram_ID	= window.localStorage.getItem("found_Telegram_ID");
			if(window.localStorage.getItem('found_WhatsApp_ID') != null)
				params.found_WhatsApp_ID	= window.localStorage.getItem("found_WhatsApp_ID");
			if(window.localStorage.getItem('found_Line_ID') != null)
				params.found_Line_ID		= window.localStorage.getItem("found_Line_ID");
			if(window.localStorage.getItem('found_Imo_ID') != null)
				params.found_Imo_ID			= window.localStorage.getItem("found_Imo_ID");
			
			if(window.sessionStorage.getItem('user_longitude') != null)
				params.longitude			= window.sessionStorage.getItem('user_longitude');
			if(window.sessionStorage.getItem('user_latitude') != null)
				params.latitude				= window.sessionStorage.getItem('user_latitude');
			
			params.Select_a_category_id		= document.getElementById('Select_a_category_id').value;
			params.Name_of_the_device		= document.getElementById('Name_of_the_device').value;
			params.Description				= document.getElementById('Description').value;
			params.act						= "add_missing";
			params.type						= "1";
			
			options.params = params;
			
			
			FileTransfer_OBJ.upload(file, uri, win, fail, options);
	//alert("5");		
			/*
			$("#abort").click( function(i) {
				FileTransfer_OBJ.abort();
				$('.progress-bar-parent').find('span').css('width','2%');
				//$('.progress-bar-percent').css('width',"");
				//$('.progress-bar-parent').css("display","none");
				$(".progress-bar__primary").css("width","");
				hideDialog('dialog_progress_bar');
				//window.location.href = "index.html";
				//fn.load('zaer_services.html');
				goto_page_zaer_service();
			});
			*/
		}

	}






















