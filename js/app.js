function initApp(){
	//get randomized quote
	getRandomQuote();
	
	var qs = 'item';
	var url = window.location.search;
	
	
	//onload show random entry or grab hash
	if(window.location.hash) {
	  	var hash = window.location.hash;
		hash = hash.replace('#', '');
			
		if(hash != ''){
			getSpecificEntry(hash, false);
		}
	} 
	else if (url.match("item")) {
		var q = window.location.search.substring(1).replace('item=', '').replace('/', ''); 
		getSpecificEntry(q, false);
	}
	else {
	  getRandomEntry();
	}
		
	
}

function populateAutoComplete(){
	$('#autocomplete').html('');
	topicNum = 0;
	$.each(data.topics, function() {
		var name = data.topics[topicNum].name;
		var id = topicNum;
		var val = $('#search').val();
		var nameSub = name.substring(0, $('#search').val().length);
		
		if(val.toLowerCase() == nameSub.toLowerCase()){
			$('#autocomplete').append('<a class="loadDef">' + name + '<span class="id">'+id+'</span></a>')
		}	
		topicNum++;	
	});
}

function drawEps(ep){

	var epNum = 0;
	$.each(entries.episodes, function() {
		var title = entries.episodes[epNum].title;
		var episode = entries.episodes[epNum].episode;
		var path = entries.episodes[epNum].path;
		
		if(ep == episode){
			$('#eps').append('<a href="'+path+'">'+title+'</a>');
		}
		
		epNum++;
	});
	
}

function populateDetails(id, addHash){	
	var name = data.topics[id].name;
	var q = data.topics[id].quote;
	var def = data.topics[id].definition;
	var permalink = data.topics[id].permalink;
	var eps = data.topics[id].episodes[0];
	
	drawEps(eps);
	
	if(addHash){
		window.location.hash = id;	
	}
	
	$('#share').html('<a href="http://twitter.com/intent/tweet?url=http://definitiveroderick.com?item='+permalink+'">Share definition on Twitter</a>');
	
	$('#entryTitle').html(name);
	$('#q').html('"' + q + '"');
	$('#def').html(def);
	$('#detailsCol').focus();
	//$('#eps').html();
}

function getRandomQuote(){
	var numQuotes = quotes.length;
	var randomnumber=Math.floor(Math.random()*numQuotes);
	$('h2').html(quotes[randomnumber]);
}

function getRandomEntry(){
	//get random topic from data
	var num = data.topics.length;
	var randomnumber=Math.floor(Math.random()*num);
	var itemNum = randomnumber;
	
	$('#detailsCol').load('templates/details.html', function() {
	  populateDetails(itemNum, false);
	});
}

function getSpecificEntry(hash, addHash){
	
	$('#detailsCol').load('templates/details.html', function() {
		topicNum = 0;
		$.each(data.topics, function() {
			var permalink = data.topics[topicNum].permalink;
			var id = topicNum;
			
			//alert(hash +' - '+permalink);
			
			if(permalink ==  hash){
				//alert(hash +' - '+permalink);
				populateDetails(topicNum, addHash);
			}
			topicNum++;
			
		});
	
	
		
	});
}

$('#search').on('keyup', function(){
	if($(this).val() != ''){
		populateAutoComplete();
		$('#randomSearch').hide();	
	}
	else{
		$('#autocomplete').html('');
		$('#randomSearch').show();
	}
});

$('#autocomplete').on('click', "a", function(event){
	$('#detailsCol').html('');
	var itemNum = $(this).children('.id').text();
	
	$('#detailsCol').load('templates/details.html', function() {
	  populateDetails(itemNum, false);
	});
});


$('#randomSearch').on('click', "a", function(event){
	$('#detailsCol').html('');
	getRandomEntry();
});

$('#mastHead').on('click', "h2", function(event){
	getRandomQuote();
});




$(document).ready(function() {
  initApp();
});