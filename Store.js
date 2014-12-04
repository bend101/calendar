/**
 * Created by Ben on 14/11/2014.
 */
function Store()
{
	this.store={};
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

Store.prototype.save=function()
{
	var jsonObj = {};
	for (var dateKey in this.store)
	{
		var notes = this.store[dateKey];
		var notesJsonObj = notes.toJSON();
		jsonObj[dateKey]= notesJsonObj;
	}

	var notesAsString=JSON.stringify(jsonObj);
	localStorage.setItem("notes", notesAsString);
}

Store.prototype.load=function()
{
	var returnedString=localStorage.getItem("notes");
	console.log("json = " +returnedString);
	if (returnedString != null)
	{
		var jsonObj = JSON.parse(returnedString);
		for (var dateKey in jsonObj)
		{
			var jsonNotes = jsonObj[dateKey];
			var notes = Notes.fromJSON(jsonNotes);
			this.store[dateKey] = notes;
		}
	}
}
