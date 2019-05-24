var db;
var shortName = 'DBProdutos';
var version = '1.0';
var displayName = 'DBProdutos';
var maxSize = 65535;

var app = {
    onDeviceReady: function () {
        app.startDB();
    },
    startDB: function () {
        if (!window.openDatabase) {
            alert('Navegador não suporte WebSQL.');
            return;
        }

        db = openDatabase(shortName, version, displayName, maxSize);

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Produtos(Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Nome TEXT NOT NULL, Preco TEXT NOT NULL)');
            console.log('OK ;)')
        })
    },

    insere: function() {
        db.transaction(function (tx) {
            const nome = document.getElementById('nome').value;
            const preco = document.getElementById('preco').value;
            console.log(nome, preco)
            tx.executeSql(`insert into Produtos(Nome, Preco) values (${nome}, ${preco})`);
        })
    }
};