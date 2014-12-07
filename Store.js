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

Store.prototype.save=function()
{
	var saveObj = 	{};
	saveObj.Theme = this.theme;
	saveObj.FirstDayOfWeek = this.firstDayOfWeek;
	saveObj.Notes = {};
	saveObj.TimeStamp = (new Date()).getTime();

	for (var dateKey in this.dateToDayMap)
	{
		var notes = this.dateToDayMap[dateKey];

		saveObj.Notes[dateKey] = [];

		for (var i=0;i<notes.length();i++)
		{
			saveObj.Notes[dateKey].push(notes.getNote(i));
		}
	}

	var saveObjAsString=JSON.stringify(saveObj);
	if (window.location.search==="")
	{
		localStorage.setItem("notes", saveObjAsString);
	}
	else
	{
		var queryString=window.location.search.substring(1);
		var pieces=queryString.split("=");
		if (pieces[0]==="name")
		{
			localStorage.setItem(pieces[1]+"_notes", saveObjAsString);
			this.user=pieces[1];
		}
	}

}

Store.prototype.load=function()
{
	var returnedString=localStorage.getItem("notes");

	console.log("json = " +returnedString);

	if (returnedString != null)
	{
		var loadObj = JSON.parse(returnedString);
		this.theme = loadObj.Theme;
		this.firstDayOfWeek = loadObj.FirstDayOfWeek;

		for (var dateKey in loadObj.Notes)
		{
			var lines = loadObj.Notes[dateKey];
			var notes = new Day();
			for (var i=0; i<lines.length; i++)
			{
				notes.add(lines[i]);
			}
			this.dateToDayMap[dateKey] = notes;
		}
	}
}
