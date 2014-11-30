/**
 * Created by Ben on 27/11/2014.
 */

function SideBar (calender)
{
	this.calender=calender;
	var container=document.createElement("div");

	this.themesArray=[ "themeImageOfMountain.png", "themeImageOfFlowers.png" ];

	container.innerHTML=
		'<div class="sidebar-container">'+
			'<p class="sidebar-chooseday">First day of the week</p>'+
			'<div class="sidebar-dropdownboxdiv">'+
				'<select class="dropDownBox">'+
					'<option>Sunday</option>'+
					'<option>Monday</option>'+
					'<option>Tuesday</option>'+
					'<option>Wednesday</option>'+
					'<option>Thursday</option>'+
					'<option>Friday</option>'+
					'<option>Saturday</option>'+
				'</select>'+
			'</div>'+
			'<div class="sidebar-themestitlediv">'+
				'<span class="spanThemes">Themes</span>'+
			'</div>'+
			'<div class="sidebar-listdiv">'+
				'<div class="sidebar-listplaceholder"></div>'+
			'</div>'+
			'<div class="sidebar-lastdiv">'+
				'<button class="common-button sidebar-applybutton">Apply</button>'+
			'</div>'+
		'</div>';

this.containingElement=container.querySelector(".sidebar-container");
	this.listBox= new ListBox(this.themesArray.length,null,this.listRenderer.bind(this));
	this.listOfThemes = container.querySelector(".sidebar-listplaceholder");
	this.applyButton = container.querySelector(".common-button sidebar-applybutton");
	this.listOfThemes.appendChild(this.listBox.getElement());
	this.applyButton.addEventListener("click",this.calender.onSidebarApplyClick.bind(this.calender));


}

SideBar.prototype.listRenderer=function(rowDiv,index)
{
	rowDiv.innerHTML= "<img class='sidebar-image' src='" + this.themesArray[index] + "'/>";
}

SideBar.prototype.getElement=function()
{
	return this.containingElement;
}