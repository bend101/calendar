/**
 * Created by Ben on 14/11/2014.
 */
function Notes()
{
	this._noteArray=[];
}

Notes.prototype.clone=function()
{
	var copyNotes = new Notes();
	copyNotes._noteArray = this._noteArray.slice(0);
	return copyNotes;
}

Notes.prototype.copyFrom=function(fromNotes)
{
	this._noteArray=fromNotes._noteArray.slice(0);
}

Notes.prototype.length=function()
{
	return this._noteArray.length;
}

Notes.prototype.getNote=function(index)
{
	return this._noteArray[index];
}

Notes.prototype.remove=function(index)
{
	this._noteArray.splice(index,1);
}

Notes.prototype.add=function(newItem)
{
	this._noteArray.push(newItem);
}

Notes.prototype.update=function(index,newItem)
{
	this._noteArray[index]=newItem;
}


Notes.prototype.toJSON=function(parent)
{

}
