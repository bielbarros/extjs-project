Ext.onReady(function(){
    // Primeiro definir o painel de navegação
    var nav = new Ext.Panel({
        title: 'Navegação',
        region: 'west',
        split: true,
        width: 200,
        collapsible: true,
        margins:'3 0 3 3',
        cmargins:'3 3 3 3',
        tbar: [
            {
                text: 'Novo',
                iconCls: 'add',
                handler: function(){
                    Ext.Msg.alert('Ação', 'Criar novo usuário');    
                }
            },
            {
                text: 'Editar',
                iconCls: 'edit',
                handler: function(){
                    Ext.Msg.alert('Ação', 'Editar usuário');
                }
            },
            {
                text: 'Excluir',
                iconCls: 'delete',
                handler: function(){
                    Ext.Msg.confirm('Confirmar', 'Deseja realmente excluir?', function(btn) {
                        if (btn === 'yes') {
                            Ext.Msg.alert('Ação', 'Usuário excluído');
                        }
                    });
                }
            }
        ],
        items: [
            {
                xtype: 'button',
                text: 'Listar usuários',
                width: '100%',
                margin: '5 5 5 5',
                handler: function(){
                    Ext.Msg.alert('Ação', 'Listar usuários');
                }
            },
            {
                xtype: 'textfield',
                id: 'pesquisarField',
                fieldLabel: 'Pesquisar',
                name: 'pesquisar_usuario',
                width: 180,
                margin: '5 5 5 5',
                enableKeyEvents: true,
                listeners: {
                    keyup: function(field, e) {
                        if (e.getKey() == 13) { // Enter
                            Ext.Msg.alert('Pesquisa', 'Pesquisando por: ' + field.getValue());
                        }
                    }
                }
            }
        ]
    });

    // Depois criar o painel principal com layout border
    var panel = new Ext.Panel({
        title: 'Sistema de Prática ExtJS',
        width: 1200,
        height: 800,
        renderTo: Ext.getBody(),
        layout: 'border',
        items: [
            nav,
            {
                xtype: 'tabpanel',
                region: 'center',
                items: [
                    {
                        title: 'Dados Pessoais',
                        closable: true,
                        items: {
                            xtype: 'form',
                            bodyPadding: 15,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nome',
                                    name: 'nome',
                                    allowBlank: false,
                                    width: 300
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Sobrenome',
                                    name: 'sobrenome',
                                    allowBlank: false,
                                    width: 300
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Data de Nascimento',
                                    name: 'data_nascimento',
                                    format: 'd/m/Y',
                                    width: 200
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Idade',
                                    name: 'idade',
                                    minValue: 1,
                                    maxValue: 120,
                                    width: 100
                                }
                            ]
                        }
                    },
                    {
                        title: 'Contato',
                        closable: true,
                        items: {
                            xtype: 'form',
                            bodyPadding: 15,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Email',
                                    name: 'email',
                                    vtype: 'email',
                                    allowBlank: false,
                                    width: 300
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Telefone',
                                    name: 'telefone',
                                    maskRe: /[0-9\-\s\(\)]/,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Celular',
                                    name: 'celular',
                                    maskRe: /[0-9\-\s\(\)]/,
                                    width: 200
                                }
                            ]
                        }
                    },
                    {
                        title: 'Endereço',
                        closable: true,
                        items: {
                            xtype: 'form',
                            bodyPadding: 15,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'CEP',
                                    name: 'cep',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Endereço',
                                    name: 'endereco',
                                    width: 400
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Número',
                                    name: 'numero',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Complemento',
                                    name: 'complemento',
                                    width: 300
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Bairro',
                                    name: 'bairro',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Cidade',
                                    name: 'cidade',
                                    width: 200
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Estado',
                                    name: 'estado',
                                    store: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
                                    width: 100
                                }
                            ]
                        }
                    },
                    {
                        title: 'Profissional',
                        closable: true,
                        items: {
                            xtype: 'form',
                            bodyPadding: 15,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Cargo',
                                    name: 'cargo',
                                    width: 300
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Salário',
                                    name: 'salario',
                                    minValue: 0,
                                    width: 150
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Data de Admissão',
                                    name: 'data_admissao',
                                    format: 'd/m/Y',
                                    width: 200
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Departamento',
                                    name: 'departamento',
                                    store: ['TI', 'RH', 'Financeiro', 'Vendas', 'Marketing', 'Administrativo'],
                                    width: 200
                                }
                            ]
                        }
                    },
                    {
                        title: 'Segurança',
                        closable: true,
                        items: {
                            xtype: 'form',
                            bodyPadding: 15,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Usuário',
                                    name: 'usuario',
                                    allowBlank: false,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Senha',
                                    name: 'senha',
                                    inputType: 'password',
                                    allowBlank: false,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Confirmar Senha',
                                    name: 'confirmar_senha',
                                    inputType: 'password',
                                    allowBlank: false,
                                    width: 200
                                },
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Ativo',
                                    name: 'ativo',
                                    boxLabel: 'Usuário ativo no sistema'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    });

    // Adicionar ícones CSS básicos
    var style = document.createElement('style');
    style.textContent = `
        .add { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjY0NjdGNjgyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjY0NjdGNjkyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNjQ2N0Y2NjIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNjQ2N0Y2NzIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAAALAAAAAAoACgAAAIRhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuCwAAOw=='); }
        .edit { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjY0NjdGNjgyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjY0NjdGNjkyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNjQ2N0Y2NjIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNjQ2N0Y2NzIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAAALAAAAAAoACgAAAIRhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuCwAAOw=='); }
        .delete { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjY0NjdGNjgyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjY0NjdGNjkyM0U1MTFFNUI4Q0FFM0FERTM1NkRCOEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNjQ2N0Y2NjIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNjQ2N0Y2NzIzRTUxMUU1QjhDQUUzQURFMzU2REI4RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAAALAAAAAAoACgAAAIRhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuCwAAOw=='); }
    `;
    document.head.appendChild(style);
});