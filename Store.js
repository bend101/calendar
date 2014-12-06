/**
 * Created by Ben on 14/11/2014.
 */
function Store()
{
	this.theme = "themeFlower";
	this.firstDayOfWeek = 0;
	this.dateToNotesMap={};
}
Store.prototype.getKey=function(date)
{
	return (date.getFullYear())+"/"+(date.getMonth())+"/"+(date.getDate());
}

Store.prototype.getNotes=function(date)
{
	return this.dateToNotesMap[this.getKey(date)];
}
Store.prototype.putNotes=function(date,notes)
{
	this.dateToNotesMap[this.getKey(date)] = notes;

}

Store.prototype.save=function()
{
	var saveObj = {};
	saveObj.Theme = this.theme;
	saveObj.FirstDayOfWeek = this.firstDayOfWeek;
	saveObj.Notes = {};

	for (var dateKey in this.dateToNotesMap)
	{
		var notes = this.dateToNotesMap[dateKey];

		saveObj.Notes[dateKey] = [];

		for (var i=0;i<notes.length();i++)
		{
			saveObj.Notes[dateKey].push(notes.getNote(i));
		}
	}

	var saveObjAsString=JSON.stringify(saveObj);
	localStorage.setItem("notes", saveObjAsString);
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
			var notes = new Notes();
			for (var i=0; i<lines.length; i++)
			{
				notes.add(lines[i]);
			}
			this.dateToNotesMap[dateKey] = notes;
		}
	}
}
