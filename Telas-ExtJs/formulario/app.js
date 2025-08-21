Ext.onReady(function () {
    // Configuração do tema
    Ext.QuickTips.init();
    
    // Dados de exemplo para o grid
    var dadosExemplo = [
        {id: 1, nome: 'João Silva', email: 'joao@email.com', idade: 25, cidade: 'São Paulo'},
        {id: 2, nome: 'Maria Santos', email: 'maria@email.com', idade: 30, cidade: 'Rio de Janeiro'},
        {id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', idade: 28, cidade: 'Belo Horizonte'},
        {id: 4, nome: 'Ana Oliveira', email: 'ana@email.com', idade: 32, cidade: 'Salvador'},
        {id: 5, nome: 'Carlos Lima', email: 'carlos@email.com', idade: 27, cidade: 'Brasília'}
    ];
    
    // Store para o grid
    var store = new Ext.data.ArrayStore({
        fields: ['id', 'nome', 'email', 'idade', 'cidade'],
        data: dadosExemplo
    });
    
    // Grid Panel
    var grid = new Ext.grid.GridPanel({
        store: store,
        columns: [
            {header: 'ID', dataIndex: 'id', width: 50},
            {header: 'Nome', dataIndex: 'nome', width: 150},
            {header: 'Email', dataIndex: 'email', width: 200},
            {header: 'Idade', dataIndex: 'idade', width: 80},
            {header: 'Cidade', dataIndex: 'cidade', width: 150}
        ],
        height: 300,
        width: 650,
        title: 'Lista de Usuários',
        frame: true,
        tbar: [
            {
                text: 'Adicionar',
                iconCls: 'add',
                handler: function() {
                    abrirJanelaFormulario();
                }
            },
            {
                text: 'Editar',
                iconCls: 'edit',
                handler: function() {
                    var selection = grid.getSelectionModel().getSelection();
                    if (selection.length > 0) {
                        abrirJanelaFormulario(selection[0].data);
                    } else {
                        Ext.Msg.alert('Aviso', 'Selecione um registro para editar.');
                    }
                }
            },
            {
                text: 'Excluir',
                iconCls: 'delete',
                handler: function() {
                    var selection = grid.getSelectionModel().getSelection();
                    if (selection.length > 0) {
                        Ext.Msg.confirm('Confirmar', 'Deseja realmente excluir este registro?', function(btn) {
                            if (btn === 'yes') {
                                store.remove(selection[0]);
                            }
                        });
                    } else {
                        Ext.Msg.alert('Aviso', 'Selecione um registro para excluir.');
                    }
                }
            }
        ]
    });
    
    // Função para abrir janela de formulário
    function abrirJanelaFormulario(dados) {
        var isEdit = dados ? true : false;
        var titulo = isEdit ? 'Editar Usuário' : 'Novo Usuário';
        
        var form = new Ext.form.FormPanel({
            width: 400,
            bodyPadding: 10,
            items: [
                {
                    xtype: 'textfield',
                    name: 'nome',
                    fieldLabel: 'Nome',
                    allowBlank: false,
                    value: dados ? dados.nome : ''
                },
                {
                    xtype: 'textfield',
                    name: 'email',
                    fieldLabel: 'Email',
                    allowBlank: false,
                    vtype: 'email',
                    value: dados ? dados.email : ''
                },
                {
                    xtype: 'numberfield',
                    name: 'idade',
                    fieldLabel: 'Idade',
                    allowBlank: false,
                    minValue: 1,
                    maxValue: 120,
                    value: dados ? dados.idade : ''
                },
                {
                    xtype: 'combo',
                    name: 'cidade',
                    fieldLabel: 'Cidade',
                    allowBlank: false,
                    store: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Brasília', 'Curitiba', 'Porto Alegre'],
                    value: dados ? dados.cidade : '',
                    editable: true
                }
            ],
            buttons: [
                {
                    text: 'Salvar',
                    handler: function() {
                        var formValues = form.getForm().getValues();
                        if (form.getForm().isValid()) {
                            if (isEdit) {
                                // Atualizar registro existente
                                var record = store.getById(dados.id);
                                record.set(formValues);
                            } else {
                                // Adicionar novo registro
                                formValues.id = store.getCount() + 1;
                                store.add(new Ext.data.Record(formValues));
                            }
                            janelaFormulario.close();
                        }
                    }
                },
                {
                    text: 'Cancelar',
                    handler: function() {
                        janelaFormulario.close();
                    }
                }
            ]
        });
        
        var janelaFormulario = new Ext.Window({
            title: titulo,
            width: 450,
            height: 300,
            modal: true,
            items: form,
            closeAction: 'hide'
        });
        
        janelaFormulario.show();
    }
    
    // Janela principal com abas
    var janelaPrincipal = new Ext.Window({
        title: 'Sistema de Prática ExtJS',
        width: 800,
        height: 600,
        layout: 'fit',
        maximizable: true,
        minimizable: true,
        resizable: true,
        items: {
            xtype: 'tabpanel',
            activeTab: 0,
            items: [
                {
                    title: 'Grid de Usuários',
                    items: grid
                },
                {
                    title: 'Formulário Simples',
                    items: {
                        xtype: 'form',
                        bodyPadding: 20,
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'campo1',
                                fieldLabel: 'Campo de Texto',
                                allowBlank: false
                            },
                            {
                                xtype: 'textarea',
                                name: 'campo2',
                                fieldLabel: 'Área de Texto',
                                height: 100
                            },
                            {
                                xtype: 'datefield',
                                name: 'campo3',
                                fieldLabel: 'Data',
                                format: 'd/m/Y'
                            },
                            {
                                xtype: 'checkbox',
                                name: 'campo4',
                                fieldLabel: 'Checkbox',
                                boxLabel: 'Aceito os termos'
                            },
                            {
                                xtype: 'radiogroup',
                                name: 'campo5',
                                fieldLabel: 'Opções',
                                items: [
                                    {boxLabel: 'Opção 1', name: 'opcao', inputValue: '1'},
                                    {boxLabel: 'Opção 2', name: 'opcao', inputValue: '2'},
                                    {boxLabel: 'Opção 3', name: 'opcao', inputValue: '3'}
                                ]
                            }
                        ],
                        buttons: [
                            {
                                text: 'Enviar',
                                handler: function() {
                                    var form = this.ownerCt;
                                    if (form.getForm().isValid()) {
                                        Ext.Msg.alert('Sucesso', 'Formulário enviado com sucesso!');
                                    }
                                }
                            },
                            {
                                text: 'Limpar',
                                handler: function() {
                                    this.ownerCt.getForm().reset();
                                }
                            }
                        ]
                    }
                },
                {
                    title: 'Componentes',
                    items: {
                        xtype: 'panel',
                        bodyPadding: 20,
                        items: [
                            {
                                xtype: 'button',
                                text: 'Abrir Mensagem',
                                handler: function() {
                                    Ext.Msg.alert('Título', 'Esta é uma mensagem de exemplo!');
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Confirmar Ação',
                                handler: function() {
                                    Ext.Msg.confirm('Confirmar', 'Deseja continuar?', function(btn) {
                                        if (btn === 'yes') {
                                            Ext.Msg.alert('Resultado', 'Você clicou em Sim!');
                                        }
                                    });
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Prompt',
                                handler: function() {
                                    Ext.Msg.prompt('Entrada', 'Digite seu nome:', function(btn, text) {
                                        if (btn === 'ok') {
                                            Ext.Msg.alert('Olá', 'Olá, ' + text + '!');
                                        }
                                    });
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Progress Bar',
                                handler: function() {
                                    var progressBar = new Ext.ProgressBar({
                                        text: 'Processando...'
                                    });
                                    
                                    var janelaProgress = new Ext.Window({
                                        title: 'Progresso',
                                        width: 300,
                                        height: 100,
                                        items: progressBar,
                                        closeAction: 'hide'
                                    });
                                    
                                    janelaProgress.show();
                                    
                                    // Simular progresso
                                    var progress = 0;
                                    var interval = setInterval(function() {
                                        progress += 10;
                                        progressBar.updateProgress(progress / 100, progress + '%');
                                        
                                        if (progress >= 100) {
                                            clearInterval(interval);
                                            setTimeout(function() {
                                                janelaProgress.close();
                                                Ext.Msg.alert('Concluído', 'Processo finalizado!');
                                            }, 500);
                                        }
                                    }, 200);
                                }
                            }
                        ]
                    }
                }
            ]
        },
        tbar: [
            {
                text: 'Sobre',
                handler: function() {
                    Ext.Msg.alert('Sobre', 'Sistema de Prática ExtJS\nVersão 1.0\n\nEste é um sistema para praticar os componentes do ExtJS.');
                }
            }
        ]
    });
    
    // Renderizar a janela principal
    janelaPrincipal.show();
    
    // Adicionar alguns ícones CSS básicos
    var style = document.createElement('style');
    style.textContent = `
        .add { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjY0NjdGNjgyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjY0NjdGNjkyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNjQ2N0Y2NjIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNjQ2N0Y2NzIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAAALAAAAAAoACgAAAIRhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuCwAAOw=='); }
        .edit { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjY0NjdGNjgyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjY0NjdGNjkyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNjQ2N0Y2NjIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNjQ2N0Y2NzIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAAALAAAAAAoACgAAAIRhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuCwAAOw=='); }
        .delete { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjY0NjdGNjgyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjY0NjdGNjkyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNjQ2N0Y2NjIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNjQ2N0Y2NzIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAAALAAAAAAoACgAAAIRhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuCwAAOw=='); }
    `;
    document.head.appendChild(style);
});


