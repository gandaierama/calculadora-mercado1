const urlCalc="http://importadoreslucrativos.com";
			var object = {};
			const d=document;
			function createDom(pai, type, id, className, content){
			    var elemento_pai = d.getElementById(pai);
			    var el = d.createElement(type);
			    setAttributesDom(el,id, className);
			    if(type=="label"){
			    	var texto  = d.createTextNode(content);
			    	el.appendChild(texto);
			    }
			    elemento_pai.appendChild(el);
			}

			function createInTextDom(pai, type, id, className, value, name, place){
			    var elemento_pai = d.getElementById(pai);
			    var el = d.createElement("input");
			    setAttributesDom(el,id, className);
			    el.setAttribute("name", name);
			    el.setAttribute("value", value);
			    el.setAttribute("type", type);
			    el.setAttribute("placeholder", place);
			    elemento_pai.appendChild(el);
			    d.getElementById(id).addEventListener('change', campo1);

			}

			function createInSelectDom(pai, type, id, className, value, name, place){
			    var elemento_pai = d.getElementById(pai);
			    var el = d.createElement("select");
			    setAttributesDom(el,id, className);
			    el.setAttribute("name", name);
			    el.setAttribute("placeholder", place);
			    // create option using DOM
					const newOption = document.createElement('option');
					const optionText = document.createTextNode('Escolha uma opção');
					// set option text
					newOption.appendChild(optionText);
					// and option value
					newOption.setAttribute('value','');
					el.appendChild(newOption);
			    elemento_pai.appendChild(el);
			    d.getElementById(id).addEventListener('change', campo1);
			}

			 async function getCategories(){

			return await fetch('http://importadoreslucrativos.com/calc', {
			    mode: 'no-cors',
			    method: 'GET'
			  })
         .then(response =>  {
   
            console.log(response);
         });
				

			}

			function setAttributesDom(el, id, className ){
				el.setAttribute("id", id);
			  el.setAttribute("class", className);
			}

			function whiteBox(fase, id, text, type){
				var caixa= "div-"+id;
				createDom("calc", "div", fase, "box", "");
				createDom(fase, "div", caixa, "white-box", "");
				createDom(caixa, "label", "", "label-box", text);
				if(type=="text")
					createInTextDom(caixa, "text", "F"+id, "field-text field", "", id, text);
				if(type=="number")
					createInTextDom(caixa, "number", "F"+id, "field-text field", "", id, text);
				if(type=="select")
					createInSelectDom(caixa, "select", "F"+id, "field-text field", "", id, text);
			}

			function blackBox(fase, id, text){
				var caixa= "div-"+id;
				createDom("calc", "div", fase, "box", "");
				createDom(fase, "div", caixa, "white-box", "");
				createDom(caixa, "label", "", "label-box", text);
				
			}



			async function campo1(e){
					var alvo = e.target;
					var id = alvo.id;
			

					var elemento = document.getElementById(id);
							var valor = elemento.value;
					//await getCategories();
					object[id]=valor;
					
					var custoCheck=Number(object.Fcusto);

					if(custoCheck > 0){
						if(custoCheck < 79.99){
							object["taxa"]=5.00;
							object["frete"]=0;
						}else{

						}
						console.log("Fcusto");
					}
					console.log(object);
			}
			async function goCalc(){
				console.log("docload");
				whiteBox("box5", "categoria", "Categoria de produto", "select");
				whiteBox("box6", "subcategoria", "Sub-Categoria de produto", "select");
				whiteBox("box7", "nicho", "Nicho de produto", "select");

				whiteBox("box1", "custo", "Custo do produto (R$)", "number");
				whiteBox("box4", "imposto", "Imposto pago na aquisição da mercadoria", "number");
				whiteBox("box2", "lucro", "Porcentagem do Lucro Desejado (%)", "number");
				whiteBox("box3", "taxa", "Taxa Fixa (produto anunciado até R$ 78,99)", "number");
				whiteBox("res1", "resFase1", "Resultado");						
			
			

			}


document.addEventListener("DOMContentLoaded", goCalc());
