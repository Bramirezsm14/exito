module.exports = (sequelize,Datatypes)=>{
    let genre = sequelize.define(
        "genre",
        {
            name:Datatypes.STRING,
            ranking:Datatypes.INTEGER
        },
        {
            timestamps:false
        }
    );
    genre.associate = function(models){
        //console.log(models)
        genre.hasMany(models.Movie,{as:'peli'})//nombre de la relacion de un genero tiene muchas peliculas 
    }
    return genre
} 