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

        app.lista();
    },
    insere: function() {
        db.transaction(function(tx) {
            var nome = document.getElementById('nome').value;
            var preco = document.getElementById('preco').value;

            tx.executeSql(
                `INSERT INTO Produtos(Nome,Preco, Codbarras) values('${nome}', '${preco}', '${codbarras}')`
            );
            console.log('inseriu');
            codbarras = '';
            document.getElementById('nome').value = '';
            document.getElementById('preco').value = '';
            navigator.vibrate(1000);
            alert('Inserido com sucesso');
            backPage();
            app.lista();
        });
    },
    lista: function() {
        $('#lista_produtos').html('');
        db.transaction(function(tx) {
            tx.executeSql(
                'SELECT * FROM produtos',
                [],
                (_, result) => {
                    $(result.rows).each((i, produto) => {
                        let conteudo = `<div class="item">
                                        <h2>${produto.Nome}</h2>
                                        <p class="text-grey-500">R$ ${
                                            produto.Preco
                                        } </p>
                                        <p class="text-grey-500">${
                                            produto.Codbarras
                                        } </p>
                                        <button class="red icon-text" onclick="app.delete(${
                                            produto.Id
                                        })">
                                            <i class="icon ion-trash-b"></i>
                                            Delete
                                        </button>
                                    </div>`;
                        $('#lista_produtos').append(conteudo);
                    });
                },
                () => {}
            );
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
    },
    delete: function(id) {
        console.log(id);
        db.transaction(function(tx) {
            tx.executeSql(
                'delete from Produtos where Id = ?',
                [id],
                () => {
                    alert('Removido com sucesso :)');
                    app.lista();
                },
                () => {
                    alert('Um erro aconteceu :(');
                }
            );
        });
    }
};
