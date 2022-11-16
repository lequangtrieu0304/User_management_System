const pool = require('../../config/database');

const viewPlayers = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Database connected successfully');

        connection.query('SELECT * FROM player ORDER BY name ASC', (err, players) => {
            if (err) {
                console.log(err);
            } else {
                res.render('home', { players })
                // console.log('The data from table player', players);
            }
        });
    });
}

const form = (req, res) => {
    res.render('_addPlayer');
}

const createPlayer = (req, res) => {

    const { name, national, jersay_no, playing_club } = req.body;
    if (!name || !national || !jersay_no || !playing_club) {
        return res.redirect('/player/add-player')
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Database connected successfully');

        connection.query('INSERT INTO player SET name=?, national=?, jersay_no=?, playing_club=?', [name, national, jersay_no, playing_club], (err, player) => {
            if (err) throw err
            res.redirect('/player');
        });
    });
}

const findPlayer = (req, res) => {

    const searchPlayer = req.body.search;
    if (!searchPlayer) {
        return res.redirect('/player');
    }
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Database connected successfully');

        connection.query('SELECT * FROM player WHERE name LIKE ?', ['%' + searchPlayer + '%'], (err, players) => {
            if (!err) {
                res.render('home', { players })
            } else {
                console.log(err);
            }
        });
    });
}

const editPlayer = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Database connected successfully');

        const id = req.params.id
        connection.query('SELECT * FROM player WHERE player_id=?', [id], (err, player) => {
            if (err) throw err;
            console.log(player);
            res.render('_edit-player', {dataPlayer: player[0]});
        });
    });
}

const updatePlayer = (req, res) => {

    const { name, national, jersay_no, playing_club } = req.body;
    if (!name || !national || !jersay_no || !playing_club) {
        return res.redirect('/player/add-player')
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Database connected successfully');

        const id = req.params.id
        connection.query('UPDATE player SET name=?, national=?, jersay_no=?, playing_club=? WHERE player_id=?', [name, national, jersay_no, playing_club, id], (err, player) => {
            if (err) throw err
            res.redirect('/player');
        });
    });
}

const deletePlayer = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Database connected successfully');
        
        const id = req.params.id;
        connection.query('DELETE FROM player WHERE player_id=?', [id], (err, player) => {
            if (err) throw err
            res.redirect('/player');
        });
    });
}


module.exports = {
    viewPlayers,
    createPlayer,
    deletePlayer,
    findPlayer,
    editPlayer,
    updatePlayer,
    form
}