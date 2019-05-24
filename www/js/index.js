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
            console.log('tabela criada');
        })
    },
    insere: function(){
        db.transaction(function (tx) {
            var nome = document.getElementById('nome').value;
            var preco = document.getElementById('preco').value;

            tx.executeSql('INSERT INTO Produtos(Nome,Preco) values("' + nome + '","' + preco + '")');
            console.log('inseriu');
        });
    }
}