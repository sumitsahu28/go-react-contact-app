import React, { Component } from 'react';
import './home.css';
import {user, logout, allContacts, addcontact, updatecontact, deletecontact} from './api/home.js';
import $ from "jquery";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {name:"", contacts:[]};
        this.getlogout = this.getlogout.bind(this);
        this.editContact = this.editContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.handleAddForm = this.handleAddForm.bind(this);
    }

    async componentWillMount() {
        var name = await user();
        this.setState({name:name})
        var contacts = await allContacts();
        this.setState({contacts:contacts})
    }

    async getlogout() {
        var status = await logout();
        if(status)
        {
            this.props.history.replace("/");
        }
    }

    async editContact(name, mobile, address, id, username) {
        var contact = {id:id, name:name, mobile:mobile, address:address, username:username}
        var res = await updatecontact(contact);
        if(res.result==="success")
        {
            var contacts = await allContacts();
            this.setState({contacts:contacts})  
        }
    }

    async deleteContact(contact) {
        // console.log("delete contact", contact)
        var res = await deletecontact(contact)
        if(res.result==="success")
        {
            var currentcontacts = this.state.contacts
            var index = 0;
            currentcontacts.forEach(function(o, i){
                if(o.id===contact.id)
                {
                    index = i;
                }
            })
            currentcontacts.splice(index, 1)
            this.setState({contacts:currentcontacts})
        }
    }

    async handleAddForm(e){
        e.preventDefault();
        var name = this.refs.name.value;
        var mobile = this.refs.mobile.value;
        var address = this.refs.address.value;
        if(name !=='' && mobile !=='' && address !==''){
            var res = await addcontact(name, mobile, address);
            if(res){
                document.getElementById("addForm").reset();
                var contacts = await allContacts();
                this.setState({contacts:contacts})
            }else{
                return false;
            }
        }
    }

  render() {
      var that = this;
    return (
      <div className="container">
      <div className="row">
        {/* <div className="col-md-8"> */}
            <div className="col-sm-4">
                <p>Welcome {this.state.name}</p>
            </div>
            <div className="col-sm-8">
                <p><button className="logoutbtn" onClick={this.getlogout}>Logout</button></p>
            </div>
        </div>
            <div>
                <h4>Add a contact</h4>
                <form id="addForm" onSubmit={this.handleAddForm} className="row" style={{"marginLeft": "5px"}}>
                    <input placeholder="Name" name="name" ref="name"/>
                    <input placeholder="Mobile No" name="mobile" ref="mobile"/>
                    <input placeholder="Address" name="address" ref="address"/>
                    <button type="submit">Add</button>
                </form>
            </div>
            <br/>
            <div>
            <h4>Contact List</h4>
            <table style={{"width":"100%"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile No</th>
                        <th>Address</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="allContacts">
                    {
                        this.state.contacts.map(function(contact, i){
                            return (<tr id={contact.id}>
                                        <td contentEditable='true'>{contact.name}</td>
                                        <td contentEditable='true'>{contact.mobile}</td>
                                        <td contentEditable='true'>{contact.address}</td>
                                        <td><button onClick={()=>{
                                            var name = $(`#${contact.id}`).children('td:eq(0)').text();
                                            var mobile = $(`#${contact.id}`).children('td:eq(1)').text();
                                            var address = $(`#${contact.id}`).children('td:eq(2)').text();
                                            var objectID = contact.id;
                                            var username = contact.username;
                                            that.editContact(name, mobile, address, objectID, username);
                                        }}>Update</button></td>
                                        <td><button onClick={()=>that.deleteContact(contact)}>Delete</button></td>
                                    </tr>);
                        })
                    }
                </tbody>
            </table>
            </div>
        {/* </div> */}
      </div>
    );
  }
}

export default Home;