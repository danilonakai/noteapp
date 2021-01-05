var id = 1;
var notes = [];

function create_note(id,date){
    let new_note = {note_id: id,title: "Click here to define the title.", date: date, note_content: "", height: "500px"};
    notes.push(new_note);
}

function delete_note(id){
    let delete_item;

    $(notes).each(function(e){
        if(notes[e].note_id == id){
            delete_item = e;
        }
    });
    notes.splice(delete_item, 1); 
    update_view();  
}

function update_view(){
    let content = "";
    $(notes).each(function(e){
        let note = '<div id="note_'+$(notes)[e].note_id+'" class="note-frame" style="height: '+$(notes)[e].height+';">'+
                '<div class="top-bar">'+
                '<div class="title" onclick="title_click(event)" onfocusout="title_focusout(event)"><h3 class="title-output">'+$(notes)[e].title+'</h3><input type="text" class="title-input"></div>'+
                '<div class="actions"><i class="far fa-window-minimize minimize" onclick="minimize(event)"></i><i class="far fa-trash-alt delete" onclick="delete_note('+$(notes)[e].note_id+')"></i></div>'+
                '</div>'+
                '<span class="date">'+$(notes)[e].date+'</span>'+
                '<div class="note" onclick="note_click(event)" onfocusout="note_focusout(event)"><textarea class="note-input">'+$(notes)[e].note_content+'</textarea><div class="note-output">'+notes[e].note_content+'</div></div></div>';
        content = note + content;
    });
    $('.content').html(content);
}

function title_click(event){
    let note_id = "#" + $(event.target).parents('.note-frame').attr('id');

    $(note_id).find('.title-output').fadeOut(400, function(){
        $(note_id).find('.title-input').fadeIn();
        $(note_id).find('.title-input').focus();
    });
}

function title_focusout(event){
    let note_id = "#" + $(event.target).parents('.note-frame').attr('id');;

    let input_value = $(note_id).find('.title-input').val();

    if(input_value.length == 0){
        input_value = "Click here to define the title."
    }

    $(notes).each(function(e){
        if($(notes)[e].note_id == note_id.split("_")[1]){
            $(notes)[e].title = input_value;
        }
    });

    $(note_id).find('.title-output').html(input_value);

    $(note_id).find('.title-input').fadeOut(function(){
        $(note_id).find('.title-output').fadeIn();
    });
}

function note_click(event){
    let note_id = "#" + $(event.target).parents('.note-frame').attr('id');

    $(note_id).find('.note-output').fadeOut();
    $(note_id).find('.note-input').fadeIn();
    $(note_id).find('.note-input').focus();
}

function note_focusout(event){
    let note_id = "#" + $(event.target).parents('.note-frame').attr('id');
    
    let input_value = note_content_convert($(note_id).find('.note-input').val());

    $(notes).each(function(e){
        if($(notes)[e].note_id == note_id.split("_")[1]){
            $(notes)[e].note_content = input_value;
        }
    });

    $(note_id).find('.note-output').html(input_value);
    
    $(note_id).find('.note-input').fadeOut(400,function(){
        $(note_id).find('.note-output').fadeIn();
    });
    
}

function new_date(){
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let date = new Date();
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let new_date = month+" "+day+", "+year;

    return new_date;
}

function minimize(event){
    let note_id = $(event.target).parents('.note-frame').attr('id');
    let height;

    if($(event.target).parents('.note-frame').height() > 70){
        height = "70px";
        $(event.target).parents('.note-frame').animate({height: "70px"});
    }else{
        height = "500px";
        $(event.target).parents('.note-frame').animate({height: "500px"});
    }

    $(notes).each(function(e){
        if($(notes)[e].note_id == note_id.split("_")[1]){
            $(notes)[e].height = height;
        }
    });
}

function note_content_convert(note){
    let note_splitted = note.split('\n');
    let note_converted = "";

    $(note_splitted).each(function(e){
        if(note_splitted[e].split("#").length > 1){
            let title = "<h2>" + note_splitted[e].split("#")[1] + "</h2>" + "\n";
            note_converted = note_converted + title;
        }
        else if(note_splitted[e].split("- ").length > 1){
            let title = "<li>" + note_splitted[e].split("- ")[1] + "</li>" + "\n";
            note_converted = note_converted + title;
        }
        else{
            let normal = note_splitted[e] + "\n";
            note_converted = note_converted + normal;
        }
    });
    return note_converted;
}

function first_note(){
    let title = "Welcome to Noteapp"
    let content = "#Welcome to Noteapp\nNoteapp is a simple application created to take notes.\n\n#Here you can:\n- Create New notes\n- Edit created notes\n- Toggle the visibility of notes to organize it better\n- Delete unnecessary notes";
    
    notes.push({note_id: 0, title: title, date: new_date(), note_content: note_content_convert(content), height: "500px"});
    update_view();

    $('#note_0 .title .title-input').val(title);
    $('#note_0 .note .note-input').val(content);
}

$(document).ready(function(){
    first_note();
});

$('#create-note').click(function(){
    create_note(id,new_date());
    id++;
    update_view();
});