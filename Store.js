/**
 * Created by Ben on 14/11/2014.
 */
function Store()
{
	this.theme = "themeFlower";
	this.firstDayOfWeek = 0;
	this.store={};
	this.user="";
}
Store.prototype.getKey=function(date)
{
	return (date.getFullYear())+"/"+(date.getMonth())+"/"+(date.getDate());
}

Store.prototype.getNotes=function(date)
{
	return this.store[this.getKey(date)];
}
Store.prototype.putNotes=function(date,notes)
{
	this.store[this.getKey(date)] = notes;

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

	for (var dateKey in this.store)
	{
		saveObj.Days[dateKey] = this.store[dateKey].save();
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

			this.store[dateKey] = day;
		}
	}
}
