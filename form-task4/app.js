Ext.onReady(function () {
    Ext.QuickTips.init();

    var form = new Ext.form.FormPanel({
        renderTo: Ext.getBody(),
        title: 'Cadastro de Pessoa',
        frame: true,
        width: 1000,
        labelWidth: 110,
        bodyStyle: 'padding:8px',
        // Removido o defaults global para permitir anchors específicos

        items: [
            // ====== PESSOA ====================================================
            {
                xtype: 'fieldset',
                title: 'Pessoa',
                defaults: { border: false }
            ,
                items: [
                    // Linha 1: Primeiro nome | Sobrenome  (2 por linha)
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .50, items: [{ xtype: 'textfield', fieldLabel: 'Primeiro nome', name: 'primeiroNome', anchor: '90%' }]},
                            { columnWidth: .50, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Sobrenome', name: 'sobrenome', anchor: '97.5%' }]}
                        ]
                    },
                    // Linha 2: Data nasc. | Sexo | Estado civil  (3 por linha)
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
                    // Linha 3: CPF | RG | Nacionalidade  (3 por linha)
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .28, items: [{ xtype: 'textfield', fieldLabel: 'CPF', name: 'cpf', anchor: '85%' }]},
                            { columnWidth: .28, items: [{ xtype: 'textfield', fieldLabel: 'RG', name: 'rg', anchor: '85%' }]},
                            { columnWidth: .44, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Nacionalidade', name: 'nacionalidade', anchor: '98%' }]}
                        ]
                    },
                    // Linha 4: Email | Telefone | Celular  (3 por linha, email mais largo)
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

            // ====== ENDEREÇO ==================================================
            {
                xtype: 'fieldset',
                title: 'Endereço',
                defaults: { border: false },
                items: [
                    // Linha 1: País | UF | Município  (3 por linha)
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .30, items: [{
                                xtype: 'combo', fieldLabel: 'País', name: 'pais',
                                mode: 'local', triggerAction: 'all', editable: false,
                                store: ['Brasil','Argentina','EUA'], anchor: '90%'
                            }]},
                            { columnWidth: .30, items: [{
                                xtype: 'combo', fieldLabel: 'UF', name: 'uf',
                                mode: 'local', triggerAction: 'all', editable: false,
                                store: ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'], anchor: '90%'
                            }]},
                            { columnWidth: .40, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Município', name: 'municipio', anchor: '95%' }]}
                        ]
                    },
                    // Linha 2: CEP | Logradouro (largo) | Número  (4 por linha prático)
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .30, items: [{ xtype: 'textfield', fieldLabel: 'CEP', name: 'cep', anchor: '95%' }]},
                            { columnWidth: .30, items: [{ xtype: 'textfield', fieldLabel: 'Logradouro', name: 'logradouro', anchor: '95%' }]},
                            { columnWidth: .40, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Número', name: 'numero', anchor: '95%' }]}
                        ]
                    },
                    // Linha 3: Bairro | Complemento | Referência  (3 por linha)
                    {
                        layout: 'column',
                        defaults: { layout: 'form', border: false, style: 'padding-right:10px' },
                        items: [
                            { columnWidth: .33, items: [{ xtype: 'textfield', fieldLabel: 'Bairro', name: 'bairro', anchor: '90%' }]},
                            { columnWidth: .33, items: [{ xtype: 'textfield', fieldLabel: 'Complemento', name: 'complemento', anchor: '90%' }]},
                            { columnWidth: .34, style: '', items: [{ xtype: 'textfield', fieldLabel: 'Referência', name: 'referencia', anchor: '93%' }]}
                        ]
                    },
                    // Linha 4: Latitude | Longitude  (2 por linha)
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

            // Linha final: Ativo
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
                if (form.getForm().isValid()) {
                    Ext.Msg.alert('Sucesso', 'Cadastro salvo com sucesso!');
                }
            }},
            { text: 'Cancelar', handler: function () { form.getForm().reset(); } }
        ]
    });
});
