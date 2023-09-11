import React, { Component } from 'react';
import './Note.css';
// import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faPlus,faTrash } from '@fortawesome/free-solid-svg-icons'

export default class Note extends Component {
    constructor(props) {
        super(props);

        this.state = {
            note_id: 1,
            data: {
                notes: []
            }
        };

    }

    componentDidMount() {
        let note_id = localStorage.getItem('note_id');
        let data = localStorage.getItem('data');

        if(note_id !== null && data !== null){
            this.setState({
                note_id: note_id,
                data: JSON.parse(data)
            },()=>{
                Array.from(document.querySelectorAll("#notes section article textarea")).forEach(item=> {
                    item.style.height = item.scrollHeight+"px";
                });
            });
        }
    }

    create_note() {
        let id = this.state.note_id;
        let data = this.state.data;
        let new_data = JSON.parse(JSON.stringify(this.state.data));

        new_data.notes.push({
            id: id,
            title: "",
            content: ""
        });

        this.setState({
            note_id: id + 1,
            data: new_data
        }, () => this.save_data());
    }

    edit_note(event, note_id,type) {
        let data = this.state.data;
        let new_data = [];

        const value = event.target.value;

        event.target.style.height = event.target.scrollHeight+"px";

        setTimeout(() => {
            JSON.parse(JSON.stringify(this.state.data)).notes.forEach(note => {
                if(type === "title"){
                    if (note.id === note_id) {
                        note.title = event.target.value;
                    }
                }else if(type === "content"){
                    if (note.id === note_id) {
                        note.content = event.target.value;
                    }
                }
                

                new_data.push(note);
            });

            new_data = { notes: new_data };

            if (value === event.target.value) {
                this.setState({
                    data: new_data
                }, () => this.save_data());
            }
        }, 2000);
    }
    
    delete_note(note_id) {
        let data = this.state.data;
        let new_data = JSON.parse(JSON.stringify(this.state.data));

        new_data = { notes: new_data.notes.filter(note => note.id !== note_id) };

        this.setState({
            data: new_data
        }, () => this.save_data());
    }

    save_data(){
        localStorage.setItem('note_id',this.state.note_id);
        localStorage.setItem('data',JSON.stringify(this.state.data));
    }

    print_converted_notes(){
        let notes = this.state.data.notes;
        let result = [];

        notes.forEach(note=> {
            result.push(
                <article key={note.id}>
                    <FontAwesomeIcon icon={faTrash} onClick={()=> this.delete_note(note.id)} />

                    <textarea placeholder="Add title" defaultValue={note.title} onChange={event=> this.edit_note(event,note.id,"title")}></textarea>

                    <textarea placeholder="Add content" defaultValue={note.content} onChange={event=> this.edit_note(event,note.id,"content")}></textarea>
                </article>
            );
        });

        return result;
    }
    

    render() {
        return (
            <div id="notes">
                <header>
                    <div className="container">
                        <h1>NoteApp</h1>

                        <button onClick={()=> this.create_note()}>
                            <FontAwesomeIcon icon={faPlus} />
                            New note
                        </button>
                    </div>
                </header>

                <section>
                    <div className="container">
                        {this.print_converted_notes()}
                    </div>
                </section>

                <footer>
                    <span>©2021 Danilo Nakai | All rights reserved.</span>
                </footer>
            </div>
        )
    }
}
