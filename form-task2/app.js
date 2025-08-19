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
        title: 'Cadastro de UF',
        width: 400,
        defaults: {width: 275},
        defaultType: 'textfield',

        items: [{
                fieldLabel: 'País',
                name: 'pais',
                allowBlank:false,
                xtype: 'combo',
                store: new Ext.data.ArrayStore({
                    fields: ['id', 'nome'],
                    data: [
                        [1, 'Brasil'],
                        [2, 'United States'],
                        [3, 'Argentina'],
                        [4, 'Uruguay'],
                        [5, 'Paraguay'],
                        [6, 'Chile'],
                        [7, 'Bolivia'],
                        [8, 'Peru'],
                        [9, 'Colombia'],
                        [10, 'Venezuela'],
                        [11, 'Mexico'],
                        [12, 'Canada'], 
                        [13, 'Portugal'],
                        [14, 'Spain'],
                        [15, 'France'],
                    ]
                }),
                displayField: 'nome',
                valueField: 'id',
                editable: false,
                mode: 'local',
                forceSelection: true,
                triggerAction: 'all',
            },{
                fieldLabel: 'Nome',
                name: 'nome'
            },
            {
                fieldLabel: 'Sigla',
                name: 'sigla'
            },
            {
                fieldLabel: 'Código IBGE',
                name: 'codigo_ibge',
                vtype:'number'
            },
            {
                fieldLabel: 'Região',
                name: 'regiao',
                xtype: 'combo',
                store: new Ext.data.ArrayStore({
                    fields: ['id', 'nome'],
                    data: [
                        [1, 'Norte'],
                        [2, 'Nordeste'],
                        [3, 'Centro-Oeste'],
                        [4, 'Sudeste'],
                        [5, 'Sul'],
                    ]
                }),
                displayField: 'nome',
                valueField: 'id',
                editable: false,
                mode: 'local',
                forceSelection: true,
                triggerAction: 'all',
            },
            {
                fieldLabel: 'Capital',
                name: 'capital'
            },
            {
                fieldLabel: 'Ativo',
                name: 'ativo',
                xtype: 'checkbox'
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