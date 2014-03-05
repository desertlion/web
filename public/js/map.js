var RegionalList = {
	indonesia  : [0,116.015625]
}


var MyMap={

	_map : false,
	 initialize :  function () {
        //inisiasi peta indonesia, dengan zoom level 4
        var laloIndonesia = new google.maps.LatLng(0,116.015625);
        var myIndonesia = {
            zoom: 5,           
            center: laloIndonesia,
            panControl: false,
			zoomControl: false,
		    mapTypeControl: true,

        };

        this._map = new google.maps.Map(document.getElementById("the-Map"), myIndonesia);

    }, 


    
  
	loadMarker : function(){
		var that  = this;
		$.each(POI, function(i, obj){
			var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(obj.location[0],obj.location[1]),
				  map: that._map,
				  title: obj.name
			  });

			var infowindow = that.renderInfo(obj);
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open( that._map,marker);
			  }); 
		});
	  },
  
	putMarker : function( Object ){
		var that  = this;

		if(typeof(  POI[Object["unique_key"]]) =='undefined')
				POI[Object["unique_key"]] = Object;		

		var marker = new google.maps.Marker({
			  position: new google.maps.LatLng(Object.location[0],Object.location[1]),
			  map: that._map,
			  title: Object.name
		  });


		 var infowindow = that.renderInfo(Object);
		 google.maps.event.addListener(marker, 'click', function() {
			infowindow.open( that._map,marker);
		  });  
	},


	renderInfo : function( Obj ){

		var InfoString1 =  	'<div class="info-window"> '+
							'<div class="info-header">  '+
							'	<h3> '+ Obj.name+' </h3> '+
							'	<h4 class="detail-row"><span class="map-detail-label">Contact :</span><span class="map-detail-desc">'+ Obj.phone+'</span></h4> '+
							'	<h4 class="detail-row"><span class="map-detail-label">Location :</span><span class="map-detail-desc">latitude '+ Obj.location[0] +', longitude '+ Obj.location[1]  +'</span></h4> '+
							'</div> '+

							'<div class="info-body">   '+ 
							'<p class="description">	'+ Obj.desc+' </p> '+
							'<ul class="detail"> '+
							'	<li class="detail-row"><span class="map-detail-label">Time :</span><span class="map-detail-desc"> '+ Obj.datetime+'</span></li> '+
							'	<li class="detail-row"><span class="map-detail-label">location :</span><span class="map-detail-desc"> latitude '+ Obj.location[0] +', longitude '+ Obj.location[1]  +' </span></li> '+
							'	<li class="detail-row"><span class="map-detail-label">phone :</span><span class="map-detail-desc">'+ Obj.phone+' </span></li> '+
							'	<li class="detail-row"><span class="map-detail-label">status :</span><span class="map-detail-desc">'+ Obj.status +' </span></li> '+
							'	<li class="detail-row"><span class="map-detail-label">Type :</span><span class="map-detail-desc">'+  Obj.type_victim +' </span></li>  '+
							'</ul>	 '+
							'</div> '+
							'</div> ';

	 var infowindow = new google.maps.InfoWindow({
		  content: InfoString1
	  });

		return infowindow;
	}

}