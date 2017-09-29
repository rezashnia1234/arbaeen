var MultiLang = function(key)
{
	this.get = function(key) {
		// get key phrase
		var str;

		// check if any languages were loaded
		//if (this.phrases[this.selectedLanguage]) str = this.phrases[this.selectedLanguage][key];
		str = lang[key];
		if (str == null)
		{
			key = key.replace(/_/g, ' ');
			str = key;
		}
		// if key does not exist, return the literal key
		//str = (str || key);
		return str;
	};
}
var multilang = new MultiLang();
function need_translate() {
	$('.need_translate').each( function(i) {
		var translate_temp = $(this).attr("translate");
		if(translate_temp)
		{
			// $(this).css("direction",text_direction);
			// $(this).addClass(text_direction);
			$(this).html(multilang.get(translate_temp));
			$(this).val(multilang.get(translate_temp));
		}
	});
}

String.prototype.toEnglishDigits = function() {
	//6٦۶
	var num_dic = {
		'۰': '0',
		'۱': '1',
		'۲': '2',
		'۳': '3',
		'۴': '4',
		'۵': '5',
		'۶': '6',
		'۷': '7',
		'۸': '8',
		'۹': '9',
		'٠': '0',
		'١': '1',
		'٢': '2',
		'٣': '3',
		'٤': '4',
		'٥': '5',
		'٦': '6',
		'٧': '7',
		'٨': '8',
		'٩': '9',
	}

	return this.replace(/[۰-۹]/g, function (w) {
		return num_dic[w]
	}).replace(/[٠-٩]/g, function (w) {
		return num_dic[w]
	});
};
$( document ).ready(function() {
	jQuery('input[type="number"]').on('input', function() {
		var value = jQuery(this).val();
		jQuery(this).val(value.toEnglishDigits())
	});
	jQuery('input[type="mobile"]').on('input', function() {
		var value = jQuery(this).val();
		jQuery(this).val(value.toEnglishDigits())
	});
	jQuery('input[type="text"]').on('input', function() {
		var value = jQuery(this).val();
		jQuery(this).val(value.toEnglishDigits())
	});
});