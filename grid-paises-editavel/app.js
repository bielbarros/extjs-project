// tela 1 - Cadastro de País
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
                allowBlank: false,
                blankText: 'Nome é obrigatório'
            },{
                fieldLabel: 'Sigla',
                name: 'sigla',
                allowBlank: false,
                blankText: 'Sigla é obrigatória'
            },
                         {
                 fieldLabel: 'Código BACEN',
                 name: 'codigoBacen',
                 xtype: 'textfield',
                 allowBlank: false,
                 blankText: 'Código BACEN é obrigatório',
                 maxLength: 3,
                 minLength: 3,
                 regex: /^\d{3}$/,
                 regexText: 'Código BACEN deve ter exatamente 3 dígitos'
             },
            {
                fieldLabel: 'Ativo',
                name: 'ativo',
                xtype: 'checkbox',
                checked: true
            }
        ],

        buttons: [{
            text: 'Salvar',
            handler: function() {
                var form = simple.getForm();
                if (form.isValid()) {
                    var values = form.getValues();
                    var dadosEnviados = {
                        nome: values.nome,
                        sigla: values.sigla,
                        codigoBacen: values.codigoBacen ? values.codigoBacen.toString() : '',
                        ativo: (values.ativo === 'on' || values.ativo === true) ? 'Sim' : 'Não'
                    };
                    
                    console.log('Dados sendo enviados (Tela 1):', dadosEnviados);
                    
                    Ext.Ajax.request({
                        url: 'http://localhost:5111/api/paises',
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        jsonData: dadosEnviados,
                        success: function(response) {
                            form.reset();
                            Ext.Msg.alert('Sucesso', 'País criado com sucesso!');
                        },
                        failure: function(response) {
                            var error = Ext.decode(response.responseText);
                            Ext.Msg.alert('Erro', error || 'Erro ao criar país');
                        }
                    });
                }
            }
        },{
            text: 'Cancelar',
            handler: function() {
                simple.getForm().reset();
            }
        }]
    });

    simple.render(document.body);

});




// tela 2 - Cadastro de UF

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

        items: [             {
                 fieldLabel: 'País',
                 name: 'pais',
                 allowBlank: false,
                 blankText: 'País é obrigatório',
                 xtype: 'combo',
                 store: new Ext.data.ArrayStore({
                     fields: ['id', 'nome', 'sigla', 'codigoBacen', 'ativo'],
                     data: []
                 }),
                 displayField: 'nome',
                 valueField: 'id',
                 editable: false,
                 mode: 'local',
                 forceSelection: true,
                 triggerAction: 'all',
                 listWidth: 250,
                 tpl: '<tpl for="."><div class="x-combo-list-item">{nome} ({sigla})</div></tpl>',
                 listeners: {
                     afterrender: function(combo) {
                         console.log('Carregando países para combo...');
                         Ext.Ajax.request({
                             url: 'http://localhost:5111/api/paises',
                             method: 'GET',
                             success: function(response) {
                                 console.log('Resposta da API:', response.responseText);
                                 var data = Ext.decode(response.responseText);
                                 console.log('Dados decodificados:', data);
                                 console.log('Store antes do loadData:', combo.store);
                                 // Limpar store primeiro
                                 combo.store.removeAll();
                                 
                                 // Adicionar registros manualmente
                                 for (var i = 0; i < data.length; i++) {
                                     var record = combo.store.add(new combo.store.recordType(data[i]));
                                 }
                                 
                                 console.log('Store após loadData:', combo.store);
                                 console.log('Número de registros no store:', combo.store.getCount());
                                 console.log('Primeiro registro:', combo.store.getAt(0));
                                 console.log('DisplayField:', combo.displayField);
                                 console.log('ValueField:', combo.valueField);
                                 console.log('Template:', combo.tpl);
                                 // Forçar atualização do combo
                                 combo.clearValue();
                                 combo.doQuery('', true);
                             },
                             failure: function(response) {
                                 console.error('Erro ao carregar países da API:', response);
                                 Ext.Msg.alert('Erro', 'Não foi possível carregar os países da API.');
                             }
                         });
                     }
                 }
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
                 xtype: 'textfield',
                 allowBlank: false,
                 blankText: 'Código IBGE é obrigatório',
                 maxLength: 2,
                 minLength: 2,
                 regex: /^\d{2}$/,
                 regexText: 'Código IBGE deve ter exatamente 2 dígitos'
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
            text: 'Salvar',
            handler: function() {
                var form = simple.getForm();
                if (form.isValid()) {
                    var values = form.getValues();
                    // Mapear região de número para string
                    var regioes = {
                        1: 'Norte',
                        2: 'Nordeste', 
                        3: 'Centro-Oeste',
                        4: 'Sudeste',
                        5: 'Sul'
                    };
                    
                    var dadosEnviados = {
                        paisId: values.pais,
                        nome: values.nome,
                        sigla: values.sigla,
                        codigoIbge: values.codigo_ibge.toString(),
                        regiao: regioes[values.regiao] || values.regiao,
                        capital: values.capital,
                        ativo: (values.ativo === 'on' || values.ativo === true) ? 'Sim' : 'Não'
                    };
                    
                    Ext.Ajax.request({
                        url: 'http://localhost:5111/api/ufs',
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        jsonData: dadosEnviados,
                        success: function(response) {
                            form.reset();
                            Ext.Msg.alert('Sucesso', 'UF criada com sucesso!');
                        },
                        failure: function(response) {
                            var error = Ext.decode(response.responseText);
                            Ext.Msg.alert('Erro', error || 'Erro ao criar UF');
                        }
                    });
                }
            }
        },{
            text: 'Cancelar',
            handler: function() {
                simple.getForm().reset();
            }
        }]
    });

    simple.render(document.body);

});


