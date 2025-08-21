Ext.onReady(function(){
    // Criar um botão simples na página
    var button = new Ext.Button({
        text: 'Abrir Janela',
        renderTo: Ext.getBody(),
        handler: function(){
            var tabs = new Ext.TabPanel({
                region: 'center',
                margins:'3 3 3 0', 
                activeTab: 0,
                defaults:{autoScroll:true},

                items:[{
                    title: 'Aba 1',
                    html: '<h3>Conteúdo da Aba 1</h3><p>Esta é uma aba simples com conteúdo HTML.</p>',
                    closable:true
                },{
                    title: 'Aba 2',
                    html: '<h3>Conteúdo da Aba 2</h3><p>Esta é a segunda aba do sistema.</p>',
                    closable:true
                },{
                    title: 'Aba 3',
                    html: '<h3>Conteúdo da Aba 3</h3><p>Esta é a terceira aba do sistema.</p>',
                    closable:true
                }]
            });

            // Panel para o oeste
            var nav = new Ext.Panel({
                title: 'Navegação',
                region: 'west',
                split: true,
                width: 200,
                collapsible: true,
                margins:'3 0 3 3',
                cmargins:'3 3 3 3',
                html: '<p>Painel de navegação</p>'
            });

            var win = new Ext.Window({
                title: 'Janela com Layout',
                closable:true,
                width:600,
                height:350,
                plain:true,
                layout: 'border',

                items: [nav, tabs]
            });

            win.show();
        }
    });
});