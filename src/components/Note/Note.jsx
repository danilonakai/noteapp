import React, { Component } from 'react';
import './Note.css';
// import { useState } from 'react';

export default class Note extends Component {
    constructor(props) {
        super(props);

        this.state = {
            note_id: 1,
            data: {
                notes: []
            },
            selected_note: null
        };

    }

    componentDidMount() {
        
    }

    create_note(title, content) {
        let id = this.state.note_id;
        let data = this.state.data;
        let new_data = JSON.parse(JSON.stringify(this.state.data));

        new_data.notes.push({
            id: id,
            title: title,
            content: content
        });

        this.setState({
            note_id: id + 1,
            data: new_data
        }, () => console.log(this.state.data));
    }

    select_note(note_id) {
        let data = this.state.data;
        let selected_note = data.notes.filter(note => note.id === note_id)[0];

        this.setState({
            selected_note: selected_note
        }, () => console.log(this.state.selected_note));
    }

    edit_note_title(event, note_id) {
        let data = this.state.data;
        let new_data = [];

        const title = event.target.value;

        setTimeout(() => {
            JSON.parse(JSON.stringify(this.state.data)).notes.forEach(note => {
                if (note.id === note_id) {
                    note.title = event.target.value;
                }

                new_data.push(note);
            });

            new_data = { notes: new_data };

            if (title === event.target.value) {
                this.setState({
                    data: new_data
                }, () => console.log(this.state.data));
            }
        }, 5000);
    }

    edit_note_content(event, note_id) {
        let data = this.state.data;
        let new_data = [];

        const content = event.target.value;

        setTimeout(() => {
            JSON.parse(JSON.stringify(this.state.data)).notes.forEach(note => {
                if (note.id === note_id) {
                    note.content = event.target.value;
                }

                new_data.push(note);
            });

            new_data = { notes: new_data };

            if (content === event.target.value) {
                this.setState({
                    data: new_data
                }, () => console.log(this.state.data));
            }
        }, 5000);
    }

    delete_note(note_id) {
        let data = this.state.data;
        let new_data = JSON.parse(JSON.stringify(this.state.data));

        new_data = { notes: new_data.notes.filter(note => note.id !== note_id) };

        this.setState({
            data: new_data
        }, () => console.log(this.state.data));
    }

    toggle_note() {

    }

    render() {
        return (
            <div className="note">
                <button onClick={() => this.create_note("note", "note content")}>Create note</button>

                <button onClick={() => this.delete_note(2)}>Delete 2nd note</button>

                <button onClick={() => this.select_note(3)}>select 3rd note</button>

                <input type="text" id="aprv-note" onChange={(event) => this.edit_note_title(event, 3)} />
                <input type="text" id="aprv-note2" onChange={(event) => this.edit_note_content(event, 3)} />
            </div>
        )
    }
}
