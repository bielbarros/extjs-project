Ext.onReady(function() {

    var top = new Ext.FormPanel({
        frame: true,
        title: 'Cadastro de Município',
        bodyStyle: 'padding:5px 5px 0',
        width: 1100,
        items: [{
            layout: 'column',
            items: [{
                columnWidth: .5,
                layout: 'form',
                items: [{
                    fieldLabel: 'País',
                    name: 'pais',
                    anchor: '95%',
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
                }]
            }, {
                columnWidth: .5,
                layout: 'form',
                items: [{
                    fieldLabel: 'UF',
                    name: 'uf',
                    allowBlank: false,
                    xtype: 'combo',
                    width: 300,
                    store: new Ext.data.ArrayStore({
                        fields: ['id', 'nome'],
                        data: [
                            [1, 'SP'],
                            [2, 'RJ'],
                            [3, 'MG'],
                            [4, 'ES'],
                            [5, 'RS'],
                            [6, 'PR'],
                            [7, 'MT'],
                            [8, 'MS'],
                            [9, 'SC'],
                            [10, 'GO'],
                            [11, 'DF'],
                            [12, 'TO'],
                            [13, 'BA'],
                            [14, 'SE'],
                            [15, 'AL'],
                            [16, 'PE'],
                            [17, 'PB'],
                            [18, 'RN'],
                            [19, 'CE'],
                            [20, 'PI'],
                            [21, 'MA'],
                            [22, 'PA'],
                            [23, 'AP'],
                            [24, 'AM'],
                            [25, 'RR'],
                            [26, 'RO'],
                            [27, 'AC']
                        ]
                    }),
                    displayField: 'nome',
                    valueField: 'id',
                    editable: false,
                    mode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                }]
            }]
        }, {
            fieldLabel: 'Nome',
            name: 'nome',
            anchor: '100%',
            xtype: 'textfield',
        },
        {
            layout: 'column',
            items: [{
                columnWidth: 0.33,
                layout: 'form',
                items: [{
                    fieldLabel: 'Código IBGE',
                    name: 'codigo_ibge',
                    xtype: 'numberfield',
                }]
            }, {
                columnWidth: 0.33,
                layout: 'form',
                items: [{
                    fieldLabel: 'Código SIAFI',
                    name: 'codigo_siafi',
                    xtype: 'numberfield',
                }]
            }, {
                columnWidth: 0.33,
                layout: 'form',
                items: [{
                    fieldLabel: 'DDD',
                    name: 'ddd',
                    anchor: '95%',
                    xtype: 'numberfield',
                }]
            }, {
            }]
        },

        {
            layout: 'column',
            items: [{
                columnWidth: 0.5,
                layout: 'form',
                items: [{
                    fieldLabel: 'CEP Inicial',
                    name: 'cep_inicial',
                    xtype: 'numberfield',
                }]
            }, {
                columnWidth: 0.5,
                layout: 'form',
                items: [{
                    fieldLabel: 'CEP Final',
                    name: 'cep_final',
                    xtype: 'numberfield',
                }]
            }]
        },

        {
            fieldLabel: 'Timezone',
            name: 'timezone',
            allowBlank:false,
            xtype: 'combo',
            store: new Ext.data.ArrayStore({
                fields: ['id', 'nome'],
                data: [
                    [1, 'America/Sao_Paulo'],
                    [2, 'America/New_York'],
                    [3, 'America/Los_Angeles'],
                    [4, 'America/Chicago'],
                    [5, 'America/Denver'],
                    [6, 'America/Phoenix'],
                    [7, 'America/Houston'],
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
            layout: 'column',
            items: [{
                columnWidth: 0.5,
                layout: 'form',
                items: [{
                    fieldLabel: 'Latitude',
                    name: 'latitude',
                    xtype: 'numberfield',
                }]
            }, {
                columnWidth: 0.5,
                layout: 'form',
                items: [{
                    fieldLabel: 'Longitude',
                    name: 'longitude',
                    xtype: 'numberfield',
                }]
            }]
        },

        {
            fieldLabel: 'Observação',
            name: 'observacao',
            xtype: 'textarea',
            width: 700,
            height: 100,
        },

        {
            fieldLabel: 'Ativo',
            name: 'ativo',
            xtype: 'checkbox',
        },
        ],

        buttons: [{
            text: 'Save'
        }, {
            text: 'Cancel'
        }]
    });

    top.render(document.body);
});
