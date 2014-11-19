/**
 * Created by Ben on 19/11/2014.
 */
function NotesDialog(title, width, height, closeListener)
{
	Dialog.call(this,title, width, height, closeListener);
	this.listBox=new ListBox(["this is a note","so is this","and this","this is a note","so is this","and this","123"])
	this.middeDiv.appendChild(this.listBox.getElement());
}

NotesDialog.prototype=Object.create(Dialog.prototype);
