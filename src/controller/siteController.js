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
            const actors = await DB.Actor.findAll()
            res.render('create', { generos,actors })
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
           // res.send(req.body)
            const newMovie= await DB.Movie.create(req.body)
                await newMovie.addActors(req.body.actors,{through:{sueldo:333}}) // el through es un campo de la tabla intermedia
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    },
    updateForm:(req,res)=>{

    },

    edit: async (req, res) => {
        try {
            const edit = await DB.Movie.findByPk(req.params.id,{include:{all:true}})// es esencial 
            const generos = await DB.genre.findAll()
            const actors = await DB.Actor.findAll()
            //res.send(edit.Actors[0])
            res.render('edit', { edit,generos,actors })
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
},
creation:async (req,res)=>{
    let actor = await DB.Actor.findAll()
    let movie = await DB.Movie.findAll()
    Promise.all([actor,movie])
    res.render('creacion',{actor,movie})
},
creationData:async (req,res)=>{
    await DB.actorMovie.create({
        movie_id:req.body.movie,
        actor_id:req.body.actor
    })
    res.redirect('/')
}


}
module.exports = siteController