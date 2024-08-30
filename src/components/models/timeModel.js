const db = require('../config/db'); // Ajuste o caminho para a configuração do seu banco de dados

const Time = {
    create: (time, callback) => {
        // Verifique se todos os campos necessários estão presentes
        if (!time.username || !time.timee || !time.trabalho) {
            const errMsg = 'Username, timee, and trabalho are required';
            console.error('Erro de Validação (create):', errMsg);
            return callback(new Error(errMsg));
        }

        // Verifique os dados recebidos
        console.log('Received time data for creation:', time);

        const query = 'INSERT INTO times (username, timee, trabalho) VALUES (?, ?, ?)';
        db.query(query, [time.username, time.timee, time.trabalho], (err, results) => {
            if (err) {
                console.error('Erro no Banco de Dados (create):', JSON.stringify(err, null, 2));
                return callback(err);
            }
            // Retorna o ID do novo registro
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        // Verifique se o ID é fornecido
        if (!id) {
            const errMsg = 'ID is required';
            console.error('Erro de Validação (findById):', errMsg);
            return callback(new Error(errMsg));
        }

        const query = 'SELECT * FROM times WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Erro no Banco de Dados (findById):', JSON.stringify(err, null, 2));
                return callback(err);
            }
            if (results.length === 0) {
                return callback(new Error('No record found with the provided ID'));
            }
            // Retorna o registro encontrado
            callback(null, results[0]);
        });
    },

    findByUsername: (username, callback) => {
        // Verifique se o username é fornecido
        if (!username) {
            const errMsg = 'Username is required';
            console.error('Erro de Validação (findByUsername):', errMsg);
            return callback(new Error(errMsg));
        }

        const query = 'SELECT * FROM times WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) {
                console.error('Erro no Banco de Dados (findByUsername):', JSON.stringify(err, null, 2));
                return callback(err);
            }
            // Retorna todos os registros encontrados
            callback(null, results);
        });
    },

    update: (id, time, callback) => {
        // Verifique se todos os campos necessários estão presentes
        if (!id || !time.username || !time.timee || !time.trabalho) {
            const errMsg = 'ID, username, timee, and trabalho are required';
            console.error('Erro de Validação (update):', errMsg);
            return callback(new Error(errMsg));
        }

        // Verifique os dados recebidos
        console.log('Received time data for update:', time);

        const query = 'UPDATE times SET username = ?, timee = ?, trabalho = ? WHERE id = ?';
        db.query(query, [time.username, time.timee, time.trabalho, id], (err, results) => {
            if (err) {
                console.error('Erro no Banco de Dados (update):', JSON.stringify(err, null, 2));
                return callback(err);
            }
            if (results.affectedRows === 0) {
                return callback(new Error('No record found to update with the provided ID'));
            }
            // Retorna o resultado da atualização
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        // Verifique se o ID é fornecido
        if (!id) {
            const errMsg = 'ID is required';
            console.error('Erro de Validação (delete):', errMsg);
            return callback(new Error(errMsg));
        }

        const query = 'DELETE FROM times WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Erro no Banco de Dados (delete):', JSON.stringify(err, null, 2));
                return callback(err);
            }
            if (results.affectedRows === 0) {
                return callback(new Error('No record found to delete with the provided ID'));
            }
            // Retorna o resultado da exclusão
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM times';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Erro no Banco de Dados (getAll):', JSON.stringify(err, null, 2));
                return callback(err);
            }
            // Retorna todos os registros encontrados
            callback(null, results);
        });
    }
};

module.exports = Time;
