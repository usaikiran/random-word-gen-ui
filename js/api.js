

function hit( body, callback ){

    if( body==NaN || body==null )
        body = {}

    console.log( "request body : " + JSON.stringify( body ) );

    $.post( "https://random-word-gen.herokuapp.com/generate", body, function(data){
        callback(data);
    } );
}