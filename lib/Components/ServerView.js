PartKeeprMobile.ServerView = Ext.extend(Ext.Panel, {
	layout: 'card',
	initComponent: function () {
		
		this.serverList = new PartKeeprMobile.ServerList();
		
		this.serverListPanel = new Ext.Panel({
			layout: 'fit',
			cardSwitchAnimation: {
				type: 'slide',
				direction: 'right'
				
			},
			dockedItems: [{
    			xtype: 'toolbar',
    			dock: 'bottom',
    			items: {
    				xtype: 'button',
    				text: i18n("Add Server"),
    				handler: this.addServer,
    				scope: this
    			}
    		}],
    		items: this.serverList
		});
		
		this.serverEditor = new PartKeeprMobile.ServerEditor({
			cardSwitchAnimation: 'slide',
			dockedItems: [{
    			xtype: 'toolbar',
    			dock: 'top',
    			items: {
    				xtype: 'button',
    				text: i18n("Back"),
    				ui: 'back',
    				handler: this.cancelEdit,
    				scope: this
    			}
    		}],
		});
		
		
		this.items = [ this.serverListPanel, this.serverEditor ];
		
		this.serverList.on("editServer", this.editServer, this);
		this.serverEditor.on("serverSave", this.onServerSave, this);
		
		PartKeeprMobile.ServerView.superclass.initComponent.call(this);
	},
	editServer: function (context) {
		this.serverEditor.loadRecord(context);
		this.setActiveItem(this.serverEditor);
	},
	addServer: function () {
		var j = Ext.ModelMgr.create({ protocol: 'https'}, 'PartKeeprMobile.ServerListModel');
		
		this.editServer(j);
	},
	cancelEdit: function () {
		this.setActiveItem(this.serverListPanel);
	},
	onServerSave: function (editor) {
		editor.updateRecord(editor.record);
		
		if (editor.record.phantom) {
			this.serverList.store.add(editor.record);
		}
		this.serverList.store.sync();
		
		this.setActiveItem(this.serverListPanel);
	}
});