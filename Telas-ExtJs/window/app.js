Ext.onReady(function(){
    // Criar um botão simples na página
    var button = new Ext.Button({
        text: 'Abrir Janela',
        renderTo: Ext.getBody(),
        handler: function(){
            if(!win){
                win = new Ext.Window({
                    title: 'Sistema de Janelas ExtJS',
                    layout: 'fit',
                    width: 600,
                    height: 400,
                    closeAction: 'hide',
                    plain: true,
                    
                    items: new Ext.TabPanel({
                        activeTab: 0,
                        deferredRender: false,
                        border: false,
                        items: [
                            {
                                title: 'Aba 1',
                                html: '<h3>Conteúdo da Aba 1</h3><p>Esta é uma aba simples com conteúdo HTML.</p>'
                            },
                            {
                                title: 'Aba 2',
                                html: '<h3>Conteúdo da Aba 2</h3><p>Esta é a segunda aba do sistema.</p>'
                            },
                            {
                                title: 'Aba 3',
                                html: '<h3>Conteúdo da Aba 3</h3><p>Esta é a terceira aba do sistema.</p>'
                            }
                        ]
                    }),
                    
                    buttons: [{
                        text: 'Fechar',
                        handler: function(){
                            win.hide();
                        }
                    }]
                });
            }
            win.show();
        }
    });
    
    var win;
});