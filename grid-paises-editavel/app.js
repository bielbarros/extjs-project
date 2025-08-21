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
                    return value ? 'Sim' : 'Não';
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
                                ativo: values.ativo === 'on' || values.ativo === true
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
                                ativo: values.ativo === 'on' || values.ativo === true
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
                    ativo: selection.get('ativo')
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