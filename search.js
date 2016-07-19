var throttle = function (fn,delay,atleast,o) {
	// console.log(fn);
    var timer = null;
    var previous = null; 
    return function () {  	
        var now = +new Date();  		
        if ( !previous ) previous = now;
        if ( atleast && now - previous > atleast ) {
            searchTool.input(o.value);
            // 重置上一次开始时间为本次结束时间
            previous = now;         
        } else {
            clearTimeout(timer);
            timer = setTimeout(function() {
                searchTool.input(o.value);
                   previous = null;
            }, delay);
        }
    }();
};

var searchTool={
	searchGroup:function(){
		return searchResults.getElementsByTagName("span");
	},
	init:function(){
		for(var i=0,l=this.searchGroup().length;i<l;++i){
			that=this;
			this.searchGroup()[i].onclick=function(){
				search.value=this.innerText;
				var len=that.searchGroup().length;
				while(len){
					that.searchGroup()[--len].style.display="none";
				}			
			}
		}		
	},
	focus:function(){
		this.showList();
		searchResults.style.display="block";
	},
	blur:function(){
		that=this;
		setTimeout(function(){
			var len=that.searchGroup().length;
			searchResults.style.display="none";
		},150);
	},
	searcha:function(v){
		var temp=[];
		var temp2=[];
		for(var i=0,len=group.length;i<len;i++){	
		    //不符合的	
			if(group[i].indexOf(v)<0){
				temp.push(i);	
			}
			else{
				temp2.push(i);
			}
		}
		//隐藏
		for(var i=0,len2=temp.length;i<len2;++i){
			 this.searchGroup()[temp[i]].style.display="none";
		}
		//出现
		for(var j=0,len=temp2.length;j<len;++j){
			this.searchGroup()[temp2[j]].style.display="block";
		}
	},	
	input:function(e){
		// console.log(this);
		if(!e){
			this.showList(e);
			return;		
		}
		this.searcha(e);		
	},
	showList:function(e){
		if(!e){
			var len=this.searchGroup().length;
			while(len){
				this.searchGroup()[--len].style.display="block";
			}		
		}		
	}

};	

(function(){
var searchResults=document.getElementById("searchResults");
var len=group.length;
var temp=document.createDocumentFragment();
for(var i=0;i<len;i++){
	var span=document.createElement("span");
	span.className="sr";
	span.innerHTML=group[i];
	temp.appendChild(span);
}
searchResults.appendChild(temp);
searchTool.init();
})();

