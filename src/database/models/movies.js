module.exports = (sequelize,Datatypes)=>{
    const movie = sequelize.define(
        "Movie",
        {
            title:Datatypes.STRING,
            rating:Datatypes.DECIMAL,
            awards:Datatypes.INTEGER,
            length:Datatypes.INTEGER,
            release_date:{type:Datatypes.DATE,
            defaultValue:Date.now()},
            genre_id:Datatypes.INTEGER,
            deleted_at:Datatypes.DATE
    },{
        timestamps:false
    
    });
    movie.associate = function(models){
        movie.belongsTo(models.genre,{
            as:"genre"
        })
        movie.hasMany(models.actorMovie,{
            as:"actorMovie",
            foreignKey:"movie_id",
            otherKey:"actor_id"
        })
        movie.belongsToMany(models.Actor,{
            as:"Actors",
            through:"actor_movie",
            foreignKey:"movie_id",
            otherKey:"actor_id",
            timestamps:false
        })
    }
    return movie
    
}