import React, { Component } from 'react';
import PhoneBook from './PhoneBook/PhoneBook';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import styles from './App.module.css';

export default class App extends Component {
    state = {
        filter: '',
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        name: '',
    };

    // fix bug for componentDidMount rerender
    constructor (props){
        super(props);
     
        const existContacts = localStorage.getItem('contacts');
        if (existContacts) {
            this.state = { ...this.state, contacts: JSON.parse(existContacts) }; 
        }        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.contacts !== this.state.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
    }

    componentDidMount() {
        const existContacts = localStorage.getItem('contacts');
        if (existContacts) {
            // this.setState({ contacts: JSON.parse(existContacts) });     //Rerender
        }
    }

    addContact = contact => {
        const isExistContact = this.state.contacts.find(contactState => {
            return contactState.name.toLowerCase() === contact.name.toLowerCase()
        });

        isExistContact ? console.log(contact.name + ' is already in contacts') :

            this.setState(prevState => {
                if (contact.name !== '') {
                    return {
                        contacts: [...prevState.contacts, contact]
                    }
                }
            })
    }

    existContact = contact => {
        const isExistContact = this.state.contacts.findIndex(contactState => {
            return contactState.name.toLowerCase() === contact.name.toLowerCase()
        });
        return isExistContact > 0 ? true : false;
    }

    changeFilter = filter => {
        this.setState({ filter })
    }

    getVisibleContacts = () => {
        const { contacts, filter } = this.state;

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()))
    }

    removeContact = contactId => {
        this.setState(prevState => {
            return {
                contacts: prevState.contacts.filter(({ id }) => id !== contactId)
            }
        })
    }

    render() {
        const { filter} = this.state;
        const visibleContacts = this.getVisibleContacts();

        return (
            <div className={styles.App}>
                <PhoneBook
                    onAddContact={this.addContact}
                    contacts={this.state.contacts}
                    existContact={this.existContact}
                />
                <h2>Contacts</h2>
                <Contacts contactsArr={visibleContacts} onRemoveContact={this.removeContact} />

                <Filter value={filter} onChangeFilter={this.changeFilter} />
            </div>
        )
    }
}
