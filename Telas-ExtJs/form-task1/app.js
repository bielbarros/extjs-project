/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function(){

    Ext.QuickTips.init();

    Ext.form.Field.prototype.msgTarget = 'side';


    var simple = new Ext.FormPanel({
        labelWidth: 100,
        url:'save-form.php',
        frame:true,
        title: 'Cadastro de País',
        width: 400,
        defaults: {width: 275},
        defaultType: 'textfield',

        items: [{
                fieldLabel: 'Nome',
                name: 'nome',
                allowBlank:false
            },{
                fieldLabel: 'Sigla',
                name: 'sigla'
            },
            {
                fieldLabel: 'Código BACEN',
                name: 'codigo_bacen',
                vtype:'number'
            }
        ],

        buttons: [{
            text: 'Salvar'
        },{
            text: 'Cancelar'
        }]
    });

    simple.render(document.body);

});