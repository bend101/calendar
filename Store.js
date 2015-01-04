/**
 * Created by Ben on 14/11/2014.
 */
function Store()
{
	this.theme = "themeFlower";
	this.firstDayOfWeek = 0;
	this.dateToDayMap={};
	this.user="";
}
Store.prototype.getKey=function(date)
{
	return (date.getFullYear())+"/"+(date.getMonth())+"/"+(date.getDate());
}

Store.prototype.getNotes=function(date)
{
	return this.dateToDayMap[this.getKey(date)];
}
Store.prototype.putNotes=function(date,notes)
{
	this.dateToDayMap[this.getKey(date)] = notes;

}

Store.prototype.saveToLocalStorage=function()
{
	var saveObj = 	this.save();
	var saveObjAsString=JSON.stringify(saveObj);
	localStorage.setItem(this.getSaveName(), saveObjAsString);
}

Store.prototype.save=function()
{
	var saveObj = 	{};
	saveObj.Theme = this.theme;
	saveObj.FirstDayOfWeek = this.firstDayOfWeek;
	saveObj.Days = {};
	saveObj.TimeStamp = (new Date()).getTime();

	for (var dateKey in this.dateToDayMap)
	{
		saveObj.Days[dateKey] = this.dateToDayMap[dateKey].save();
	}
	return saveObj;
}

Store.prototype.getSaveName=function()
{
	if (window.location.search!=="")
	{
		var queryString=window.location.search.substring(1);
		var pieces=queryString.split("=");
		if (pieces[0]==="name")
		{
			return pieces[1]+"_notes";
		}
	}

	return "notes";
}

Store.prototype.loadFromLocalStorage=function()
{
	var returnedString=localStorage.getItem(this.getSaveName());
	this.load(returnedString);
}

Store.prototype.loadFromServer=function(fnLoaded)
{
	var url="http://192.168.0.13:3000/calendarLoad?name=" + this.getSaveName();

	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onreadystatechange = function ()
	{
		if (request.readyState === 4) // request finished
		{
			console.log(request);
			this.load(request.response);
			fnLoaded();
		}
	}.bind(this);
	request.send(null);
}

Store.prototype.saveToServer=function()
{
	var url="http://192.168.0.13:3000/calendarSave?name=" + this.getSaveName();

	var request = new XMLHttpRequest();
	request.open('POST', url, true);
	request.setRequestHeader('Content-Type', 'application/json');
	var stringToSend=JSON.stringify(this.save());

	request.onreadystatechange = function ()
	{
		if (request.readyState === 4) // request finished
		{
			console.log("saved");

		}
	}.bind(this);
	console.log("sending: " + stringToSend);
	request.send(stringToSend);
}

Store.prototype.load=function(jsonString)
{


	console.log("json = " +jsonString);

	if (jsonString != null)
	{
		var loadObj = JSON.parse(jsonString);
		this.theme = loadObj.Theme;
		this.firstDayOfWeek = loadObj.FirstDayOfWeek;

		for (var dateKey in loadObj.Days)
		{
			var loadedDay = loadObj.Days[dateKey];
			var day = Day.load(loadedDay);

			this.dateToDayMap[dateKey] = day;
		}
	}
}

Store.prototype.merge=function(otherStore)
{
 for(var dateString in this.dateToDayMap)
 {
	 if (otherStore.dateToDayMap[dateString]!==undefined)
	 {
		 var day1=this.dateToDayMap[dateString];
		 var day2=otherStore.dateToDayMap[dateString];
		 var dayMerged=Day.merge(day1,day2);
		 this.dateToDayMap[dateString]=dayMerged;

	 }

 }
for (var dateStringInOtherStore in otherStore.dateToDayMap)
	{
		if (this.dateToDayMap[dateStringInOtherStore] === undefined)
		{
			this.dateToDayMap[dateStringInOtherStore]=otherStore.dateToDayMap[dateStringInOtherStore];
		}
	}
}