// tela 3 - Cadastro de município

Ext.onReady(function() {

    var top = new Ext.FormPanel({
        frame: true,
        title: 'Cadastro de Município',
        bodyStyle: 'padding:5px 5px 0',
        width: 800,
        items: [{
            layout: 'column',
            items: [{
                columnWidth: .5,
                layout: 'form',
                                 items: [{
                     fieldLabel: 'País',
                     name: 'pais',
                     anchor: '95%',
                     allowBlank: false,
                     blankText: 'País é obrigatório',
                     xtype: 'combo',
                     store: new Ext.data.ArrayStore({
                         fields: ['id', 'nome', 'sigla', 'codigoBacen', 'ativo'],
                         data: []
                     }),
                     displayField: 'nome',
                     valueField: 'id',
                     width: 150,
                     editable: false,
                     mode: 'local',
                     forceSelection: true,
                     triggerAction: 'all',
                     listWidth: 250,
                     tpl: '<tpl for="."><div class="x-combo-list-item">{nome} ({sigla})</div></tpl>',
                     listeners: {
                         afterrender: function(combo) {
                             console.log('Carregando países para combo (Município)...');
                             Ext.Ajax.request({
                                 url: 'http://localhost:5111/api/paises',
                                 method: 'GET',
                                 success: function(response) {
                                     console.log('Resposta da API (Município):', response.responseText);
                                     var data = Ext.decode(response.responseText);
                                     console.log('Dados decodificados (Município):', data);
                                                                           // Limpar store primeiro
                                      combo.store.removeAll();
                                      
                                      // Adicionar registros manualmente
                                      for (var i = 0; i < data.length; i++) {
                                          var record = combo.store.add(new combo.store.recordType(data[i]));
                                      }
                                      
                                      console.log('Número de registros no store (Município):', combo.store.getCount());
                                      console.log('Primeiro registro (Município):', combo.store.getAt(0));
                                      console.log('DisplayField (Município):', combo.displayField);
                                      console.log('ValueField (Município):', combo.valueField);
                                      console.log('Template (Município):', combo.tpl);
                                      // Forçar atualização do combo
                                      combo.clearValue();
                                      combo.doQuery('', true);
                                 },
                                 failure: function(response) {
                                     console.error('Erro ao carregar países da API:', response);
                                     Ext.Msg.alert('Erro', 'Não foi possível carregar os países da API.');
                                 }
                             });
                         }
                     }
                 }]
            }, {
                columnWidth: .5,
                layout: 'form',
                items: [{
                    fieldLabel: 'UF',
                    name: 'uf',
                    anchor: '95%',
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
            anchor: '97.5%',
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
                     xtype: 'textfield',
                     allowBlank: false,
                     blankText: 'Código IBGE é obrigatório',
                     maxLength: 7,
                     minLength: 7,
                     regex: /^\d{7}$/,
                     regexText: 'Código IBGE deve ter exatamente 7 dígitos'
                 }]
            }, {
                columnWidth: 0.33,
                layout: 'form',
                                 items: [{
                     fieldLabel: 'Código SIAFI',
                     name: 'codigo_siafi',
                     xtype: 'textfield',
                     maxLength: 4,
                     minLength: 4,
                     regex: /^\d{4}$/,
                     regexText: 'Código SIAFI deve ter exatamente 4 dígitos'
                 }]
            }, {
                columnWidth: 0.33,
                layout: 'form',
                                 items: [{
                     fieldLabel: 'DDD',
                     name: 'ddd',
                     anchor: '96%',
                     xtype: 'textfield',
                     maxLength: 2,
                     minLength: 2,
                     regex: /^\d{2}$/,
                     regexText: 'DDD deve ter exatamente 2 dígitos'
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
                     anchor: '95%',
                     xtype: 'textfield',
                     maxLength: 8,
                     minLength: 8,
                     regex: /^\d{8}$/,
                     regexText: 'CEP deve ter exatamente 8 dígitos'
                 }]
            }, {
                columnWidth: 0.5,
                layout: 'form',
                                 items: [{
                     fieldLabel: 'CEP Final',
                     name: 'cep_final',
                     anchor: '95%',
                     xtype: 'textfield',
                     maxLength: 8,
                     minLength: 8,
                     regex: /^\d{8}$/,
                     regexText: 'CEP deve ter exatamente 8 dígitos'
                 }]
            }]
        },

        {
            fieldLabel: 'Timezone',
            name: 'timezone',
            allowBlank:false,
            anchor: '47.5%',
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
                    anchor: '95%',
                    xtype: 'numberfield',
                }]
            }, {
                columnWidth: 0.5,
                layout: 'form',
                items: [{
                    fieldLabel: 'Longitude',
                    name: 'longitude',
                    anchor: '95%',
                    xtype: 'numberfield',
                }]
            }]
        },

        {
            fieldLabel: 'Observação',
            name: 'observacao',
            xtype: 'textarea',
            width: 653,
            height: 100,
        },

        {
            fieldLabel: 'Ativo',
            name: 'ativo',
            xtype: 'checkbox',
        },
        ],

        buttons: [{
            text: 'Salvar',
            handler: function() {
                var form = top.getForm();
                if (form.isValid()) {
                    var values = form.getValues();
                    // Mapear timezone de número para string
                    var timezones = {
                        1: 'America/Sao_Paulo',
                        2: 'America/New_York',
                        3: 'America/Los_Angeles',
                        4: 'America/Chicago',
                        5: 'America/Denver',
                        6: 'America/Phoenix',
                        7: 'America/Houston'
                    };
                    
                    var dadosEnviados = {
                        paisId: values.pais,
                        ufId: values.uf,
                        nome: values.nome,
                        codigoIbge: values.codigo_ibge.toString(),
                        codigoSiafi: values.codigo_siafi,
                        ddd: values.ddd,
                        cepInicial: values.cep_inicial,
                        cepFinal: values.cep_final,
                        timezone: timezones[values.timezone] || values.timezone,
                        latitude: values.latitude,
                        longitude: values.longitude,
                        observacao: values.observacao,
                        ativo: (values.ativo === 'on' || values.ativo === true) ? 'Sim' : 'Não'
                    };
                    
                    Ext.Ajax.request({
                        url: 'http://localhost:5111/api/municipios',
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        jsonData: dadosEnviados,
                        success: function(response) {
                            form.reset();
                            Ext.Msg.alert('Sucesso', 'Município criado com sucesso!');
                        },
                        failure: function(response) {
                            var error = Ext.decode(response.responseText);
                            Ext.Msg.alert('Erro', error || 'Erro ao criar município');
                        }
                    });
                }
            }
        }, {
            text: 'Cancelar',
            handler: function() {
                top.getForm().reset();
            }
        }]
    });

    top.render(document.body);
});



