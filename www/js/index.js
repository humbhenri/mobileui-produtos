var db;
var shortName = 'DBProdutos';
var version = '1.0';
var displayName = 'DBProdutos';
var maxSize = 65535;
var codbarras = '';

var app = {
    onDeviceReady: function() {
        app.startDB();
    },
    startDB: function() {
        if (!window.openDatabase) {
            alert('Navegador não suporte WebSQL.');
            return;
        }

        db = openDatabase(shortName, version, displayName, maxSize);

        db.transaction(function(tx) {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Produtos(Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Nome TEXT NOT NULL, Preco TEXT NOT NULL, Codbarras TEXT not null)'
            );
            console.log('tabela criada');
        });
    },
    insere: function() {
        db.transaction(function(tx) {
            var nome = document.getElementById('nome').value;
            var preco = document.getElementById('preco').value;

            tx.executeSql(
                `INSERT INTO Produtos(Nome,Preco, Codbarras) values('${nome}', '${preco}', ${codbarras})`
            );
            console.log('inseriu');
            codbarras = ''
            document.getElementById('nome').value = '';
            document.getElementById('preco').value = '';
        });
    },
    scan: function() {
        console.log('scan');
        cordova.plugins.barcodeScanner.scan(
            function(result) {
                if (result.text) {
                    console.log(result.text);
                    codbarras = result.text;
                }
            },
            function(error) {
                alert(error);
            }
        );
    }
};
