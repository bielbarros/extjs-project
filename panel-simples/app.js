Ext.onReady(function () {
    var panel = new Ext.Panel({
        title: 'Sistema de Prática ExtJS',
        width: 400,
        height: 200,
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Nome',
                name: 'nome'
            }
        ],

        buttons: [
            {
                text: 'Salvar',
                handler: function() {
                    Ext.Msg.alert('Salvar');
                }
            },
            {
                text: 'Cancelar',
                handler: function() {
                    Ext.Msg.alert('Cancelar');
                }
            }
        ],

        tbar: [
            {
                text: 'Adicionar',
                handler: function() {
                    Ext.Msg.alert('Adicionar');
                }
            },
            {
                text: 'Editar',
                handler: function() {
                    Ext.Msg.alert('Editar');
                }
            },
            {
                text: 'Excluir',
                handler: function() {
                    Ext.Msg.alert('Excluir');
                }
            }
        ],

        form: {
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nome',
                    name: 'nome'
                }
            ]
        },







        renderTo: Ext.getBody()
    });
});
