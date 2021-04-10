import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Col} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';

class Registration extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             emailid:"",
             password:"",
             address1:"",
             address2:"",
             city:"",
             country:"",
             zipcode:"",
             errorContent:{},
             disableEmail: false
        }
    }
    

    handlechange=(event)=>{
        const name =event.target.name;
        const value=event.target.value;
        this.setState({
            [name]: value
        })

    }

    validateInput=()=>{
        let errors ={};
        let isValid=true;
        if (this.state.emailid.length===0){
            errors["emailid"]="Please Enter emailid"
            isValid=false
        }
         
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.emailid)){
            errors["emailid"]="Please valid emailid"
            isValid=false
        } 
        
        if(this.state.password.length===0){
            errors["password"]="Please Enter password"
            isValid=false
        }
        
        if (this.state.password.length>8){
            errors["password"]="Please Enter password lesser than 8 Characters"
            isValid=false
        }
        
        if (this.state.address1.length==0){
            errors["address1"]="Please enter address1"
            isValid=false
        }
        
        if (this.state.address2.length==0){
            errors["address2"]="Please enter address2"
            isValid=false
        }
         if (this.state.city.length==0){
            errors["city"]="Please enter city"
            isValid=false
        }
        
        if (this.state.country.length==0){
            errors["country"]="Please enter state"
            isValid=false
        }
        
        if (this.state.zipcode.length==0){
            errors["zipcode"]="Please enter zipcode"
            isValid=false
        }
        
         if (this.state.zipcode.length>6){
            errors["zipcode"]="Please enter zipcode lesser than 6"
            isValid=false
        
        }

        this.setState({
            errorContent: errors
        })
        return isValid;
    }

    save=(event)=>{
        event.preventDefault();
        if(this.validateInput()){
           this.insert_data()

        }
    }


    edit=()=>{
        this.setState({ disableEmail: true})
    }


    update_data=()=>{
        const PayLoad ={
            "emailid": this.state.emailid,
            "password":this.state.password,
            "address1": this.state.address1,
            "address2":this.state.address2,
            "city": this.state.city,
            "country": this.state.country,
            "zipcode": this.state.zipcode
        }

       axios.put("/updateUser",PayLoad,{"Content-Type": "application/json"}).then(response=>{
            if (response.status===200){
                <Alert key="success" variant="success">
                This is a success alert—check it out!
              </Alert>
            }else{
                <Alert key="info" variant="info">
                This is a info alert—check it out!
              </Alert>
            }
        }).catch(function (error) {
            console.log(error);
          });
    }


    insert_data=()=>{
        const PayLoad ={
            "emailid": this.state.emailid,
            "password":this.state.password,
            "address1": this.state.address1,
            "address2":this.state.address2,
            "city": this.state.city,
            "country": this.state.country,
            "zipcode": this.state.zipcode
        }

       axios.post("/insertUser",PayLoad,{"Content-Type": "application/json"}).then(response=>{
            if (response.status===200){
                <Alert key="success" variant="success">
                This is a success alert—check it out!
              </Alert>
            }else{
                <Alert key="info" variant="info">
                This is a info alert—check it out!
              </Alert>
            }
        }).catch(function (error) {
            console.log(error);
          });
    }



    render() {
        return (
            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="emailid" value={this.state.emailid} type="email" placeholder="Enter email"
                            onChange={this.handlechange} disabled={this.state.disableEmail}/>
                            <span style={{color: "red"}}>{this.state.errorContent["emailid"]}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" value={this.state.password} type="password" placeholder="Password" onChange={this.handlechange}/>
                            <span style={{color: "red"}}>{this.state.errorContent["password"]}</span>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control  name="address1" value={this.state.address1} placeholder="1234 Main St" onChange={this.handlechange}/>
                        <span style={{color: "red"}}>{this.state.errorContent["address1"]}</span>
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control name="address2" value={this.state.address2} placeholder="Apartment, studio, or floor" onChange={this.handlechange}/>
                        <span style={{color: "red"}}>{this.state.errorContent["address2"]}</span>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control name="city" value={this.state.city} onChange={this.handlechange}/>
                            <span style={{color: "red"}}>{this.state.errorContent["city"]}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control name="country"  as="select" onChange={this.handlechange} 
                            defaultValue={this.state.country}>
                                <option>Choose...</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Comibatore">Comibatore</option>
                                <option value="Madurai">Madurai</option>
                                <option value="Trichy">Trichy</option>
                            </Form.Control>
                            <span style={{color: "red"}}>{this.state.errorContent["country"]}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control name="zipcode" value={this.state.zipcode} onChange={this.handlechange}/>
                            <span style={{color: "red"}}>{this.state.errorContent["zipcode"]}</span>
                        </Form.Group>
                    </Form.Row>

                    

                    <Button variant="primary" type="submit" onClick={this.save}>
                        Save
                    </Button>

                    <Button variant="primary" type="submit" onClick={this.update}>
                        Update
                    </Button>
                </Form>

                
            </div>
        )
    }
}

export default Registration
