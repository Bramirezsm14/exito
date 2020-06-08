module.exports = (sequelize,Datatypes)=>{
    const movie = sequelize.define(
        "Movie",
        {
            title:Datatypes.STRING,
            rating:Datatypes.DECIMAL,
            awards:Datatypes.INTEGER,
            length:Datatypes.INTEGER,
            release_date:Datatypes.DATE,
            genre_id:Datatypes.INTEGER
    },{
        timestamps:false
    });
    movie.associate = function(models){
        movie.belongsTo(models.genre)
    
        movie.belongsToMany(models.Actor,{
            as:"Actors",
            through:"actor_movie",
            foreignKey:"actor_id",
            otherKey:"movie_id",
            timestamps:false
        })
    }
    return movie
} 