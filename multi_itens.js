/*
* REGRAS:
* - the div to be cloned must have a class named multi-name
* - the div must have a hidden field called multi-name-cont starting with 0
* - the add buton must have a class named multi-name-add
* - the del buton must have a class named multi-name-del
*/

function multi(nome){
	var item      = '.multi-' + nome;
	var addButton = '.multi-' + nome + '-add';
	var delButton = '.multi-' + nome + '-del';
	var contEl    = '.multi-' + nome + '-cont';

	//ao clicar no botão de adicionar
	$(document).on('click', addButton, function(){
		//incrementa-se o cont
		var cont = $(contEl).val();
		cont++;
		$(contEl).val(cont);

		//clona-se a div
		var clone = $(item).first().clone();

		//pra cada input, select e textarea
		clone.find('input, select, textarea').each(function(index, el) {
			//muda-se o id e o nome
			this.name = this.name.replace(this.name.match("[0-9]"), cont);
			this.id = this.id.replace(this.id.match("[0-9]"), cont);

			if($(this).attr('class') == 'mask-phone'){
				var SPMaskBehavior = function (val) {
				  	return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
				},
				spOptions = {
					onKeyPress: function(val, e, field, options) {
						field.mask(SPMaskBehavior.apply({}, arguments), options);
					}
				};

				$(this).unmask();
				$(this).mask(SPMaskBehavior, spOptions);
			}

			//limpa o valor
			this.value = '';
		});

		//coloca-se no parent
		clone.appendTo( $(item).parent() );

		//para não dar submit
		return false;
	});

	$(document).on('click', delButton, function() {
		//verificação que impede a exclusão de quando houve apenas um item
		if($(item).length > 1){
			//decrementa o cont
			var cont = $(contEl).val();
			cont--;
			$(contEl).val(cont--);

			//após o fade, remove o item
			$(this).parent().fadeOut('fast', function(){
				$(this).remove();
			});
		}		

		return false;
	});
}