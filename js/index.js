
var BUFFER_SIZE = 100, POINTER=0;
var BUFFER = [];

window.onload = (event) => {

    generateWord();

    $("#btn-generate").click( function(){
        generateWord();
    });

    $("#btn-undo").click( function(){

        if( POINTER>0 ){
            POINTER--;
            $("#random-word").html(BUFFER[POINTER]);
        }

        refreshBoard();
    });

    $("#btn-redo").click( function(){

        if( POINTER<BUFFER.length ){
            POINTER++;
            $("#random-word").html(BUFFER[POINTER]);
        }

        refreshBoard();
    });

    $("#github").click( function(){
        window.location = "https://github.com/usaikiran/word-gen";
    });

    $("#api-submit").click( function(){

        let wordLength = $("#wordLength").val();
        let beginningWith = $("#beginningWith").val();

        body = {}
        
        if( wordLength!=NaN && wordLength!=null && wordLength!="" )
            body["wordLength"] = wordLength;
        if( beginningWith!=NaN && beginningWith!=null )
            body["beginningWith"] = beginningWith

        hit( body, function(data){ 
            $("#out-div").css("display", "flex");
            $("#out-div").html( JSON.stringify(data) ); 
        } );
    });
}

function generateWord(){

    $.post( "https://random-word-gen.herokuapp.com/generate", function( data ) {
            
        $("#random-word").html(data["word"]);
        BUFFER.push( data["word"] );
        POINTER=BUFFER.length-1;
        console.log( POINTER + " " +data["word"] );
        
        refreshBoard();
    });
}

function refreshBoard(){

    if( POINTER<BUFFER.length-1 )
        $("#btn-redo").removeClass( "btn-disabled" );
    else
        $("#btn-redo").addClass( "btn-disabled" );


    if( POINTER>0 )
        $("#btn-undo").removeClass( "btn-disabled" );
    else
        $("#btn-undo").addClass( "btn-disabled" );
}

