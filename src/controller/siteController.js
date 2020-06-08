// Require del archivo database>models>index.js
const DB = require('../database/models')
const OP = DB.sequelize.OP
// Operadores

const siteController = {
    index: async (req, res) => {
        try {
            const movies = await DB.Movie.findAll({
                include: ['genre', 'Actors']
            })
            //res.send(movies)
            res.render('index', { movies })
        } catch (error) {
            res.send(error)
        }
    },
    create: async (req, res) => {
        try {
            const generos = await DB.genre.findAll()
            res.render('create', { generos })
        } catch (error) {
            res.send(error)
        }
    },
    detail: async (req, res) => {
        try {
            const detail = await DB.Movie.findByPk(req.params.id,{include:['genre','Actors']})
            //res.send(detail)
            res.render('detail', { detail })
        } catch (error) {
            res.send(error)
        }
    },
    store: async (req, res) => {
        try {
            await DB.Movie.create(req.body)
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    },
    edit: async (req, res) => {
        try {
            const edit = await DB.Movie.findByPk(req.params.id)
            res.render('edit', { edit })
        } catch (error) {
            res.send(error)
        }
    },
    update: async (req, res) => {
        try {
            const update = await DB.Movie.update(req.body, {
                where: { id: req.params.id }
            })
            res.redirect('/');
        } catch (error) {
            res.send(error)
        }
    },
    destroy: async (req, res) => {
        try {
            const destroy = await DB.Movie.destroy({
                where: { id: req.params.id }
            })
            res.redirect('/');
        } catch (error) {
            res.send(error)
        }
    },

    //Relaciones
 generos: async (req, res) => {
    
    try {
        const genero= await DB.genre.findByPk(req.params.id,{include:['peli']})
        //const genero = await DB.genre.findByPk(req.params.id,{include:['Movie']})
        //res.send(genero)
       res.render('generos', { genero})
    } catch (error) {
        res.send(error)
    }

},
actores:async (req, res) => {
    try{
        const actores= await DB.Actor.findByPk(req.params.id,{include:['Movies']})
        //res.send(actores)
        res.render('actores',{ actores })
       
    }catch (error) {
        res.send(error)
    }
}
}
module.exports = siteController