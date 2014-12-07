/**
 * Created by Ben on 14/11/2014.
 */
function Day()
{
	this._noteArray=[];
}

Day.prototype.clone=function()
{
	var copyNotes = new Day();
	copyNotes._noteArray = this._noteArray.slice(0);
	return copyNotes;
}

Day.prototype.copyFrom=function(fromNotes)
{
	this._noteArray=fromNotes._noteArray.slice(0);
}

Day.prototype.length=function()
{
	return this._noteArray.length;
}

Day.prototype.getNoteText=function(index)
{
	return this._noteArray[index].note;
}

Day.prototype.getNote=function(index)
{
	return this._noteArray[index];
}

Day.prototype.remove=function(index)
{
	this._noteArray.splice(index,1);
}

Day.prototype.add=function(newItem)
{

	var date=new Date();
	var dateTime=date.getTime();
	var note=new Note(newItem,dateTime);
	this._noteArray.push(note);
}

Day.prototype.update=function(index,newItem)
{
	var date=new Date;
	var dateTime=date.getTime();
	var note=this._noteArray[index];
	note.note=newItem;
	note.time=dateTime;
}

Day.merge=function(day1,day2)
{
	var day=new Day();



	return day;
}