// tela 4 - Cadastro de pessoa

Ext.onReady(function () {
    Ext.QuickTips.init();

    var form = new Ext.form.FormPanel({
        renderTo: Ext.getBody(),
        title: 'Cadastro de Pessoa',
        frame: true,
        width: 1000,
        labelWidth: 110,
        bodyStyle: 'padding:8px',
        

        items: [
            
            {
                xtype: 'fieldset',
                title: 'Pessoa',
                defaults: { border: false }
            ,
                items: [
                    
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .50, items: [{ xtype: 'textfield', fieldLabel: 'Primeiro nome', name: 'primeiroNome', anchor: '90%' }]},
                            { columnWidth: .50, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Sobrenome', name: 'sobrenome', anchor: '97.5%' }]}
                        ]
                    },
                    
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .28, items: [{ xtype: 'datefield', fieldLabel: 'Data nascimento', format: 'd/m/Y', name: 'dataNascimento', anchor: '85%' }]},
                            { columnWidth: .22, items: [{
                                xtype: 'combo', fieldLabel: 'Sexo', name: 'sexo',
                                mode: 'local', triggerAction: 'all', editable: false,
                                store: ['Masculino','Feminino'], anchor: '80%'
                            }]},
                            { columnWidth: .50, style: '', items: [{
                                xtype: 'combo', fieldLabel: 'Estado civil', name: 'estadoCivil',
                                mode: 'local', triggerAction: 'all', editable: false,
                                store: ['Solteiro','Casado','Divorciado','Viúvo'], anchor: '98%'
                            }]}
                        ]
                    },
                    
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .28, items: [{ xtype: 'textfield', fieldLabel: 'CPF', name: 'cpf', anchor: '85%' }]},
                            { columnWidth: .28, items: [{ xtype: 'textfield', fieldLabel: 'RG', name: 'rg', anchor: '85%' }]},
                            { columnWidth: .44, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Nacionalidade', name: 'nacionalidade', anchor: '98%' }]}
                        ]
                    },
                    
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .50, items: [{ xtype: 'textfield', fieldLabel: 'Email', vtype: 'email', name: 'email', anchor: '98%' }]},
                            { columnWidth: .25, items: [{ xtype: 'textfield', fieldLabel: 'Telefone', name: 'telefone', anchor: '90%' }]},
                            { columnWidth: .25, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Celular', name: 'celular', anchor: '95.5%' }]}
                        ]
                    }
                ]
            },

            
            {
                xtype: 'fieldset',
                title: 'Endereço',
                defaults: { border: false },
                items: [
                    
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                                                         { columnWidth: .30, items: [{
                                 xtype: 'combo', fieldLabel: 'País', name: 'pais',
                                 mode: 'local', triggerAction: 'all', editable: false,
                                 store: new Ext.data.ArrayStore({
                                     fields: ['id', 'nome', 'sigla', 'codigoBacen', 'ativo'],
                                     data: []
                                 }),
                                 displayField: 'nome',
                                 valueField: 'id',
                                 listWidth: 200,
                                 tpl: '<tpl for="."><div class="x-combo-list-item">{nome} ({sigla})</div></tpl>',
                                 anchor: '90%',
                                 listeners: {
                                     afterrender: function(combo) {
                                         console.log('Carregando países para combo (Pessoa)...');
                                         Ext.Ajax.request({
                                             url: 'http://localhost:5111/api/paises',
                                             method: 'GET',
                                             success: function(response) {
                                                 console.log('Resposta da API (Pessoa):', response.responseText);
                                                 var data = Ext.decode(response.responseText);
                                                 console.log('Dados decodificados (Pessoa):', data);
                                                                                                   // Limpar store primeiro
                                                  combo.store.removeAll();
                                                  
                                                  // Adicionar registros manualmente
                                                  for (var i = 0; i < data.length; i++) {
                                                      var record = combo.store.add(new combo.store.recordType(data[i]));
                                                  }
                                                  
                                                  console.log('Número de registros no store (Pessoa):', combo.store.getCount());
                                                  console.log('Primeiro registro (Pessoa):', combo.store.getAt(0));
                                                  console.log('DisplayField (Pessoa):', combo.displayField);
                                                  console.log('ValueField (Pessoa):', combo.valueField);
                                                  console.log('Template (Pessoa):', combo.tpl);
                                                  // Forçar atualização do combo
                                                  combo.clearValue();
                                                  combo.doQuery('', true);
                                             },
                                             failure: function(response) {
                                                 console.error('Erro ao carregar países da API:', response);
                                                 Ext.Msg.alert('Erro', 'Não foi possível carregar os países da API.');
                                             }
                                         });
                                     }
                                 }
                             }]},
                            { columnWidth: .30, items: [{
                                xtype: 'combo', fieldLabel: 'UF', name: 'uf',
                                mode: 'local', triggerAction: 'all', editable: false,
                                store: ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'], anchor: '90%'
                            }]},
                            { columnWidth: .40, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Município', name: 'municipio', anchor: '95%' }]}
                        ]
                    },
                   
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .30, items: [{ xtype: 'textfield', fieldLabel: 'CEP', name: 'cep', anchor: '95%' }]},
                            { columnWidth: .30, items: [{ xtype: 'textfield', fieldLabel: 'Logradouro', name: 'logradouro', anchor: '95%' }]},
                            { columnWidth: .40, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Número', name: 'numero', anchor: '95%' }]}
                        ]
                    },
                    
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .33, items: [{ xtype: 'textfield', fieldLabel: 'Bairro', name: 'bairro', anchor: '90%' }]},
                            { columnWidth: .33, items: [{ xtype: 'textfield', fieldLabel: 'Complemento', name: 'complemento', anchor: '90%' }]},
                            { columnWidth: .34, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Referência', name: 'referencia', anchor: '93%' }]}
                        ]
                    },
                    
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .50, items: [{ xtype: 'textfield', fieldLabel: 'Latitude', name: 'latitude', anchor: '95%' }]},
                            { columnWidth: .50, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Longitude', name: 'longitude', anchor: '95%' }]}
                        ]
                    }
                ]
            },

            
            {
                layout: 'column',
                border: false,
                items: [
                    { columnWidth: .3, layout: 'form', items: [{ xtype: 'checkbox', fieldLabel: 'Ativo', name: 'ativo', checked: true }]},
                    { columnWidth: .7, border: false }
                ]
            }
        ],

        buttons: [
            { text: 'Salvar', handler: function () {
                var formPanel = form.getForm();
                if (formPanel.isValid()) {
                    var values = formPanel.getValues();
                    
                                         // O país já vem como ID do combo
                     var paisId = values.pais;
                    
                    var ufs = {
                        'AC': 27, 'AL': 15, 'AM': 24, 'AP': 23, 'BA': 13, 'CE': 19, 'DF': 11, 'ES': 4, 'GO': 10, 'MA': 21, 'MG': 3, 'MS': 8, 'MT': 7, 'PA': 22, 'PB': 17, 'PE': 16, 'PI': 20, 'PR': 6, 'RJ': 2, 'RN': 18, 'RO': 26, 'RR': 25, 'RS': 5, 'SC': 9, 'SE': 14, 'SP': 1, 'TO': 12
                    };
                    
                    var dadosEnviados = {
                        primeiroNome: values.primeiroNome,
                        sobrenome: values.sobrenome,
                        nascimento: values.dataNascimento ? new Date(values.dataNascimento).toISOString() : null,
                        sexo: values.sexo,
                        estadoCivil: values.estadoCivil,
                        cpf: values.cpf,
                        rg: values.rg,
                        nacionalidade: values.nacionalidade,
                        email: values.email,
                        telefone: values.telefone,
                        celular: values.celular,
                                                 endPaisId: paisId || null,
                        endUfId: ufs[values.uf] || null,
                        endMunicipio: values.municipio,
                        endCep: values.cep,
                        endLogradouro: values.logradouro,
                        endNumero: values.numero,
                        endBairro: values.bairro,
                        endComplemento: values.complemento,
                        endReferencia: values.referencia,
                        endLatitude: values.latitude,
                        endLongitude: values.longitude,
                        ativo: (values.ativo === 'on' || values.ativo === true) ? 'Sim' : 'Não'
                    };
                    
                    Ext.Ajax.request({
                        url: 'http://localhost:5111/api/pessoas',
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        jsonData: dadosEnviados,
                        success: function(response) {
                            formPanel.reset();
                            Ext.Msg.alert('Sucesso', 'Pessoa cadastrada com sucesso!');
                        },
                        failure: function(response) {
                            var error = Ext.decode(response.responseText);
                            Ext.Msg.alert('Erro', error || 'Erro ao cadastrar pessoa');
                        }
                    });
                }
            }},
            { text: 'Cancelar', handler: function () { form.getForm().reset(); } }
        ]
    });
});




























