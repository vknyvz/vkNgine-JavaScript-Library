/**
 * vkNgine JavaScript Library v1.0.0
 * 
 * Copyright 2008, Volkan Yavuz
 * URL: http://www.vknyvz.com
 * Email: vkn@vknyvz.com
 * 
 * basic structure of this library
 * 
 * ->	function structure:	
 *		{
 *			'variable' : '${variable}',
 *			'mission'  : '',
 *			'process'  : {process}
 *		}
 * <-
 * 
 * 
 */

var vkNgine = {
	
	'selector' : 
	[
		{
			'variable' : '$',
			'mission' : 'shortcut to document.getElementById()',
			'process' : function(id){ return document.getElementById(id); }
		},
		{
			'variable' : '$t',
			'mission' : 'shortcut to document.getElementsByTagname()',
			'process' : function(tag){ return document.getElementsByTagName(tag); }
		},
		{
			'variable' : '$f',
			'mission' : 'to access form elements',
			'process' : function(form,element){ 
				if(element)
					return eval('document.forms["'+form+'"].'+element);
				else
					return eval('document.forms["'+form+'"]');
			}
		},
		{
			'variable' : '$q',
			'mission' : 'to getting query strings from URL',
			'process' : function(variable)
			{
				var reg = new RegExp(variable + "=(.*)");
				var url = document.location.href;
				var parameters = url.split("?")[1];
				var value = reg.exec(url)[1];
					value = value.split("&");
				return value[0];
			}
		},
		{
			'variable' : '$a',
			'mission' : 'document.getElementsByAttribute',
			'process' : function(attribute,value)
			{	
				value = typeof value!='string' ? '' : value
				var elm = document.getElementsByTagName('*');
				var re = new Array();
				
				for (var x=0; x<elm.length ; x++ )
				{
					try
					{
						if(elm[x].getAttribute(attribute) && typeof value!='string')
							re.push(elm[x]);
						else if(typeof value=='string' && elm[x].getAttribute(attribute)==value)
							re.push(elm[x]);
					}
					catch (e)
					{
					}
				}
				return re;
			}
			
		},
		{
			'variable' : '$c',
			'mission' : '',
			'process' : function(input)
			{
				if(input==null)
					return document.cookie.split("; ");
				
				if(input.match('='))
					document.cookie = input;
				else 
				{
					var cookies = document.cookie.split(";");
				
					for(x in cookies)
					{
						if(cookies[x].match(input+"="))
						{
							var r = cookies[x].split(input+"=");
							return r[1];
						 }
					}
				}
			}
		},
		{
			'variable' : '$$n',
			'mission' : '',
			'process' : function()
			{
				var obj = {
				
					msie : navigator.appName == 'Microsoft Internet Explorer',
					netscape : navigator.appName == 'Netscape',
					opera : navigator.appName == 'Opera',
					msie4 : navigator.appName == 'Microsoft Internet Explorer'&&navigator.appVersion=='4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)'
				}
				return obj;
			}
		},
		{
			'variable' : '$n',
			'autorun' : 'true',
			'process' : function()
			{
				window.$n = new $$n();
			}
		}
	],
	
	// 'kit class uses the 'selector' section
	'kit' :
	[
		{
			'variable' : '$null',
			'mission' : 'null function',
			'process' : function(b)
			{ 
				return false;
			}
		},
		{
			'variable' : '$try',
			'mission' : 'to try&choose functions',
			'process' : function(f1,f2)
			{ 
				try
				{
					 this.value = f1();
				}
				catch(e)
				{
					this.value = f2();
				}
				return this.value;

			}
		},
		{
			'variable' : '$$$convert',
			'mission' : 'conversion in data types',
			'process' :function()
			{
				this.toIe = function(input,key)
				{
					if(key==null)
						key  = input;

					var ie = {
						opacity: function(input)
						{
							if(input)
								return 'Alpha('+(100*parseFloat(input))+')';
						},
						hilitecolor: function(input)
						{
							return 'backColor';
						},
						cssFloat: function(input)
						{
							return 'styleFloat';
						},
						cssRule: function(input)
						{
							input = input.split("{");
							input[1] = "{" + input[1];
							return input;
						},
						insertRule: function(input)
						{
							return 'addRule';
						},
						sheet: function()
						{
							return 'styleSheet';
						},
						cssRules: function()
						{
							return 'rules';
						}
					}

					if(eval('ie.'+key) && navigator.appName=='Microsoft Internet Explorer')
						return eval('ie.'+key+'(input)');
					else 
						return input;
				}

				this.toString = function(input){ return String(input); }
				this.toInteger = function(input){ return parseInt(input); }
				this.toFloat = function(input){ return parseFloat(input); }
				this.toPattern = function(input,pattern){  }
			}
		},
		{
			'variable' : '$$convert',
			'mission' : '',
			'autorun' : true,
			'process' : function(){ window.$convert = new $$$convert; }
		},
		{
			'variable' : '$alert_r',
			'mission' : 'print_r for javascript',
			'process' : function(object)
			{
				var str = "";
				for(property in object)
				{
					str += eval("object.property")!=undefined ? "object." + property : "object["+property+"]";
					str += '=';
					str += eval("object.property")!=undefined ? eval("object.property") : eval("object[property]");
					str += '\n';
				}
				alert(str);
			}
		},
		{
			'variable' : '$event',
			'mission' : 'to register/remove an event',
			'process' : function(element,event,process)
			{ 
				this.element = element;
				this.event = event;
				this.process = process;
				
				this.create = function()
				{
					var create = {'element':this.element,'event':this.event,'process':this.process}
					$try(
						function(){ create.element.attachEvent('on'+create.event,create.process); },
						function(){ create.element.addEventListener(create.event,create.process,false); }
					);
				}

				this.kill = function()
				{
					var remove = {'element':this.element,'event':this.event,'process':this.process}
					$try(
						function(){ remove.element.detachEvent('on'+remove.event,remove.process); },
						function(){ remove.element.removeEventListener(remove.event,remove.process,false); }
					);
				}

				this.create();
			}
		},
		{
			'variable' : '$style',
			'mission' : 'to getting/setting element styles',
			'process' : function(element)
			{
					this.element = element;
					this.get = $try(
						function(){ return document.defaultView.getComputedStyle(element, null); },
						function(){ return element.currentStyle }
					);
					
					this.set = function(properties)
					{
						for(property in properties)
						{
							if(property.substring(0,3)!='ie_' && property.substring(0,3)!='ne_')
								eval('this.element.style.'+property+'= properties.'+property);
							else if(property.substring(0,3)=='ie_' && navigator.appName=='Microsoft Internet Explorer')
								eval('this.element.style.'+property.replace(/ie_/,'')+'= properties.'+property);
							else if(property.substring(0,3)=='ne_' && navigator.appName=='Netscape')
								eval('this.element.style.'+property.replace(/ne_/,'')+'= properties.'+property);
						}
					}
			}
		},
		{
			'variable' : '$$style',
			'mission' : 'to getting/setting element styles',
			'process' : function(input)
			{
					var rule = $convert.toIe(input,"cssRule");
					var style = null;
					if( document.styleSheets.length>0)
						style = document.styleSheets[0];
					else
					{
						style = document.createElement("style");
						document.body.appendChild(style);
						style = eval('style.'+$convert.toIe("sheet"));
					}
						
					$try(
						function(){ style.addRule(rule[0],rule[1]);  },
						function(){ style.insertRule(rule,style.cssRules.length);  }
					);
			}
		},
		{
			'variable' : '$mouse',
			'mission' : 'to getting mouse coordinates and target',
			'process' : function(event)
			{
				this.x = $try(
						function(){ return event.clientX; },
						function(){ return window.event.clientX }
				);

				this.y = $try(
						function(){ return event.clientY; },
						function(){ return window.event.clientY }
				);

				this.t = $try(
						function(){ return window.event.srcElement; },
						function(){ return event.target; }
				);
				return this;
			}
		},
		{
			'variable' : '$sort',
			'mission' : 'sorts the supplied numeric array in ascending order',
			'process' : function(array)
			{
				this.sn = function sortNumber(a,b){ return a - b }
				return array.sort(this.sn);
			}
		},
		{
			'variable' : '$wysiwyg',
			'mission' : 'to making a rich text editor',
			'process' : function(e)
			{

				var moi = {
					element: e,
					doc: null,
					init: function()
					{
						with(moi)
						{
							doc = $n.msie?element.contentWindow.document:element.contentDocument;
							doc.designMode = 'On';
						}
					},
					command: function(c,v)
					{
						
						v = v==''||v==' '||v==null?null:v.replace("./","");
						c = v==null&&c=='createLink'?'unLink':c
						with(moi)
							doc.execCommand($convert.toIe(c),false,v);
					}
				}
				setTimeout(function(){ moi.init(); },10);
				return moi;
			}
		},
		{
			'variable' : '$timer',
			'mission' : '',
			'process' : function(set,process)
			{
				var obj = {

					enabled: typeof set.enabled=='boolean' ? set.enabled : true,
					interval: typeof set.interval=='number' ? set.interval : 1000,
					loop : typeof set.loop=='number' ? set.loop : -1,
					onComplete: typeof set.onComplete=='function' ? set.onComplete : null,
					counter: -1,
					process: process,
					engine: null,
					kill: function(){ clearInterval(obj.engine);  },
					run: function()
					{
						if(obj.enabled==true)
						{
						if((obj.loop != obj.counter || obj.loop==-1))
							obj.process();
						if(obj.loop == obj.counter+1)
						{
							if(obj.onComplete!=null)obj.onComplete();
							obj.kill();
						}
						obj.counter++;	
						}
					},
					init: function()
					{
						obj.engine = setInterval(function(){ obj.run() },obj.interval);
					}
				}
				obj.init();
				return obj;
			}
		},
		{
			'variable' : '$element',
			'mission' : '',
			'process' : function(type,parent,style,property,events,ih)
			{
				type = typeof type=='string'?type:'div';
				parent = parent!=null?parent:document.body;
				property = typeof property=='object'?property:{};
				style = typeof style=='object'?style:{};
				events = typeof events=='object'?events:{};
				ih = typeof ih=='string'?ih:null;
					
				var obj = {
					
					type: type,
					parent: parent,
					property: property,
					element: null,
					events: null,
					style: null,
					init: function()
					{
						if(type.substring(0,5)=='text:')
							obj.element = document.createTextNode(type.substring(5));
						else
						{
							obj.element = document.createElement(type);
							obj.style = new $style(obj.element);
							obj.style.set(style);

							for(x in property)
								eval('obj.element.setAttribute("'+x+'","'+property[x]+'")');

							if(typeof ih=='string')
								obj.element.innerHTML = ih;
						
						}
						parent.appendChild(obj.element);
							for(x in events)
								eval('obj.element.on'+x+'='+events[x]);

						
						
					},
					kill:function()
					{
						parent.removeChild(obj.element);
					}
					
				}
				obj.init();
				return obj;
			}
		}
	],
	// 'ajax' class uses 'kit' and 'selector' sections
	'ajax' : 
	[

		{
			'variable' : '$ajax',
			'mission' : 'to create an ajax request',
			'process' : function(object)
			{
				var addurl = '';
				if(object.parameters)
				{
					addurl = '?' + object.parameters;
					p = object.parameters;
				}
				u = object.url + addurl;
				m = object.method;
				c = object.onComplete;
				oe = object.onError;
				if(oe==undefined)oe = $null
	
				var abort = false;
				
				request = $try(
					function(){ return new ActiveXObject("Microsoft.XMLHTTP"); },
					function(){ return new XMLHttpRequest();}
				);

				request.onreadystatechange = function()
				{
					if(request.readyState==4 && !abort)
					{
						try {

							if(request.status==200)
								c(request);
							else
								oe('Error Report: abort['+abort+']status[' + request.status + '] readyState['+request.readyState+']')
						} catch(e) {
							oe('Abort');
						}
					}
				}

				this.call = function(){
				request.open(m,u,true);
					
					if(m=='post' || m=='POST')
					{
						request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
						request.send(p);
					}
					else
						request.send(null);
				}

				this.abort = function(){
					request.abort();
					abort = false;
				}
					
			}
		},
		{
			'variable' : '$include',
			'mission' : '',
			'process' : function(url)
			{
				
				if(typeof url == 'string')
				{
					var elm = new $element('script',document.body,null,{ src:url });
				}
			}
		}
	],
	'fx' : 
	[
		{
			'variable' : '$manipulation',
			'mission' : '',
			'process' : function(set)
			{
				var obj = {
					element: set.element,
					style : null,
					start : { width:null, height:null, top:null, left:null, opacity:null, fontSize:null },
					end : { width:null, height:null, top:null, left:null, opacity:{ value:null, step:null }, fontSize: null },
					step : null,
					timer : {  },
					interval: null,
					onComplete: null,
					init: function()
					{
						with(obj) {
							style = new $style(element);
							element.style.opacity = typeof style.get.opacity=='string'||typeof style.get.opacity=='number' ? style.get.opacity : 1;
							step = typeof set.step == 'number' ? set.step : 1;
							interval = typeof set.interval == 'number' ? set.interval : 20;
							onComplete= typeof set.onComplete=='function' ? set.onComplete : null;
			

							with(start) {
								width = parseInt(style.get.width);
								height = parseInt(style.get.height);
								top = typeof style.get.top == 'number' ? parseInt(style.get.top) : 0;
								left = typeof style.get.left == 'number' ? parseInt(style.get.left) : 0;
								opacity = parseInt(style.get.opacity)*100;
								fontSize = parseInt(style.get.fontSize);
							}
	
							with(end)
							{
								width = typeof set.width=='number' ? set.width : null;
								height = typeof set.height=='number' ? set.height : null;
								top = typeof set.top=='number' ? set.top : null;
								left = typeof set.left=='number' ? set.left : null;
								fontSize = typeof set.fontSize=='number' ? set.fontSize : null;
								if(typeof set.opacity=='object')
								{
									opacity.value = typeof set.opacity[0]=='number' ? set.opacity[0]*100 : null;
									opacity.step = typeof set.opacity[1]=='number' ? set.opacity[1]*100 : 1;
								}
							}
					
							if(end.width!=null && start.width!=end.width)
								manipulate.size('width','Left','Right');
							if(end.height!=null && start.height!=end.height)
								manipulate.size('height','top','bottom');
							if(end.opacity.value!=null && start.opacity!=end.opacity.value)
								manipulate.opacity();
							if(end.top!=null && start.top!=end.top)
								manipulate.margin('top');
							if(end.left!=null && start.left!=end.left)
								manipulate.margin('left');
							if(end.fontSize!=null && start.fontSize!=end.fontSize)
								manipulate.fontSize();
						}

					},
					manipulate : {
						
						size: function(t,p0,p1)
						{
							var cmd = '';
								cmd+="var ddn = $n.opera?parseInt(style.get.padding"+p0+")+parseInt(style.get.padding"+p1+"):0; ";
								cmd+="var proc = start."+t+">end."+t+" ? '-'+(step+ddn) : '+'+(step-ddn); ";
								cmd+="var loop = Math.abs((parseInt((start."+t+"-end."+t+"-ddn)/step) + ((start."+t+"-end."+t+") % step)))-1; ";
								cmd+="timer."+t+" = new $timer({ interval:interval,loop:loop, onComplete:onComplete  },function(){  eval('style.set({ "+t+":parseInt(style.get."+t+")'+proc+' })') });";

							with(obj)
							{
								eval(cmd);
							}
						},
						opacity: function(){
							with (obj) {
								var proc = start.opacity>end.opacity.value ? '-'+(end.opacity.step) : '+'+(end.opacity.step);
								var loop = (parseInt(Math.abs(start.opacity-end.opacity.value)/end.opacity.step))-1; 
								timer.opacity = new $timer({ interval:interval, loop:loop, onComplete:onComplete },function(){ eval('var val = ((style.get.opacity*100)'+proc+')/100;'); eval('style.set({ opacity:'+val+', filter:"Alpha(Opacity='+val*100+')" })');  });
							}
						},
						margin: function(t)
						{
						
							var cmd = '';			
								cmd+="var proc = start."+t.toLowerCase()+">end."+t.toLowerCase()+" ? '-'+(step) : '+'+(step);";
								cmd+="var loop = Math.abs((parseInt((start."+t.toLowerCase()+"-end."+t.toLowerCase()+")/step) + ((start."+t.toLowerCase()+"-end."+t.toLowerCase()+") % step)))-1; ";
								cmd+="timer."+t+" = new $timer({ interval:interval,loop:loop, onComplete:onComplete },function(){  var d = style.get."+t+" == 'auto' ? 0 : parseInt(style.get."+t+"); eval('style.set({ "+t+":d'+proc+' })') });";
							with(obj) {
								eval(cmd);
							}
						},
						fontSize: function()
						{
							with(obj)
							{
								var proc = start.fontSize>end.fontSize ? '-1' : '+1';
								var loop = Math.abs(start.fontSize-end.fontSize)-1;
								timer.fontSize = new $timer({ interval:interval,loop:loop },function(){ eval('style.set({ fontSize:parseInt(style.get.fontSize)'+proc+' })'); });
							}
						}
					}
			
				}
				obj.init();
				return obj;
			}
		}
	]
}

for(x in vkNgine)
{
	var obj = eval('vkNgine.'+x);
	for(i in obj)
	{
		eval('window.' + obj[i].variable + '=' + eval(obj[i].process));
		if(obj[i].autorun)
			eval(obj[i].variable+'()');
	}
}
