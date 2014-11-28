/**
 * Created by Ben on 27/11/2014.
 */

function SideBar ()
{
	this.themesArray=[ "themeImageOfFlowers.png", "themeImageOfFlowers.png"];

	document.body.innerHTML=
		'<div class="sidebar-container">'+
			'<div>'+
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
			'<div>'+
			'<span class="spanThemes">Themes</span>'+
			'</div>'+
			'<div>'+
			'<div class="sidebar-listofthemes"></div>'+
			'</div>'+
		'</div>';


	this.listBox= new ListBox(this.themesArray.length,null,this.listRenderer.bind(this));
	this.listOfThemes = document.body.querySelector(".sidebar-listofthemes");
	this.listOfThemes.appendChild(this.listBox.getElement());

}

SideBar.prototype.listRenderer=function(rowDiv,index)
{
	rowDiv.innerHTML= "<img class='sidebar-image' src='" + this.themesArray[index] + "'/>";
}