Ext.onReady(function(){
    var statusElement = document.getElementById('status');
    // Store para a grid - Conectado com API C#
         var store = new Ext.data.JsonStore({
         url: 'http://localhost:5111/api/paises',
         root: '',
         fields: ['id', 'nome', 'sigla', 'codigoBacen', 'ativo'],
         autoLoad: true,
        listeners: {
            load: function(store, records, options) {
                console.log('Dados carregados da API:', records.length, 'registros');
            },
            loadexception: function(store, options, response, e) {
                console.error('Erro ao carregar dados da API:', e);
                Ext.Msg.alert('Erro', 'Não foi possível carregar os dados da API. Verifique se a API está rodando.');
            }
        }
    });

    // Campo de busca
    var campoBusca = new Ext.form.TextField({
        fieldLabel: 'Descrição',
        name: 'descricao',
        width: 250,
        padding: '5px',
        enableKeyEvents: true,
        listeners: {
            'keyup': function(field, event) {
                var valor = field.getValue().toLowerCase();
                store.clearFilter();
                
                                 if (valor.length > 0) {
                     store.filterBy(function(record) {
                         var nome = record.get('nome').toLowerCase();
                         var sigla = record.get('sigla').toLowerCase();
                         var codigo = record.get('codigoBacen').toString();
                         
                         return nome.indexOf(valor) !== -1 || 
                                sigla.indexOf(valor) !== -1 || 
                                codigo.indexOf(valor) !== -1;
                     });
                 }
            }
        }
    });

    // Grid simples
    var grid = new Ext.grid.GridPanel({
        store: store,
                 columns: [
             {
                 header: 'Nome',
                 dataIndex: 'nome',
                 width: 200,
                 sortable: true
             },
             {
                 header: 'Sigla',
                 dataIndex: 'sigla',
                 width: 100,
                 sortable: true
             },
             {
                 header: 'Código BACEN',
                 dataIndex: 'codigoBacen',
                 width: 120,
                 sortable: true
             },
             {
                 header: 'Ativo',
                 dataIndex: 'ativo',
                 width: 80,
                 sortable: true,
                 renderer: function(value) {
                     return value === 'Sim' ? 'Sim' : 'Não';
                 }
             }
         ],
        stripeRows: true,
        height: 350,
        width: 502
    });

    // Título principal com aparência de GridPanel
    var titulo = new Ext.Panel({
        title: 'Lista de Países',
        width: 502,
        height: 35,
        frame: false,
        border: true,
        header: true,
        bodyBorder: false,
        bodyStyle: 'display: none;',
        cls: 'x-grid-panel'
    });

    // Toolbar com campo de busca
    var toolbarBusca = new Ext.Toolbar({
        width: 502,
        items: [{
            text: 'Descrição:',
            style: 'margin-right: 5px;'
        }, campoBusca, {
            xtype: 'tbspacer',
            width: 10
        }, {
            text: '🔄 Limpar Filtro',
            handler: function() {
                campoBusca.setValue('');
                store.clearFilter();
            }
        }]
    });



    // Função para criar nova janela com formulário
    function criarJanelaPais() {
        // Criar novo formulário para cada janela
        var novoForm = new Ext.form.FormPanel({
            labelWidth: 100,
            frame: true,
            title: 'Cadastro de País',
            width: 400,
            defaults: {width: 275},
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'Nome',
                name: 'nome',
                allowBlank: false
            }, {
                fieldLabel: 'Sigla',
                name: 'sigla'
            }, {
                fieldLabel: 'Código BACEN',
                name: 'codigoBacen',
                xtype: 'textfield'
            }, {
                fieldLabel: 'Ativo',
                name: 'ativo',
                xtype: 'checkbox',
                checked: true
            }],
            buttons: [{
                text: 'Salvar',
                handler: function() {
                    var form = novoForm.getForm();
                    if (form.isValid()) {
                        var values = form.getValues();
                        var janela = novoForm.ownerCt;
                        
                        if (janela.modo === 'novo') {
                            // Criar novo país via API
                            var dadosEnviados = {
                                nome: values.nome,
                                sigla: values.sigla,
                                codigoBacen: values.codigoBacen.toString(),
                                ativo: (values.ativo === 'on' || values.ativo === true) ? 'Sim' : 'Não'
                            };
                            console.log('Dados sendo enviados (POST):', dadosEnviados);
                            
                            Ext.Ajax.request({
                                url: 'http://localhost:5111/api/paises',
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                jsonData: dadosEnviados,
                                success: function(response) {
                                    var result = Ext.decode(response.responseText);
                                    store.reload();
                                    janela.close();
                                    form.reset();
                                    Ext.Msg.alert('Sucesso', 'País criado com sucesso!');
                                },
                                failure: function(response) {
                                    console.error('Resposta de erro (POST):', response.responseText);
                                    var error = Ext.decode(response.responseText);
                                    Ext.Msg.alert('Erro', error || 'Erro ao criar país');
                                }
                            });
                        } else {
                            // Atualizar país existente via API
                            var record = janela.recordEditando;
                            var dadosEnviados = {
                                nome: values.nome,
                                sigla: values.sigla,
                                codigoBacen: values.codigoBacen.toString(),
                                ativo: (values.ativo === 'on' || values.ativo === true) ? 'Sim' : 'Não'
                            };
                            console.log('Dados sendo enviados (PUT):', dadosEnviados);
                            
                            Ext.Ajax.request({
                                url: 'http://localhost:5111/api/paises/' + record.get('id'),
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                jsonData: dadosEnviados,
                                success: function(response) {
                                    store.reload();
                                    janela.close();
                                    form.reset();
                                    Ext.Msg.alert('Sucesso', 'País atualizado com sucesso!');
                                },
                                failure: function(response) {
                                    console.error('Resposta de erro (PUT):', response.responseText);
                                    var error = Ext.decode(response.responseText);
                                    Ext.Msg.alert('Erro', error || 'Erro ao atualizar país');
                                }
                            });
                        }
                    }
                }
            }, {
                text: 'Cancelar',
                handler: function() {
                    var janela = novoForm.ownerCt;
                    janela.close();
                    novoForm.getForm().reset();
                }
            }]
        });
        
        return new Ext.Window({
            title: 'Cadastro de País',
            width: 450,
            height: 200,
            modal: true,
            layout: 'fit',
            items: novoForm,
            closeAction: 'hide'
        });
    }

    // Toolbar com botões de ação
    var toolbarBotoes = new Ext.Toolbar({
        width: 502,
        items: [{
            text: '➕ Novo',
            handler: function() {
                var janela = criarJanelaPais();
                janela.modo = 'novo';
                janela.setTitle('Novo País');
                janela.show();
            }
        }, {
            xtype: 'tbspacer',
            width: 10
        }, {
            text: '✏️ Editar',
            handler: function() {
                var selection = grid.getSelectionModel().getSelected();
                
                if (!selection) {
                    alert('Selecione um país para editar!');
                    return;
                }
                
                var janela = criarJanelaPais();
                janela.modo = 'editar';
                janela.recordEditando = selection;
                janela.setTitle('Editar País');
                
                                 // Preencher o formulário com os dados selecionados
                 var form = janela.items.get(0).getForm();
                 form.setValues({
                     nome: selection.get('nome'),
                     sigla: selection.get('sigla'),
                     codigoBacen: selection.get('codigoBacen'),
                     ativo: selection.get('ativo') === 'Sim'
                 });
                
                janela.show();
            }
        }, {
            xtype: 'tbspacer',
            width: 10
        }, {
            text: '🗑️ Excluir',
            handler: function() {
                var selection = grid.getSelectionModel().getSelected();
                if (!selection) {
                    alert('Selecione um país para excluir!');
                    return;
                }
                
                                 if (confirm('Tem certeza que deseja excluir o país "' + selection.get('nome') + '"?')) {
                     Ext.Ajax.request({
                         url: 'http://localhost:5111/api/paises/' + selection.get('id'),
                        method: 'DELETE',
                        success: function(response) {
                            store.reload();
                            Ext.Msg.alert('Sucesso', 'País excluído com sucesso!');
                        },
                        failure: function(response) {
                            var error = Ext.decode(response.responseText);
                            Ext.Msg.alert('Erro', error || 'Erro ao excluir país');
                        }
                    });
                }
            }
        }]
    });

    // Renderizar na ordem correta
    titulo.render(Ext.getBody());
    toolbarBusca.render(Ext.getBody());
    toolbarBotoes.render(Ext.getBody());
    grid.render(Ext.getBody());
});