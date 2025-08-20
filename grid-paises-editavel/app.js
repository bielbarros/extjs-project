Ext.onReady(function(){
    var statusElement = document.getElementById('status');
    // Dados de países
    var myData = [
        ['Brasil', 'BR', 1058],
        ['Argentina', 'AR', 1032],
        ['Uruguay', 'UY', 1032],
        ['Paraguay', 'PY', 124],
        ['Chile', 'CL', 484],
        ['Bolivia', 'BO', 124],
        ['Peru', 'PE', 484],
        ['Colombia', 'CO', 126],
        ['Venezuela', 'VE', 488],
        ['México', 'MX', 484],
        ['Canada', 'CA', 129],
        ['Portugal', 'PT', 14],
        ['Espanha', 'ES', 484],
        ['França', 'FR', 124],
    ];

    // Store para a grid
    var store = new Ext.data.ArrayStore({
        fields: ['nome', 'sigla', 'codigo_bacen']
    });

    // Carregar dados
    store.loadData(myData);

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
                        var codigo = record.get('codigo_bacen').toString();
                        
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
                dataIndex: 'codigo_bacen',
                width: 120,
                sortable: true
            }
        ],
        stripeRows: true,
        height: 350,
        width: 422
    });

    // Título principal com aparência de GridPanel
    var titulo = new Ext.Panel({
        title: 'Lista de Países',
        width: 422,
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
        width: 422,
        items: [{
            text: 'Descrição:',
            style: 'margin-right: 5px;'
        }, campoBusca, {
            xtype: 'tbspacer',
            width: 20
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
                name: 'codigo_bacen',
                xtype: 'numberfield'
            }],
            buttons: [{
                text: 'Salvar',
                handler: function() {
                    var form = novoForm.getForm();
                    if (form.isValid()) {
                        var values = form.getValues();
                        var janela = novoForm.ownerCt;
                        
                        if (janela.modo === 'novo') {
                            // Adicionar novo país
                            store.add(new Ext.data.Record({
                                nome: values.nome,
                                sigla: values.sigla,
                                codigo_bacen: parseInt(values.codigo_bacen)
                            }));
                        } else {
                            // Editar país existente
                            var record = janela.recordEditando;
                            record.set('nome', values.nome);
                            record.set('sigla', values.sigla);
                            record.set('codigo_bacen', parseInt(values.codigo_bacen));
                        }
                        
                        janela.close();
                        form.reset();
                    }
                }
            }, {
                text: 'Cancelar',
                handler: function() {
                    var janela = novoForm.ownerCt;
                    janela.close();
                    form.reset();
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
        width: 422,
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
                    codigo_bacen: selection.get('codigo_bacen')
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
                    store.remove(selection);
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