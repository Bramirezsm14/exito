module.exports = (sequelize,Datatypes)=>{
    let actorMovie = sequelize.define(
        "actorMovie",
        {
            actor_id:Datatypes.INTEGER,
            movie_id:Datatypes.INTEGER
        },
        {
            tableName:"actor_movie",
            timestamps:false
        }
    );
    actorMovie.associate = function(models){
        actorMovie.belongsTo(models.Movie)
        actorMovie.belongsTo(models.Actor)
    }
    return actorMovie
}