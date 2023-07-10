const urlCalc="http://importadoreslucrativos.com";
			var object = {Fimposto:0, Fcusto:0, Fanuncio:0};
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

			function createOptionSelectDom(el, text, value, check ){
				const newOption2 = d.createElement('option');
				const optionText2 = d.createTextNode(text);
				// set option text
				newOption2.appendChild(optionText2);
				// and option value
				newOption2.setAttribute('value', value);
				if(check==1) newOption2.setAttribute('checked',"checked");
				el.appendChild(newOption2);
			}

			function createInSelectDom(pai, type, id, className, value, name, place){
			    var elemento_pai = d.getElementById(pai);
			    var el = d.createElement("select");
			    setAttributesDom(el,id, className);
			    el.setAttribute("name", name);
			    el.setAttribute("placeholder", name);
			    // create option using DOM
					if(name=="formato"){
						createOptionSelectDom(el, 'Valor em real (R$)', 1, 1 );
						createOptionSelectDom(el, 'Valor em porcentagem (%)', 2, 0 );
					}else if(name=="anuncio"){
						createOptionSelectDom(el, 'Normal', 1, 1 );
						createOptionSelectDom(el, 'Premium', 2, 0 );
					}else{
						createOptionSelectDom(el, 'Escolha uma opção', '', 0 );
					}
			    elemento_pai.appendChild(el);
			    d.getElementById(id).addEventListener('change', campo1);
			}


			function setAttributesDom(el, id, className ){
				el.setAttribute("id", id);
				el.setAttribute("class", className);
			}

			function whiteBox(fase, id, text, type, visi){
				var caixa= "div-"+id;
				var display="";
				createDom("calc", "div", fase, "box", "");
				if(visi==0) display="hide";
				createDom(fase, "div", caixa, "white-box "+display, "");
				createDom(caixa, "label", "", "label-box", text);
				if(type=="select")
					createInSelectDom(caixa, "select", "F"+id, "field-text field", "", id, text);
				else
					createInTextDom(caixa, type, "F"+id, "field-text field", "", id, text);
			}

			function blackBox(fase, id, text){
				var caixa= "div-"+id;
				createDom("calc", "div", fase, "box", "");
				createDom(fase, "div", caixa, "black-box show", "");
				createDom(caixa, "label", "", "label-box", text);
				createDom(caixa, "div", id, "", "");
			}



			 async function getCategories(){
			 	const url = 'https://importadoreslucrativos.com/calc';



			 	try {
				  const response = await fetch(url, {
				    keepalive: true,
				    mode: 'no-cors',
				    method: 'GET'
					});
				  	console.log("Response",response);
				} catch(err) {
				  alert(err); // Failed to fetch
				}
				
				// return await fetch('https://importadoreslucrativos.com/calc', {
				//     mode: 'no-cors',
				//     method: 'GET'
				//   })
			   //       .then(response =>  {
			   // 			const res1= JSON.stringify(response);	
			   //          console.log(response);
			   //       });
							

			}




			async function campo1(e){
					var alvo = e.target;
					var id = alvo.id;
					var elemento = d.getElementById(id);
					var valor = elemento.value;

					await getCategories();
					object[id]=valor;
					
					var custoCheck=Number(object.Fcusto);
					var categoriaCheck=object.Fcategoria;
					var subCheck=object.Fsubcategoria;
					var nichoCheck=object.Fnicho;
					var freteCheck=Number(object.Ffrete);
					var taxaCheck=Number(object.Ftaxa);
					var impostoCheck=Number(object.Fimposto);
					var formatoCheck=object.Fformato;
					var anuncioCheck=Number(object.Fanuncio);

					if(impostoCheck && impostoCheck!=""){
						valorImposto = (custoCheck / 100) * impostoCheck;
						console.log("impostoCheck", valorImposto);
						var resposta1 = anuncioCheck + impostoCheck;
						var texto  = "Total (Anúncio + Imposto): "+Number(resposta1);
						var el=d.getElementById("resFase2");
			    		el.innerHTML=texto;
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

					if(custoCheck > 0){
						d.getElementById("div-imposto").classList.remove("hide");
 						d.getElementById("div-lucro2").classList.remove("hide");
 						d.getElementById("div-formato").classList.remove("hide");
 						if(formatoCheck!=""){
							if(formatoCheck==2){
 								d.getElementById("div-lucro").classList.remove("hide");
 								d.getElementById("div-lucro2").classList.add("hide");
							}else{
								d.getElementById("div-lucro2").classList.remove("hide");
 								d.getElementById("div-lucro").classList.add("hide");
							}
						}

						if(custoCheck < 79.99){
							object["taxa"]=5.00;
							object["frete"]=0;
							d.getElementById("div-taxa").classList.remove("hide");
 							d.getElementById("Ftaxa").value="5.00";
 							d.getElementById("Ftaxa").setAttribute('disabled', 'disabled' );
 							d.getElementById("div-frete").value="0.00";
 							d.getElementById("div-frete").classList.add("hide");
						}else{
							d.getElementById("div-taxa").classList.add("hide");
 							d.getElementById("Ftaxa").value="0.00";
 							d.getElementById("Ftaxa").classList.remove("hide");
						}
					}

					console.log(object);
			}


			// let valor1=0; //anuncio+ imposto
			// let valor2=0; // custo + lucro + taxa
			// let valor3=0; // custo + lucro + frete
			// let valor4=0; // (lucro / custo) x 100
			// let valor5=0; // valor2 / ((1 - valor1)/100)
			// let valor6=0; // valor3 / ((1 - valor1)/100)
			// let valor7=0; // custo + (custo * (lucro/100)) -custo





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
