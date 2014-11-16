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
	var notesAsString=JSON.stringify(this.store);
	localStorage.setItem("notes", notesAsString);
}

Store.prototype.load=function()
{
	var returnedString=localStorage.getItem("notes");
	console.log("json = " +returnedString);
	if (returnedString != null)
	{
		this.store = JSON.parse(returnedString);
	}
}
