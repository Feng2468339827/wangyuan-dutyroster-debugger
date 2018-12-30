/**
 * @author  feng
 * @version 1.0
 * @time 18/12/29
 */

/**
 * [headBackColor 导航栏背景颜色]
 * [headColor 导航栏字体颜色]
 * [buttonBackColor 按钮背景颜色]
 * [buttonColor 按钮字体颜色]
 * @type {String}
 */
var headBackColor;
var headColor;
var buttonBackColor;
var buttonColor;

/**
 * [createFileInput 创建input]
 * @return {[type]} [description]
 */
function createFileInput(){
	var fileInput = this.fileInput;
	if(!fileInput){
		fileInput=document.createElement("input");
		fileInput.type="file";
		fileInput.multiple = true; //多图上传
		fileInput.style.display="none";
		document.querySelector('.debugger').appendChild(fileInput);
		this.fileInput = fileInput;
	}
	fileInput.click();
	fileInput.onchange  = this.onchangeFileInput.bind(this);
}

/**
 * [onchangeFileInput 改变input状态]
 * @return {[alert]} [上传状态]
 */
function onchangeFileInput(){
	var reader = new FileReader(),
		fileInput = this.fileInput;
	reader.readAsDataURL(fileInput.files[0]);
	//获得图片名
	reader.name = fileInput.files[0].name;
	var _this=this;
	reader.onload=function(){
		//正则判断
		let filetype=/^data:image\/\w+;base64,/;
		//判断是图片类型才能上传
		if(filetype.test(this.result)){
			document.querySelector('.view-body-image>img').src=this.result;
			//上传图片的base64
			axios.post('/upload',{
				imgsrc:this.result,
				name:this.name,
				filename:_this.fileName
			},{
				//允许在上传过程中的做一些操作
				// onUploadProgress:function(e){
				// 	console.log(e)
				// 	let diff=e.loaded/e.total
				// 	document.querySelector('.pregress-container>span:first-child').innerHTML=parseInt(diff*100)+'%'
				// 	document.querySelector('.progress').style.width=parseInt(diff*100)+'%';
				// }
			}).then((res)=>{
				console.log(res)
				//保存上次的文件名
				// _this.fileName=res.data
				// document.querySelector('.masklayer').classList.add('hidden');
				// setTimeout(function(){
				// 	if(res.data!=''){
				// 		alert('上传成功！')
				// 		document.querySelector('.pregress-container>span:first-child').innerHTML=0+'%'
				// 		document.querySelector('.progress').style.width=0+'%';
				// 	}
				// },500)
			})
		}
		else{
			alert('请上传图片')
		}
	}
}

/**
 * [run 提交更改]
 * @return {[type]} [description]
 */
function run(){
	headBackColor=document.querySelector('.input-headBackColor').value;
	headColor=document.querySelector('.input-headColor').value;
	buttonBackColor=document.querySelector('.input-buttonBackColor').value;
	buttonColor=document.querySelector('.input-buttonColor').value;
	document.querySelector('.view-head').style.background='#'+headBackColor;
	document.querySelector('.view-head').style.color='#'+headColor;
	document.querySelector('.view-body-button>button').style.background='#'+buttonBackColor;
	document.querySelector('.view-body-button>button').style.color='#'+buttonColor;
	console.log(buttonBackColor)
}

/**
 * [选择select时切换视图大小]
 */
document.querySelector('#selecttype').addEventListener('change',function(e){
	var selectValue=this.options[this.options.selectedIndex].value
	if(selectValue=='iphone5') changeview(320,568)
	if(selectValue=='iphone6') changeview(375,667)
	if(selectValue=='iphoneX') changeview(375,812)
})

/**
 * [changeview 改变视图的大小]
 * @param  {[Number]} wid [view宽度]
 * @param  {[Number]} hei [view高度]
 * @return {[type]}     [description]
 */
function changeview(wid,hei){
	document.querySelector('.view-container').style.width=wid+'px';
	document.querySelector('.view-container').style.height=hei+'px';
}

function pickColor(){
	$('.selectColor').fadeToggle(250)
}