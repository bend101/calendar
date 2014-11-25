/**
 * Created by Ben on 19/11/2014.
 */
function NotesDialog(title, width, height, closeListener, notes)
{
	Dialog.call(this,title, width, height, closeListener);
	this.notes = notes;
	this.itemsArray=notes.noteArray.slice(0);

	this.listBox=new ListBox(this.itemsArray.length,this.onSelectionChange.bind(this),this.onRender.bind(this));
	this.middeDiv.innerHTML='   <div class="notesDialog-notesDialog">'+
		'       <div class="notesDialog-topPart">'+
		'            <span class="notesDialog-textAddEdit">Add/edit notes</span>'+
		'            <input class="notesDialog-inputBox"></input>'+
		'            <button class="notesDialog-addEditButton">Add</button>'+
		'       </div>'+
		'        <div class="notesDialog-bottomPart">'+
		'            <span class="notesDialog-textCurrentNotes">Current notes</span>'+
		'            <div class="notesDialog-listDivBox"></div>'+
		'            <button class="notesDialog-deleteButton">Delete</button>'+
		'        </div>'+
		'    </div>'
	this.listDiv=document.querySelector(".notesDialog-listDivBox");
	this.inputBox=document.querySelector(".notesDialog-inputBox");
	this.inputBox.focus();
	this.deleteButton=document.querySelector(".notesDialog-deleteButton");
	this.deleteButton.addEventListener("click",this.onDeleteClick.bind(this));
	this.addEditButton=document.querySelector(".notesDialog-addEditButton");
	this.addEditButton.addEventListener("click",this.onAddEditClick.bind(this));


	console.log(this.listDiv);
	this.listDiv.appendChild(this.listBox.getElement());
}

NotesDialog.prototype=Object.create(Dialog.prototype);

NotesDialog.prototype.onSelectionChange=function(listBox,index)
{
	var string=this.itemsArray[index];
	this.inputBox.value=string;
	if (this.listBox.getSelectedIndex()!==-1)
	{
		this.addEditButton.innerHTML="Edit";
	}
}

NotesDialog.prototype.onRender=function(div,index)
{
	div.innerHTML=this.itemsArray[index];
}

NotesDialog.prototype.onDeleteClick=function()
{
	var index=this.listBox.getSelectedIndex();
	this.listBox.removeRow(index);
	this.itemsArray.splice(index,1);
	this.inputBox.value="";
	this.addEditButton.innerHTML="Add";
	console.log(this.itemsArray);

}

NotesDialog.prototype.onAddEditClick=function()
{
	if (this.listBox.getSelectedIndex()!==-1)
	{
		this.itemsArray[this.listBox.getSelectedIndex()]=this.inputBox.value;
		this.listBox.updateRow(this.listBox.getSelectedIndex());
		this.inputBox.value="";
		this.addEditButton.innerHTML="Add";
	}
	else
	{
		if(this.inputBox.value.trim()!=="")
		{
			this.itemsArray.push(this.inputBox.value);
			this.listBox.addRow();
			this.inputBox.value = "";
		}
	}
}

NotesDialog.prototype.getNotes = function()
{
	return this.notes;
}

NotesDialog.prototype.onOK=function()
{
	this.notes.noteArray = this.itemsArray;
	Dialog.prototype.onOK.call(this);
}

