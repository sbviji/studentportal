import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            emailid: "",
            password:"",
            errorContent:{}

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
        else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.emailid)){
            errors["emailid"]="Please valid emailid"
            isValid=false
        }else if(this.state.password===0){
            errors["password"]="Please Enter password"
            isValid=false
        }else if (this.state.password.length>8){
            errors["password"]="Please Enter password lesser than 8 Characters"
            isValid=false
        }

        this.setState({
            errorContent: errors
        })
        return isValid;
    }

    submit=(event)=>{
        event.preventDefault()
        if (this.validateInput()){
            this.validateLogin();
         }
    }


    //to vaiidate the EmailID and Password

    validateLogin=()=>{
        let loginerror={}
         const PayLoad ={
            "emailid" : this.state.emailid,
            "password" : this.state.password
        }

       axios.post("/validateLogin",PayLoad,{"Content-Type": "application/json"}).then(response=>{
            if (response.status===200){
                this.props.history.push('/dashboard')
            }else{
                loginerror["invalidlogin"]="Invalid Login Credentials"
                this.setState({
                    errorContent: loginerror
                })
            }
        }).catch(function (error) {
            console.log(error);
          });

    }



    render() {
        return (
            <div>
                <div className="form-group">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email ID </Form.Label>
                            <Form.Control name="emailid" value={this.state.emailid} type="email" 
                            placeholder="Enter email" onChange={this.handlechange}  />
                    </Form.Group>
                    <span style={{color: 'red'}}>{this.state.errorContent['emailid']}</span>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" value={this.state.password} type="password" 
                            placeholder="Password" onChange={this.handlechange}/>
                            <span style={{color: 'red'}}>{this.state.errorContent['password']}</span>
                        </Form.Group>


                        <Button variant="primary" type="submit" onClick={this.submit}>
                            Submit
                        </Button>
                    </Form>
                    <span style={{color: 'red'}}>{this.state.errorContent["invalidlogin"]}</span>
                </div>

            </div>
        )
    }
}

export default LoginPage
