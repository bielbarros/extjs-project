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

    // Título principal
    var titulo = new Ext.Panel({
        html: '<h2>Lista de Países</h2>',
        width: 422,
        bodyStyle: 'padding: 10px; background-color: #f0f0f0; border-bottom: 1px solid #ccc;'
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
            text: 'Limpar Filtro',
            handler: function() {
                campoBusca.setValue('');
                store.clearFilter();
            }
        }]
    });

    // Toolbar com botões de ação
    var toolbarBotoes = new Ext.Toolbar({
        width: 422,
        items: [{
            text: 'Novo',
            iconCls: 'add',
            handler: function() {
                console.log('Novo país');
                alert('Botão Novo clicado!');
            }
        }, {
            xtype: 'tbspacer',
            width: 10
        }, {
            text: 'Editar',
            iconCls: 'edit',
            handler: function() {
                console.log('Editar país');
                alert('Botão Editar clicado!');
            }
        }, {
            xtype: 'tbspacer',
            width: 10
        }, {
            text: 'Excluir',
            iconCls: 'delete',
            handler: function() {
                console.log('Excluir país');
                alert('Botão Excluir clicado!');
            }
        }]
    });

    // Renderizar na ordem correta
    titulo.render(Ext.getBody());
    toolbarBusca.render(Ext.getBody());
    toolbarBotoes.render(Ext.getBody());
    grid.render(Ext.getBody());
});