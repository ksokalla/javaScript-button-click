'use strict';

function ajax( ajaxOptions ) {
	// parametry połączenia i jego typu
	ajaxOptions = {
		type: ajaxOptions.type || "POST",
		url: ajaxOptions.url || "",
		onComplete: ajaxOptions.onComplete || function () {},
		onError: ajaxOptions.onError || function () {},
		onSuccess: ajaxOptions.onSuccess || function () {},
		dataType: ajaxOptions.dataType || "text"
	};
	
	//funckja sprawdzająca czy połączenie się udało
	
	function httpSuccess ( httpRequest) {
		 try {
			 return (httpRequest.status >= 200 && httpRequest.status < 300) || navigator.userAgent.indexOf("Safari") >= 0 && typeof httpRequest.status == "undefined";
		 } catch (e) {
			 return false;
		 }
	}
	// utowrzenie obiektu
	var httpReq = new XMLHttpRequest();
	// otwarcie połączenia
	httpReq.open(ajaxOptions.type, ajaxOptions.url, true);
	httpReq.onreadystatechange = function (){
		if (httpReq.readyState == 4) {
			// sprawdź status połączenia
			if (httpSuccess(httpReq)) {
			// jeśli dane w frmacie xml to zwróć obiekt responseXML, w przeciwnym wypadku responseText (JSON to text)
		
				var returnData = (ajaxOptions.dataType == "xml")? httpReq.responseXML : httpReq.responseText;
		
				// jeśli wszystko OK
				ajaxOptions.onSuccess( returnData );
		
		
				// zeruj obiekt aby nie utrzymywać już niepotrzebnego połączenia z serwerem
				httpReq = null;
		
			} else {
				
				//w przypadku błędu
				ajaxOptions.onError( httpReq.statusText );
			}
		}
	}
	
	httpReq.send();
}

	
function pobierzDane( event ) {
	event.preventDefault();
//	console.log(event);
	
	ajax( {
		type: "GET",
		url: "http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl",
		onError: function ( msg ) {
			console.log( msg);
		},
		onSuccess: function ( response ) {

			  var jsonObj = JSON.parse( response );
		
			  var pUserId = document.createElement('p');
			  var pUserName = document.createElement('p');
			  var pUserURL = document.createElement('p');

			  pUserId.innerHTML = "User ID: " + jsonObj.userId;
			  pUserName.innerHTML = "User Name: " + jsonObj.userName;
			  pUserURL.innerHTML = "User URL: http://" + jsonObj.userURL + "<br>-------";

			  document.body.appendChild(pUserId);
			  document.body.appendChild(pUserName);
			  document.body.appendChild(pUserURL);

		}
	});
}


