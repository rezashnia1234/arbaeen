
function register_notification_home() {
	// alert("before register_notification_home");
	
	var networkState = navigator.connection.type;
	if (networkState == Connection.NONE) {
		// alert("no internet for register_notification_home");
	}
	else
	{
		var push = PushNotification.init({
			android: {
				senderID: "804625540618"
			},
			ios: {
				alert: "true",
				badge: "true",
				sound: "true"
			},
			windows: {}
		});

		push.on('registration', function(data) {
			// data.registrationId
			// alert("registration event: " + data.registrationId);
			// alert("registration uuid: " + window.localStorage.getItem('uuid'));
			// alert("registration uuid: " + window.localStorage.getItem('uuid'));
			// alert("registration platform: " + device.platform);
			
			$.ajax({
				type: "POST",
				url: "http://dlsmgroup.ir/temp/arbaeen/check_net.php", 
				data: {
					act: "add_device",
					regID: data.registrationId,
					udid: window.localStorage.getItem('uuid'),
					OS:device.platform
				},
				async: false,
				success : function(text)
				{
					//last_articles_version = text;
					console.log('SMGROUP ::::::::::::::::::::::::::::::::::::    Notification registration text : ' + text);
					window.localStorage.setItem('register_for_notifs','yes');
				}
			});
		});

		push.on('notification', function(data) {
			// data.message,
			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			// data.additionalData
			navigator.notification.alert(
				data.message,				// message
				notif_alertDismissed,		// callback
				multilang.get("notice"),	// title
				multilang.get("ok")			// buttonName
			);
		});

		push.on('error', function(e) {
			// e.message
			// alert("push error = " + e.message);
		});
	}

}

function register_notification() {
	var networkState = navigator.connection.type;
	if (networkState == Connection.NONE) {
	
	}
	else
	{
		var push = PushNotification.init({
			android: {
				senderID: "804625540618"
			},
			ios: {
				alert: "true",
				badge: "true",
				sound: "true"
			},
			windows: {}
		});

		push.on('registration', function(data) {
			// data.registrationId
			// alert("registration event: " + data.registrationId);
		});

		push.on('notification', function(data) {
			// data.message,
			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			// data.additionalData
			navigator.notification.alert(
				data.message,				// message
				notif_alertDismissed,		// callback
				multilang.get("notice"),	// title
				multilang.get("ok")			// buttonName
			);
		});

		push.on('error', function(e) {
			// e.message
			// alert("push error = " + e.message);
		});
	}

}


function notif_alertDismissed(){};










