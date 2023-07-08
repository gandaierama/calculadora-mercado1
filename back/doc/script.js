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
			    el.setAttribute("placeholder", name);
			    // create option using DOM
					

					if(name=="formato"){
						console.log("formato ieie");

						const newOption2 = d.createElement('option');
						const optionText2 = d.createTextNode('Valor em real (R$)');
						// set option text
						newOption2.appendChild(optionText2);
						// and option value
						newOption2.setAttribute('value',1);
						newOption2.setAttribute('checked',"checked");
						el.appendChild(newOption2);


						const newOption3 = d.createElement('option');
						const optionText3 = d.createTextNode('Valor em porcentagem (%)');
						// set option text
						newOption3.appendChild(optionText3);
						// and option value
						newOption3.setAttribute('value',2);
						el.appendChild(newOption3);
						el.addEventListener('change', campo2);

					}else if(name=="anuncio"){
						console.log("formato ieie");

						const newOption2 = d.createElement('option');
						const optionText2 = d.createTextNode('Normal');
						// set option text
						newOption2.appendChild(optionText2);
						// and option value
						newOption2.setAttribute('value',1);
						el.appendChild(newOption2);


						const newOption3 = d.createElement('option');
						const optionText3 = d.createTextNode('Premium');
						// set option text
						newOption3.appendChild(optionText3);
						// and option value
						newOption3.setAttribute('value',2);
						el.appendChild(newOption3);

					}else{
						const newOption = d.createElement('option');
						const optionText = d.createTextNode('Escolha uma opção');
						// set option text
						newOption.appendChild(optionText);
						// and option value
						newOption.setAttribute('value','');
						el.appendChild(newOption);
					}
			    elemento_pai.appendChild(el);
			    d.getElementById(id).addEventListener('change', campo1);
			}

			 async function getCategories(){

			return await fetch('https://importadoreslucrativos.com/calc', {
			    mode: 'no-cors',
			    method: 'GET'
			  })
         .then(response =>  {
   			const res1= JSON.stringify(response);
   	
            console.log(response);
         });
				

			}

			function setAttributesDom(el, id, className ){
				el.setAttribute("id", id);
			  el.setAttribute("class", className);
			}

			function whiteBox(fase, id, text, type, visi){
				var caixa= "div-"+id;
				createDom("calc", "div", fase, "box", "");
				if(visi==1){
					createDom(fase, "div", caixa, "white-box", "");
				}else{
					createDom(fase, "div", caixa, "white-box hide", "");
				}
				
				createDom(caixa, "label", "", "label-box", text);
				if(type=="text")
					createInTextDom(caixa, "text", "F"+id, "field-text field", "", id, text);
				if(type=="number")
					createInTextDom(caixa, "number", "F"+id, "field-text field", "", id, text);
				if(type=="select")
					createInSelectDom(caixa, "select", "F"+id, "field-text field", "", id, text);
			}

			function blackBox(fase, id, text){
				console.log("black");
				var caixa= "div-"+id;
				createDom("calc", "div", fase, "box", "");
				createDom(fase, "div", caixa, "black-box show", "");
				createDom(caixa, "label", "", "label-box", text);
				createDom(caixa, "div", id, "", "");
				
			}


			async function campo2(e){

				console.log("campo2 go");
			}
			async function campo1(e){
					var alvo = e.target;
					var id = alvo.id;
			

					var elemento = d.getElementById(id);
							var valor = elemento.value;
					//await getCategories();
					object[id]=valor;
					
					var custoCheck=Number(object.Fcusto);
					var categoriaCheck=object.Fcategoria;
					var subCheck=object.Fsubcategoria;
					var nichoCheck=object.Fnicho;
					var freteCheck=object.Ffrete;
					var taxaCheck=object.Ftaxa;
					var impostoCheck=object.Fimposto;
					var formatoCheck=object.Fformato;
					var anuncioCheck=object.Fanuncio;



			// 					let valor1=0; //anuncio+ imposto
			// let valor2=0; // custo + lucro + taxa
			// let valor3=0; // custo + lucro + frete
			// let valor4=0; // (lucro / custo) x 100
			// let valor5=0; // valor2 / ((1 - valor1)/100)
			// let valor6=0; // valor3 / ((1 - valor1)/100)
			// let valor7=0; // custo + (custo * (lucro/100)) -custo


					if(impostoCheck && impostoCheck!=""){
						
						valorImposto = (custoCheck / 100) * impostoCheck;
						console.log("impostoCheck", valorImposto);
						var resposta1 = anuncioCheck + impostoCheck;

						console.log("valor com imposto =", resposta1);
						var texto  = d.createTextNode("Total (Anúncio + Imposto): "+Number(resposta1));
						var el=d.getElementById("resFase2");
			    		el.appendChild(texto);
	
					}
					
					if(categoriaCheck!=""){
						console.log("categoriaCheck");

					}

					if(subCheck!=""){
						console.log("categoriaCheck");
					}

					if(categoriaCheck!=""){
						console.log("categoriaCheck");
					}
					console.log("formatoCheck", formatoCheck);

					if(custoCheck > 0){
						var element = d.getElementById("div-imposto");
 							element.classList.remove("hide");


 						var element = d.getElementById("div-lucro2");
 							element.classList.remove("hide");

 						var element = d.getElementById("div-formato");
 							element.classList.remove("hide");

 						if(formatoCheck!=""){
							
							if(formatoCheck==2){
								var element = d.getElementById("div-lucro");
 								element.classList.remove("hide");
 								element.classList.add("show");

 								var element2 = d.getElementById("div-lucro2");
 								element2.classList.add("hide");
 								element2.classList.remove("show");
							}else{
								var element = d.getElementById("div-lucro2");
 								element.classList.remove("hide");
 								element.classList.add("show");
 								var element2 = d.getElementById("div-lucro");
 								element2.classList.add("hide");
 								element2.classList.remove("show");
							}

						}

						if(custoCheck < 79.99){
							object["taxa"]=5.00;
							object["frete"]=0;
							var element = d.getElementById("div-taxa");
 							element.classList.remove("hide");
 							var element2 = d.getElementById("Ftaxa");
 							element2.value="5.00";
 							element2.setAttribute('disabled', 'disabled' );
 							var element = d.getElementById("div-frete");
 							element.classList.add("hide");
						}else{
							var element = d.getElementById("div-taxa");
 							element.classList.add("hide");
 							element.value="0.00";
 							var element = d.getElementById("div-frete");
 							element.value="0.00";
 							element.classList.remove("hide");
						}
						console.log("Fcusto");
					}
					console.log(object);
			}
			async function goCalc(){
				console.log("docload");
				whiteBox("box5", "categoria", "Categoria de produto", "select", 1);
				whiteBox("box6", "subcategoria", "Sub-Categoria de produto", "select", 0);
				whiteBox("box7", "nicho", "Nicho de produto", "select", 0);
				// blackBox("res0", "resFase0", "Formato anúncio");
				whiteBox("box11", "anuncio", "Formato do anúncio", "select", 1);
				whiteBox("box1", "custo", "Custo do produto (R$)", "number", 1);
				whiteBox("box4", "imposto", "Imposto pago na aquisição da mercadoria (%)", "number", 0);
				blackBox("res2", "resFase2", "Imposto + Anúncio");
				whiteBox("box9", "formato", "Formato do lucro desejado", "select", 0);
				whiteBox("box2", "lucro", "Porcentagem do Lucro Desejado (%)", "number", 0);
				whiteBox("box10", "lucro2", "Valor em Moeda do Lucro Desejado (R$)", "number", 0);
				whiteBox("box3", "taxa", "Taxa Fixa (produto anunciado até R$ 78,99)", "number", 0);
				whiteBox("box8", "frete", "Frete (produto anunciado maior que R$ 78,99)", "number", 0);
				
				blackBox("res1", "resFase1", "Resultado");						
			
			

			}


d.addEventListener("DOMContentLoaded", goCalc());
