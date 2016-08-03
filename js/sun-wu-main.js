// WuKong Elements

(function( $ ) {
 
    $.fn.slider = function() {
 
 		//H-Sliders
        this.filter( ".h-slider" ).each(function() {
            var cE = $(this);
			var cset = ((cE.find('input').val()-cE.attr('min')))/((cE.attr('max')-cE.attr('min')));
			console.log(cset);
			var tab = cE.find('span:nth-child(1) > div:nth-child(1)');
			var rMax = cE.attr('rMax'), rMin = cE.attr('rMin');
			
			if( rMax && rMax < cset){
					cset=rMax;
					
				}else if(rMin && rMin > cset){
					cset=rMin;
				}
				
			if(cset > cE.attr('max')){
			cset = 1;
			cE.find('input').val(cE.attr('max'));	
			}else if(cset < cE.attr('min')){
			cset = 0;	
			cE.find('input').val(cE.attr('min'));
			}
			
			
			tab.css('left',
			(cE.find('span:nth-child(1)').width()-tab.width())*cset
			);
			
			
			
			cE.mDown = false;
			
			cE.bind('click', function(e){
				var rel = (e.clientX-($(e.target).offset()).left);
				tab.css('left', rel);
				rel/=tab.parent().width();
				
				rel = cE.attr('max')*rel;
				
				if(cE.attr('step')>=0){
					rel = rel.toFixed(cE.attr('step'));
				}
				
				cE.find('input').val(rel);
			});
			
			tab.bind('mousedown', function(){
				cE.mTarget = $(this);
				cE.mDown = true;
			});
			
			cE.bind('mousemove', function(e){
				if(!cE.mDown){return}
				   var offset = $(this).offset();
   					 
  		 	var relX = e.pageX - offset.left;
   			
			cE.mTarget.css('left', relX);
			
			if((cE.mTarget.offset()).left < 0){
				cE.mTarget.css('left', 0);
			
			}else if((cE.mTarget.offset()).left > cE.mTarget.parent().width()){
			cE.mTarget.css('left', cE.mTarget.parent().width()-(cE.mTarget.width()));
			}
			
			var percent =(cE.mTarget.position()).left / (cE.mTarget.parent().width()-(cE.mTarget.width()));
			//console.log(percent);
			var mn = cE.attr('min'), mx = cE.attr('max'), s = cE.attr('step');
			var cur = mx*percent;
			cur = ((cur - mn)/(mx - mn))*(mx);
			if(s>=0){
				cur = cur.toFixed(s);
			}
			
			cE.find('input').val(cur);

			});
			
			cE.find('input').on('change', function(){
				var val = parseInt($(this).val(),10);
				
				if(cE.attr('step')>=0){
					val = val.toFixed(cE.attr('step'));
				}
				
				if( rMax && rMax < val){
					val=rMax;
					cE.find('input').val(cE.attr('max'));
				}else if(rMin && rMin > val){
					val=rMin;
					cE.find('input').val(cE.attr('min'));
				}
				
			var sSet = ((val-cE.attr('min')))/((cE.attr('max')-cE.attr('min')));
			var width = cE.find('span:nth-child(1)').width() - cE.find('span:nth-child(1) > div:nth-child(1)').width();
			sSet = width*sSet;
			
			if(sSet > cE.attr('max')){
			sSet = 1;	
			}
			
			if(sSet < cE.attr('min')){
			sSet = 0;	
			}
			
			cE.find('span:nth-child(1) > div:nth-child(1)').css('left',
			width*sSet
			);
			});
			
			$(document).bind('mouseup', function(){
				if(cE.mDown){
				cE.mDown = false;
				console.log('Release');
				}
			});
			
        });
		
		
 
        return this;
 
    };
 
}( jQuery ));