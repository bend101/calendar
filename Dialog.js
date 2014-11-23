/**
 * Created by Ben on 17/11/2014.
 */
// move mouseup to mouse down listener
// have show() and hide() methods
// onOK and onCancel methods

function Dialog (title, width, height, closeListener)
{
	this.closeListener = closeListener;

	this.dialogDiv=document.createElement("div");
	this.dialogDiv.style.width=width+"px";
	this.dialogDiv.style.height=height+"px";
	this.dialogDiv.className="dialogDiv";
	document.body.appendChild(this.dialogDiv);

	this.topDiv=document.createElement("div");
	this.topDiv.className="topDiv";
	this.middeDiv=document.createElement("div");
	this.middeDiv.className="middleDiv";
	this.bottomDiv=document.createElement("div");
	this.bottomDiv.className="bottomDiv";

	this.dialogDiv.appendChild(this.topDiv);
	this.dialogDiv.appendChild(this.middeDiv);
	this.dialogDiv.appendChild(this.bottomDiv);

	this.exitButton=document.createElement("button");
	this.exitButton.className="exitButton";
//	this.exitButton.src="dialogExit.png";
	this.exitButton.addEventListener("click",this.onCancel.bind(this));

	this.topDiv.appendChild(this.exitButton);
	this.topDivSpan=document.createElement("span");
	this.topDiv.appendChild(this.topDivSpan);
	this.topDivSpan.innerHTML=title;
	this.topDivSpan.className="topDivSpan";
//	this.middeDiv.style.height=(parseInt(this.dialogDiv.offsetHeight)-134)+"px";

	this.topDiv.addEventListener("mousedown",this.onMouseDown.bind(this));
	document.body.addEventListener("mouseup",this.onMouseUp.bind(this));

	this.dialogDiv.style.left=(window.innerWidth/2)-(width/2)+"px";
	this.dialogDiv.style.top=(window.innerHeight/2)-(height/2)+"px";
	this.partialBorder=document.createElement("img");
	this.partialBorder.src="partialBorder.png";
	this.bottomDiv.appendChild(this.partialBorder);
	this.partialBorder.className="partialBorder";
	this.partialBorder.style.width=(this.bottomDiv.clientWidth-12)+"px";
	this.partialBorder.style.left=(this.bottomDiv.clientLeft+6)+"px";
	this.okButton=document.createElement("button");
	this.cancelButton=document.createElement("button");
	this.okButton.innerHTML="OK";
	this.cancelButton.innerHTML="Cancel";
	this.cancelButton.addEventListener("click",this.onCancel.bind(this));
	this.okButton.addEventListener("click",this.onOK.bind(this));
	this.okButton.className="okButton";
	this.cancelButton.className="cancelButton";
	this.bottomDiv.appendChild(this.okButton);
	this.bottomDiv.appendChild(this.cancelButton);
}

Dialog.prototype.onMouseMove=function(event)
{
	var mouseX=event.clientX;
	var mouseY=event.clientY;
	var difference=mouseX-this.mouseDownX;
	var differenceY=mouseY-this.mouseDownY;
	this.dialogDiv.style.left=(this.leftCoordinate+difference)+"px";
	this.dialogDiv.style.top=(this.topCoordinate+differenceY)+"px";
	console.log(mouseX,this.mouseDownX);

}

Dialog.prototype.onMouseDown=function(event)
{
	this.mouseDownListener = this.onMouseMove.bind(this);
	document.body.addEventListener("mousemove",this.mouseDownListener);

	this.mouseDownX=event.clientX;
	this.mouseDownY=event.clientY;
	this.leftCoordinate=this.dialogDiv.offsetLeft;
	this.topCoordinate=this.dialogDiv.offsetTop;
	console.log(this.leftCoordinate);
}

Dialog.prototype.onMouseUp=function(event)
{
	document.body.removeEventListener("mousemove",this.mouseDownListener);
}

Dialog.OK = 0;
Dialog.CANCEL = 1;

Dialog.prototype.onCancel=function()
{
	document.body.removeChild(this.dialogDiv);
	this.closeListener(this, Dialog.CANCEL);
}

Dialog.prototype.onOK=function()
{
	document.body.removeChild(this.dialogDiv);
	this.closeListener(this, Dialog.OK);
}


