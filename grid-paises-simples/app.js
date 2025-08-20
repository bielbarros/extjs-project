Ext.onReady(function(){
    var statusElement = document.getElementById('status');
    
        
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

        

        
        var store = new Ext.data.ArrayStore({
            fields: ['nome', 'sigla', 'codigo_bacen']
        });

        
        store.loadData(myData);
        

        
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
            width: 400,
            title: 'Lista de Países'
        });


        grid.render(Ext.getBody());



});